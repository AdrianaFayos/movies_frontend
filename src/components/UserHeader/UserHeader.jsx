import React from 'react';
import { connect } from "react-redux";
import Link from '../Link/Link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faSearch, faUserLock, faFilm } from "@fortawesome/free-solid-svg-icons";
import Tooltip from "react-simple-tooltip";

const UserHeader = (props) => {

    if(props.credentials?.user.isAdmin === false) {
        return(
    
            <div className="userHeaderContainer">
                <Tooltip content="Home" placement="right" background="#8191A6" padding="10" radius="2" border="unset">
                    <Link path="/" destination={<FontAwesomeIcon icon={faHome}/>}/>
                </Tooltip>
                <Tooltip content="Profile" placement="right" background="#8191A6" padding="10" radius="2" border="unset">
                    <Link path="/profile" destination={<FontAwesomeIcon icon={faUser}/>}/>
                </Tooltip>
                <Tooltip content="Search" placement="right" background="#8191A6" padding="10" radius="2" border="unset">
                    <Link path="/search" destination={<FontAwesomeIcon icon={faSearch}/>}/>
                </Tooltip>  
                <Tooltip content="Orders" placement="right" background="#8191A6" padding="10" radius="2" border="unset">
                    <Link path="/orders" destination={<FontAwesomeIcon icon={faFilm}/>}/>
                </Tooltip>   
            </div>

    )} else if (props.credentials?.user.isAdmin === true) {

        return(

            <div className="userHeaderContainerAdmin">
                <Tooltip content="Home" placement="right" background="#8191A6" padding="10" radius="2" border="unset">
                    <Link path="/" destination={<FontAwesomeIcon icon={faHome}/>}/>
                </Tooltip>
                <Tooltip content="Profile" placement="right" background="#8191A6" padding="10" radius="2" border="unset">
                    <Link path="/profile" destination={<FontAwesomeIcon icon={faUser}/>}/>
                </Tooltip>
                <Tooltip content="Search" placement="right" background="#8191A6" padding="10" radius="2" border="unset">
                    <Link path="/search" destination={<FontAwesomeIcon icon={faSearch}/>}/>
                </Tooltip>  
                <Tooltip content="Orders" placement="right" background="#8191A6" padding="10" radius="2" border="unset">
                    <Link path="/orders" destination={<FontAwesomeIcon icon={faFilm}/>}/>
                </Tooltip>    
                <Tooltip content="Admin" placement="right" background="#8191A6" padding="10" radius="2" border="unset">
                    <Link path="/adminhome" destination={<FontAwesomeIcon icon={faUserLock}/>}/>
                </Tooltip> 
            </div>
        )
    }

}

export default connect((state) => ({
    credentials: state.credentials,
  }))(UserHeader);
