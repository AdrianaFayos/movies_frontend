import React from 'react';
import { MOVIE } from "../../redux/types";
import { connect } from "react-redux";
import { useHistory } from 'react-router';
import Movie from '../Movie/Movie';

const CarruselFilms = (props) => {

    let history = useHistory();

    let movie = props.filmType1 ;
    

    const getFilmInfo = (film) => {
        props.dispatch({ type: MOVIE, payload: film });

        history.push("/filminfo");
    }

    



    return(
  
        <div>
            <div className="titleContent">
                <p className="typeMovie">{props.filmType.toUpperCase()}</p>
            </div>
            <div className="prueba1">
                
                <div className="filmsContainer">
                    {movie.map((film, index) => (

                        <div className="contentFilm" key={index} onClick={() => getFilmInfo(film)}>
                           <Movie movie={film} />
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