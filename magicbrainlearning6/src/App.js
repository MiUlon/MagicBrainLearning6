import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import Rank from './Components/Rank/Rank';
import LinkFormField from './Components/LinkFormField/LinkFormField';
import './App.css';
import ParticlesBg from 'particles-bg';

class App extends Component {
  construtor() {
    this.super();
    this.state = {
      input: '',
      imageUrl: ''
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  };

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
  };

  render() {
    return (
      <div className='App'>
        <ParticlesBg type="cobweb" bg={true} />
        <Navigation />
        <Logo />
        <Rank />
        <LinkFormField onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
      </div>
    )
  }
}

export default App;
