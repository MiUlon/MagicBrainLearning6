import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import './App.css';
import ParticlesBg from 'particles-bg';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <ParticlesBg type="cobweb" bg={true} />
        <Navigation />
        <Logo />
      </div>
    )
  }
}

export default App;
