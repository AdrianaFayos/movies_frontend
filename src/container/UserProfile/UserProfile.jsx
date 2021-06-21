import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import './UserProfile.css';
import axios from "axios";
import { connect } from "react-redux";
import { LOGOUT } from "../../redux/types";


const UserProfile = (props) => {

    let history = useHistory();

    //hooks
    const [userData, setUserData] = useState({
        token: props.credentials?.token,
        user: props.credentials?.user
    });

    const logOut = () => {
        props.dispatch({ type: LOGOUT });
    };

    
    if(props.credentials?.user.isAdmin === false) {
        return(

            <div className="userProfileContainer vista">
                <div className="userInfo">
                  <p>NAME : {props.credentials?.user.firstname} </p>
                  <p>LASTNAME : {props.credentials?.user.lastname} </p>
                  <p>EMAIL : {props.credentials?.user.email} </p>
                  <p>PHONE : {props.credentials?.user.phone}</p>
                  <p>BIRTHDAY : {props.credentials?.user.birthday}</p>
                  <p>CITY : {props.credentials?.user.adress}</p>
                  <div className="buttonsProfile">
                    <div
                      className="buttonUpdate"
                      onClick={() => history.push("/updateclient")}
                    >
                      UPDATE
                    </div>
                    <div className="buttonLogoutC" onClick={() => logOut()}>
                      LOGOUT
                    </div>
                  </div>
                </div>  
            </div>
        )
    } else if (props.credentials?.user.isAdmin === true) {
        return(

            <div className="userProfileContainer vista">
                WELCOME {props.credentials?.user.firstname} !
                <div className="userInfo">
                  <p>NAME : {props.credentials?.user.firstname} </p>
                  <p>LASTNAME : {props.credentials?.user.lastname} </p>
                  <p>EMAIL : {props.credentials?.user.email} </p>
                  <p>PHONE : {props.credentials?.user.phone}</p>
                  <p>BIRTHDAY : {props.credentials?.user.birthday}</p>
                  <p>CITY : {props.credentials?.user.adress}</p>
                  <div className="buttonsProfile">
                    <div className="buttonUpdate" onClick={() => history.push("/updateclient")}>
                      UPDATE
                    </div>
                    <div className="buttonLogoutC" onClick={() => logOut()}>
                      LOGOUT
                    </div>
                  </div>
                </div>  
                <div className="buttonUpdate" onClick={() => history.push("/adminhome")}>
                      ADMIN
                </div>
            </div>
        )
    } else {

            setTimeout(() => {
                history.push("/");
              }, 1000);
          
              return (
                <div className="spinnerContainer">
                  Cargando ... ... ...
                </div>
              );
        }

}

export default connect((state) => ({
    credentials: state.credentials,
  }))(UserProfile);