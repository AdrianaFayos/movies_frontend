import React from 'react';

const MoviePath = (props) => {

    const baseImgUrl = "https://image.tmdb.org/t/p"
    const size = "w200"

    if (props.path === null){
        return(
            <div className="imgFilm">
                <div className="moviePathTitle">{props.title}</div>
            </div>
        )

    } else {
        return(
            
            <div>
            <img src={`${baseImgUrl}/${size}${props.path}`} className="imgFilm" width="300" alt="poster"/>
            </div>
        )
    }

}

export default MoviePath;