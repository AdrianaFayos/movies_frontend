import React, { useEffect, useState } from 'react';
import UserHeader from '../../components/UserHeader/UserHeader';
import './SearchMovie.scss';
import axios from 'axios';
import Link from '../../components/Link/Link';
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faUsers} from "@fortawesome/free-solid-svg-icons";

const SearchMovie = (props) => {



    useEffect(() => {



    },[]);

    useEffect(() => {

    });



    if (props.credentials?.user.isAdmin === true) {

        return(
            <div className="vista">
                <div className="userHeaderHome">
                    <UserHeader/>
                </div> 
                <div className="userOrdersContent">

                    
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
  }))(SearchMovie);