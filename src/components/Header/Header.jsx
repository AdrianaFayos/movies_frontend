import React from 'react';
import './Header.scss';
import { connect } from 'react-redux';
import { LOGOUT } from '../../redux/types';
import { useHistory } from 'react-router-dom';
import Link from '../Link/Link'

const Header = (props) => {
    let history = useHistory();

    const logOut = () => {

        props.dispatch({type:LOGOUT});
        history.push("/")
    }

    if (props.credentials?.user.id){
        return(
            <div className="headerContainer">
                <div className="logoHeader">

                </div>

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
                <div className="logoHeader">
                    logo
                </div>
                
                <div className="headerUser">
                    <Link path="/login" destination="LOGIN"/>
                    <p>|</p>
                    <Link path="/register" destination="REGISTER"/>
                </div>
            </div>
        )
    }
}

export default connect((state) => ({

    credentials:state.credentials

}))(Header);