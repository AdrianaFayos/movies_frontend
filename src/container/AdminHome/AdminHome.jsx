import React from 'react';
import UserHeader from '../../components/UserHeader/UserHeader';
import Link from '../../components/Link/Link';
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faUsers} from "@fortawesome/free-solid-svg-icons";
import Tooltip from "react-simple-tooltip";
import Logo from '../../components/Logo/Logo'

const AdminHome = (props) => {

    if (props.credentials?.user.isAdmin === true) {

        return(
            <div className="adminHomeContainer">
                <Logo />
                <div className="userHeaderHome">
                    <UserHeader/>
                </div> 
                <div className="adminHomeContent">
                    <div className="adminHeader">
                       <Tooltip content="Users" placement="top" background="#8191A6" padding="10" radius="2" border="unset">
                           <Link path="/allusers" destination={<FontAwesomeIcon icon={faUsers}/>}/>
                        </Tooltip>   
                        <Tooltip content="Orders" placement="top" background="#8191A6" padding="10" radius="2" border="unset">
                            <Link path="/allorders" destination={<FontAwesomeIcon icon={faList}/>}/> 
                        </Tooltip> 

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