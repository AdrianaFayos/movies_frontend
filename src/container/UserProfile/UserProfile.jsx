import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { LOGOUT } from "../../redux/types";
import UserHeader from "../../components/UserHeader/UserHeader";
import moment from 'moment';
import Logo from '../../components/Logo/Logo';


const UserProfile = (props) => {

    let history = useHistory();


    const logOut = () => {
        props.dispatch({ type: LOGOUT });
        
        history.push("/");;
    };

    
    if(props.credentials?.user.id) {
        return(

            <div className="vista">
              <Logo />
              <div className="userHeaderHome">
                <UserHeader/>
              </div>  
                <div className="userInfo">
                  <p>NAME : {props.credentials?.user.firstname} </p>
                  <p>LASTNAME : {props.credentials?.user.lastname} </p>
                  <p>EMAIL : {props.credentials?.user.email} </p>
                  <p>PHONE : {props.credentials?.user.phone}</p>
                  <p>BIRTHDAY : {moment(props.credentials?.user.birthday).format('DD/MM/YYYY')}</p>
                  <p>CITY : {props.credentials?.user.adress}</p>
                  <div className="buttonsProfile">
                    <div
                      className="button"
                      onClick={() => history.push("/updateuser")}
                    >
                      UPDATE
                    </div>
                    <div className="button" onClick={() => logOut()}>
                      LOGOUT
                    </div>
                </div>
              </div>  
            </div>
        )
    } else {
          
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