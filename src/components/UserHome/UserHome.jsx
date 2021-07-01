import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { MOVIE } from "../../redux/types";
import UserHeader from '../UserHeader/UserHeader';
import axios from 'axios';
import { useHistory } from 'react-router';
import Logo from '../Logo/Logo';

const UserHome = (props) => {


    let history = useHistory()

    const [ topRated, setTopRated ] = useState([]);
    const [ upcoming, setUpcoming ] = useState([]);


    useEffect(() =>{
        getTopRated();
        getUpcoming();
    },[])


    useEffect(() =>{
       
    })


    const getTopRated = async () => {

        try {

            let res = await axios.get("http://localhost:3006/movies/toprated");

            setTopRated(res.data.results)

        } catch (error) {

            console.log( { message: error.message} );
        }
    }

    const getUpcoming = async () => {

        try {

            let res = await axios.get("http://localhost:3006/movies/upcoming");

            setUpcoming(res.data.results)

        } catch (error) {

            console.log( { message: error.message} );
        }
    }

    const getFilmInfo = (film) => {
        props.dispatch({ type: MOVIE, payload: film });

        history.push("/filminfo");
    }

    const baseImgUrl = "https://image.tmdb.org/t/p"
    const size = "w200"

    return(

        <div className="userHomeContainer">

            <Logo />
            
            <div className="userHeaderHome">
                <UserHeader/>
            </div>  
            <div className="userHomeContent">
                <div className="filmsCarrusel">
                    CARRUSEL DE PELICULAS NUEVAS
                </div>
                <p className="typeMovie">UPCOMING</p>
                <div className="prueba1">
                    
                    <div className="filmsContainer">
                        {upcoming.map((film, index) => (
        
                            <div className="contentFilm" key={index} onClick={() => getFilmInfo(film)}>
                               <img src={`${baseImgUrl}/${size}${film.poster_path}`} className="film" width="180" alt="poster"/>
                            </div>
                    
                        ))}

                    </div>
                </div>
                <p className="typeMovie">TOP RATED</p>
                <div className="prueba1">
                    
                    <div className="filmsContainer">
                        {topRated.map((film, index) => (
        
                            <div className="contentFilm" key={index} onClick={() => getFilmInfo(film)}>
                               <img src={`${baseImgUrl}/${size}${film.poster_path}`} className="film" width="180" alt="poster"/>
                            </div>
                    
                        ))}

                    </div>
                </div>
                <div className="prueba">THRILLER</div>
            </div> 

        </div>
    )

}

export default connect((state) => ({
    credentials: state.credentials,
  }))(UserHome);