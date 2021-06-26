import React from 'react';
import { connect } from "react-redux";
import Link from '../Link/Link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faSearch, faUserLock, faFilm } from "@fortawesome/free-solid-svg-icons";

const UserHeader = (props) => {

    if(props.credentials?.user.isAdmin === false) {
        return(
    
            <div className="userHeaderContainer">
                <Link path="/" destination={<FontAwesomeIcon icon={faHome}/>}/>
                <Link path="/profile" destination={<FontAwesomeIcon icon={faUser}/>}/>
                <Link path="/search" destination={<FontAwesomeIcon icon={faSearch}/>}/>
                <Link path="/orders" destination={<FontAwesomeIcon icon={faFilm}/>}/>
            </div>

    )} else if (props.credentials?.user.isAdmin === true) {

        return(

            <div className="userHeaderContainerAdmin">
                <Link path="/" destination={<FontAwesomeIcon icon={faHome}/>}/>
                <Link path="/profile" destination={<FontAwesomeIcon icon={faUser}/>}/>
                <Link path="/search" destination={<FontAwesomeIcon icon={faSearch}/>}/>
                <Link path="/orders" destination={<FontAwesomeIcon icon={faFilm}/>}/>
                <Link path="/adminhome" destination={<FontAwesomeIcon icon={faUserLock}/>}/>
            </div>
        )
    }

}

export default connect((state) => ({
    credentials: state.credentials,
  }))(UserHeader);
