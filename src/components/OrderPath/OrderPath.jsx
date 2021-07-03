import React from 'react';

const OrderPath = (props) => {

    const baseImgUrl = "https://image.tmdb.org/t/p"
    const size = "w200"

    if (props.order.moviePoster === null){
        return(
            <div className="moviePath2">
                <div className="moviePathTitle">{props.order.movieTitle}</div>
            </div>
        )

    } else {
        return(
            
            <div>
            <img className="OrderCardsImg" src={`${baseImgUrl}/${size}${props.order.moviePoster}`} width="180" alt="poster"/>
            </div>
        )
    }

}

export default OrderPath;