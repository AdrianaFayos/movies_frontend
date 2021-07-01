import React, { useEffect, useState } from 'react';
import UserHeader from '../../components/UserHeader/UserHeader';
import axios from 'axios';
import Link from '../../components/Link/Link';
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faSearch, faUsers} from "@fortawesome/free-solid-svg-icons";
import Logo from '../../components/Logo/Logo';
const SearchMovie = (props) => {



    useEffect(() => {



    },[]);

    useEffect(() => {

    });



    if (props.credentials?.user.isAdmin === true) {

        return(
            <div className="vista">
                <Logo />
                <div className="userHeaderHome">
                    <UserHeader/>
                </div> 
                <div className="searchContent">
                    <div className="movieSearch">
                        <input type="text" name="searchMovie" id="" className="searcher"/>
                        <FontAwesomeIcon icon={faSearch}/>
                    </div>
                    <div className="moviesFound">
                        
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
  }))(SearchMovie);