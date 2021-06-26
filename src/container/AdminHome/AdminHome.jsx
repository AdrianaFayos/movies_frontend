import React from 'react';
import UserHeader from '../../components/UserHeader/UserHeader';
import axios from 'axios';
import Link from '../../components/Link/Link';
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faUsers} from "@fortawesome/free-solid-svg-icons";

const AdminHome = (props) => {

    if (props.credentials?.user.isAdmin === true) {

        return(
            <div className="adminHomeContainer">
                <div className="userHeaderHome">
                    <UserHeader/>
                </div> 
                <div className="adminHomeContent">
                    <div className="adminHeader">
                        <Link path="/allusers" destination={<FontAwesomeIcon icon={faUsers}/>}/>
                        <Link path="/allorders" destination={<FontAwesomeIcon icon={faList}/>}/>
                    </div>
                    <div className="adminInfoContent">
                        <p className="text1">Welcome {props.credentials?.user.firstname} !</p>
                    </div>
                </div>
            </div>
        )

    } else {
        return (
            <div>NO TIENES PERMISO</div>
        )
    }
}

export default connect((state) => ({
    credentials: state.credentials,
  }))(AdminHome);