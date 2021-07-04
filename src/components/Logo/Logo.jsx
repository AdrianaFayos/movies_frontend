import React from 'react';
import logo from './../../img/logo2.png';
import {useHistory} from 'react-router-dom';


const Logo = () => {

    let history = useHistory();

    return(
  
        <div className="logoAll" >
            <img className="logo2" src={logo} onClick={() => history.push('/')} alt="logo" width="40"/>
        </div>
    )

}

export default Logo;