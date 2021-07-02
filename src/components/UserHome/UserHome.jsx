import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { MOVIE } from "../../redux/types";
import UserHeader from '../UserHeader/UserHeader';
import axios from 'axios';
import { useHistory } from 'react-router';
import Logo from '../Logo/Logo';
import Carrusel from '../Carrusel/Carrusel';

const UserHome = (props) => {


    let history = useHistory()

    const [ topRated, setTopRated ] = useState([]);
    const [ upcoming, setUpcoming ] = useState([]);

    const [ genre, setGenre ] = useState({
        action : [],
        adventure : [],
        comedy : [],
        family : [],
        horror : [],
        romance : [],
        war : []
    });

    useEffect(() =>{
        getTopRated();
        getUpcoming();
        getByGenre('comedy');
        getByGenre('action');
        getByGenre('family');
        getByGenre('horror');
        getByGenre('romance');

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

    const getByGenre = async (type) => {

        try {

           let res = await axios.get("http://localhost:3006/movies/genre/"+type);
            
           genre[type] = res.data.results;


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
                <Carrusel />
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
                <p className="typeMovie">COMEDY</p>
                <div className="prueba1">
                    
                    <div className="filmsContainer">
                        {genre.comedy.map((film, index) => (
        
                            <div className="contentFilm" key={index} onClick={() => getFilmInfo(film)}>
                               <img src={`${baseImgUrl}/${size}${film.poster_path}`} className="film" width="180" alt="poster"/>
                            </div>
                    
                        ))}

                    </div>
                </div>
            
                <p className="typeMovie">ACTION</p>
                <div className="prueba1">
                    
                    <div className="filmsContainer">
                        {genre.action.map((film, index) => (
        
                            <div className="contentFilm" key={index} onClick={() => getFilmInfo(film)}>
                               <img src={`${baseImgUrl}/${size}${film.poster_path}`} className="film" width="180" alt="poster"/>
                            </div>
                    
                        ))}

                    </div>
                </div>

                <p className="typeMovie">FAMILY</p>
                <div className="prueba1">
                    
                    <div className="filmsContainer">
                        {genre.family.map((film, index) => (
        
                            <div className="contentFilm" key={index} onClick={() => getFilmInfo(film)}>
                               <img src={`${baseImgUrl}/${size}${film.poster_path}`} className="film" width="180" alt="poster"/>
                            </div>
                    
                        ))}

                    </div>
                </div>


                <p className="typeMovie">HORROR</p>
                <div className="prueba1">
                    
                    <div className="filmsContainer">
                        {genre.horror.map((film, index) => (
        
                            <div className="contentFilm" key={index} onClick={() => getFilmInfo(film)}>
                               <img src={`${baseImgUrl}/${size}${film.poster_path}`} className="film" width="180" alt="poster"/>
                            </div>
                    
                        ))}

                    </div>
                </div>

                <p className="typeMovie">ROMANCE</p>
                <div className="prueba1">
                    
                    <div className="filmsContainer">
                        {genre.romance.map((film, index) => (
        
                            <div className="contentFilm" key={index} onClick={() => getFilmInfo(film)}>
                               <img src={`${baseImgUrl}/${size}${film.poster_path}`} className="film" width="180" alt="poster"/>
                            </div>
                    
                        ))}

                    </div>
                </div>
                
            </div> 

        </div>
    )

}

export default connect((state) => ({
    credentials: state.credentials,
  }))(UserHome);