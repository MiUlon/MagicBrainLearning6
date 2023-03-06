import React from 'react';
import Tilt from 'react-parallax-tilt';
import LogoImage from './magicBrain.png';
import './Logo.css';

const Logo = () => {
    return (
        <Tilt className='grow ma3 pa3' style={{ height: '150px', width: '150px'}}>
            <div className='shadow-5 br3 logoBorder center grow logoMarginTop' style={{ height: '150px', width: '150px'}}>
                <img className='logoMarginTop' alt='brain' src={LogoImage} height='130px' width='130px'></img>
            </div>
        </Tilt>
    )
}

export default Logo;