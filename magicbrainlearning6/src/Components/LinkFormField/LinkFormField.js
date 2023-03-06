import React from 'react';
import './LinkFormField.css';

const LinkFormField = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div>
            <p className='f3 black'>This Magic Brain app will detect faces in your picture. Give it a try!</p>
            <div className='shadow-5 br3 ma4 pa4 center linkFormFieldBorder linkFormFieldMaxWidth'>
                <input onChange={onInputChange} className='f3 w-70 br3' type='input' />
                <button onClick={onButtonSubmit} className='f3 w-30 br3 grow pointer background'>Detect!</button>
            </div>
        </div>
    )
}

export default LinkFormField;