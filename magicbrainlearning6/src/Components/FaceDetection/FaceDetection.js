import React from 'react';
import './FaceDetection.css';

const FaceDetection = ({ imageUrl, box }) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='imageInput' alt='' src={imageUrl} width='500px' height='auto'></img>
                <div className='boundary_box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
            </div>
        </div>
    )
}

export default FaceDetection;