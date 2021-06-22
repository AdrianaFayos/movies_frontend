import React from 'react';
import './UserHeader.scss';
import { connect } from "react-redux";
import Link from '../Link/Link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faSearch, faUserLock, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const UserHeader = (props) => {

    if(props.credentials?.user.isAdmin === false) {
        return(
    
            <div className="userHeaderContainer">
                <Link path="/" destination={<FontAwesomeIcon icon={faHome}/>}/>
                <Link path="/profile" destination={<FontAwesomeIcon icon={faUser}/>}/>
                <Link path="/search" destination={<FontAwesomeIcon icon={faSearch}/>}/>
                <Link path="/orders" destination={<FontAwesomeIcon icon={faShoppingCart}/>}/>
            </div>

    )} else if (props.credentials?.user.isAdmin === true) {

        return(

            <div className="userHeaderContainerAdmin">
                <Link path="/" destination={<FontAwesomeIcon icon={faHome}/>}/>
                <Link path="/profile" destination={<FontAwesomeIcon icon={faUser}/>}/>
                <Link path="/search" destination={<FontAwesomeIcon icon={faSearch}/>}/>
                <Link path="/orders" destination={<FontAwesomeIcon icon={faShoppingCart}/>}/>
                <Link path="/adminhome" destination={<FontAwesomeIcon icon={faUserLock}/>}/>
            </div>
        )
    }

}

export default connect((state) => ({
    credentials: state.credentials,
  }))(UserHeader);
