import React from 'react';
import { useHistory } from 'react-router-dom';
import { MOVIE } from "../../redux/types";
import { connect } from "react-redux";

const Movie = (props) => {

    let history = useHistory()

    const baseImgUrl = "https://image.tmdb.org/t/p"
    const size = "w200";

    const getFilmInfo = (film) => {
        props.dispatch({ type: MOVIE, payload: film });

        history.push("/filminfo");
    }

    if(!props.movie){

        return(
            <div className="moviePath2">
            
            </div>
        )

    }
    if (props.movie.poster_path === null){
        return(
            <div className="moviePath1" onClick={() => getFilmInfo(props.movie)}>
                <div className="moviePathTitle">{props.movie.title}</div>
            </div>
        )

    } else {
        return(
            
            <div onClick={() => getFilmInfo(props.movie)}>
            <img src={`${baseImgUrl}/${size}${props.movie.poster_path}`} className="film" alt="poster"/>
            </div>
        )
    }

}

export default connect((state) => ({
    credentials: state.credentials,
  }))(Movie);