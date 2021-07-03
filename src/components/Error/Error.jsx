import React from 'react';
import {useHistory} from 'react-router-dom';
import Logo from '../Logo/Logo'


const Error = () => {

    let history = useHistory();

    return(
  
        <div className="errorContainer">
            <Logo />
            <div className="errorComponent">
                <div className="error1">Oops ...</div>
                <h1>We could not find this page.</h1>
                <h2>Try to go to <a href="/">HOME PAGE</a>.</h2>

            </div>
        </div>
    )

}

export default Error;