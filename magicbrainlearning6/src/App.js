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
import Clarifai from 'clarifai';

window.process = {};

const app = new Clarifai.App({
  apiKey: '82819b6c8d2d4417abbdebb80e6a3cdc'
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  };

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict(Clarifai.CELEBRITY_MODEL, this.state.input)
    .then(response => this.setFaceBox(this.calculateBoxLocation(response)))
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
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  };

  render() {
    return (
      <div className='App'>
        <ParticlesBg type="cobweb" bg={true} />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        { this.state.route === 'home'
            ? <div>
                <Logo />
                <Rank />
                <LinkFormField onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
                <FaceDetection box={this.state.box} imageUrl={this.state.imageUrl} />
              </div> 
            : ( this.state.route === 'signin' 
                  ? <SignInForm onRouteChange={this.onRouteChange} />
                  : <RegisterForm onRouteChange={this.onRouteChange} />
            )
        }
      </div>
    )
  }
}

export default App;
