import React from 'react';
import './Header.scss';
import { connect } from 'react-redux';
import { LOGOUT } from '../../redux/types';
import { useHistory } from 'react-router-dom';
import Link from '../Link/Link'
import logo from './../../img/logo.png'

const Header = (props) => {
    let history = useHistory();

    const logOut = () => {

        props.dispatch({type:LOGOUT});
        history.push("/")
    }

    if (props.credentials?.user.id){
        return(
            <div className="headerContainer">
                <img src={logo} alt="" />

                <div className="headerUser">
                    <Link path="/profile" destination={props.credentials?.user.firstname}/>
                    <p>|</p>
                    <div className="linkLogout" onClick={() => logOut()}>LOGOUT</div>
                </div>
            </div>
        )
    } else {
        return (

            <div className="headerContainer">
                <img className="logoHeader" src={logo} alt="logo" width="170"/>
                
                <div className="loginregister">
                    <div onClick={() => history.push('/login')} className="headerUser">
                        LOGIN
                    </div>
                    <div onClick={() => history.push('/register')} className="headerUser">
                        REGISTER
                    </div>
                </div>
            </div>
        )
    }
}

export default connect((state) => ({

    credentials:state.credentials

}))(Header);