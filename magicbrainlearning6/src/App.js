import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import Rank from './Components/Rank/Rank';
import LinkFormField from './Components/LinkFormField/LinkFormField';
import FaceDetection from './Components/FaceDetection/FaceDetection';
import SignInForm from './Components/SignInForm/SignInForm';
import RegisterForm from './Components/RegisterForm/RegisterForm';
import './App.css';
import ParticlesBg from 'particles-bg';

window.process = {};

const initialState = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  };

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    fetch('http://localhost:3001/imageurl', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            input: this.state.input
          })
        })
        .then(response => response.json())
    .then(response => {
      if (response) {
        fetch('http://localhost:3001/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}))
        })
        this.setFaceBox(this.calculateBoxLocation(response))
      }
    })
    .catch(error => console.log(error))
  };

  calculateBoxLocation = (data) => {
    const ClarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('imageInput');
    const imageWidth = Number(image.width);
    const imageHeight = Number(image.height);
    return {
      leftCol: imageWidth * ClarifaiFace.left_col,
      topRow: imageHeight * ClarifaiFace.top_row,
      rightCol: imageWidth - (imageWidth * ClarifaiFace.right_col),
      bottomRow: imageHeight - (imageHeight * ClarifaiFace.bottom_row)
    }
  }

  setFaceBox = (box) => {
    this.setState({box: box});
  };

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  };

  loadUser = (user) => {
    this.setState({user: {
      id: user.id,
      name: user.name,
      email: user.email,
      entries: user.entries,
      joined: user.joined
    }})
  };

  render() {
    return (
      <div className='App'>
        <ParticlesBg type="cobweb" bg={true} />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        { this.state.route === 'home'
            ? <div>
                <Logo />
                <Rank name={this.state.user.name} entries={this.state.user.entries} />
                <LinkFormField onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
                <FaceDetection box={this.state.box} imageUrl={this.state.imageUrl} />
              </div> 
            : ( this.state.route === 'signin' 
                  ? <SignInForm onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
                  : <RegisterForm onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
            )
        }
      </div>
    )
  }
}

export default App;
