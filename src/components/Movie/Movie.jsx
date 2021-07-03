import React from 'react';

const Movie = (props) => {

    const baseImgUrl = "https://image.tmdb.org/t/p"
    const size = "w200"

    if (props.movie.poster_path === null){
        return(
            <div className="moviePath1">
                <div className="moviePathTitle">{props.movie.title}</div>
            </div>
        )

    } else {
        return(
            
            <div>
            <img src={`${baseImgUrl}/${size}${props.movie.poster_path}`} className="film" alt="poster"/>
            </div>
        )
    }

}

export default Movie;