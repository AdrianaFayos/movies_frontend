import React from 'react';
import './UserHome.scss';
import { connect } from "react-redux";
import UserHeader from '../UserHeader/UserHeader';

const UserHome = (props) => {

    return(

        <div className="userHomeContainer">
            
            <div className="userHeaderHome">
                <UserHeader/>
            </div>  
            <div className="userHomeContent">
                <div className="filmsCarrusel">
                    CARRUSEL DE PELICULAS NUEVAS
                </div>
                <div className="prueba">LAST FILMS</div>
                <div className="prueba">TOP RATED</div>
                <div className="prueba">THRILLER</div>
            </div> 

        </div>
    )

}

export default connect((state) => ({
    credentials: state.credentials,
  }))(UserHome);