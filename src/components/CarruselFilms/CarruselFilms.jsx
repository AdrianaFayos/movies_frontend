import React, { useEffect, useState } from 'react';
import { MOVIE } from "../../redux/types";
import { connect } from "react-redux";
import { useHistory } from 'react-router';

const CarruselFilms = (props) => {

    let history = useHistory();

    let movie = props.filmType1 ;
    

    const getFilmInfo = (film) => {
        props.dispatch({ type: MOVIE, payload: film });

        history.push("/filminfo");
    }

    const baseImgUrl = "https://image.tmdb.org/t/p"
    const size = "w200"

    return(
  
        <div>
           <p className="typeMovie">{props.filmType.toUpperCase()}</p>
                <div className="prueba1">
                    
                    <div className="filmsContainer">
                        {movie.map((film, index) => (
        
                            <div className="contentFilm" key={index} onClick={() => getFilmInfo(film)}>
                               <img src={`${baseImgUrl}/${size}${film.poster_path}`} className="film" width="180" alt="poster"/>
                            </div>
                    
                        ))}

                    </div>
                </div>
         </div>
    )

}

export default connect((state) => ({
    credentials: state.credentials,
  }))(CarruselFilms);