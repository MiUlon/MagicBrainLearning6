import React from 'react';
import './Navigation.css';

const Navigation = ({ isSignedIn, onRouteChange }) => {
    if (isSignedIn) {
        return (
            <div className='navigationFlex'>
                <p onClick={() => onRouteChange('signout')} className='f3 grow shadow-5 dim black link pa3 ma3 pointer navigationDesign navigationFlex navigationMaxWidth'>Sign Out</p>
            </div>
        )
    } else {
        return (
            <div className='navigationFlex'>
                <p onClick={() => onRouteChange('signin')} className='f3 grow shadow-5 dim black link pa3 ma3 pointer navigationDesign navigationFlex navigationMaxWidth'>Sign In</p>
                <p onClick={() => onRouteChange('register')} className='f3 grow shadow-5 dim black link pa3 ma3 pointer navigationDesign navigationFlex navigationMaxWidth'>Register</p>
            </div>
        )
    }
    
}

export default Navigation;