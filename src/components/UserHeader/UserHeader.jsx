import React from 'react';
import './UserHeader.scss';
import { connect } from "react-redux";
import Link from '../Link/Link';

const UserHeader = (props) => {

    if(props.credentials?.user.isAdmin === false) {
        return(
    
            <div className="userHeaderContainer">
                <Link path="/" destination="Home"/>
                <Link path="/profile" destination="userImg"/>
                <p>SEARCH</p>
                <p>ORDERS</p>
                <p>...</p>
            </div>

    )} else if (props.credentials?.user.isAdmin === true) {

        return(

            <div className="userHeaderContainer">
                <Link path="/" destination="Home"/>
                <Link path="/profile" destination="userImg"/>
                <p>SEARCH</p>
                <p>ORDERS</p>
                <p>...</p>
                <p>ADMIN</p>
            </div>
        )
    }

}

export default connect((state) => ({
    credentials: state.credentials,
  }))(UserHeader);