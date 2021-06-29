import React from 'react';
import UserHeader from '../../components/UserHeader/UserHeader';
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTimes} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
// import Router from 'next/router'

const FilmInfo = (props) => {

    let history = useHistory();
    const baseImgUrl = "https://image.tmdb.org/t/p"
    const size = "w200"

    const addToList = async () => {

         try {

            let token = props.credentials?.token;
            let user = props.credentials?.user;
    
            let body = {
                userId : user.id,
                movieId : props.movie?.id,
                movieTitle: props.movie?.title,
                moviePoster : props.movie?.poster_path,
                rentedDate : "2021-04-20",
                returnDate : "2021-05-20"
            }
    
            let res = await axios.post("http://localhost:3006/orders/create", body, {
            headers: { authorization: "Bearer " + token }
            });

            // setTimeout(() => {
            //     history.push("/");
            //   }, 550);

            swal({
                title: "Movie added successfully",
                icon: "success",
                button: "Close",
                timer: 2500
            })

            setTimeout(() => {
                history.push("/");
              }, 750);

        } catch (error) {

            swal({
                title: "You already have this movie",
                icon: "error",
                button: "Close",
                timer: 2500
            })

        }

    }

    if (props.credentials?.user) {

        return(
            <div className="filmHomeContainer">
                <div className="userHeaderHome">
                    <UserHeader/>
                </div> 
                <div className="filmInfoContent">
                    <div className="closeButon">
                        <div onClick={() => window.history.back()} className="button cross">{<FontAwesomeIcon icon={faTimes}/>}</div>
                    </div>
                    <div className="filmInformation">
                        <img className="imgFilm" src={`${baseImgUrl}/${size}${props.movie?.poster_path}`} width="300" alt="poster"/>
                        <div className="infoFilm">
                            <p className="filmTitle">{props.movie?.title}</p>
                            <p className="filmOverview">{props.movie?.overview}</p>
                            <p>{props.movie?.release_date}</p>
                            <p>{<FontAwesomeIcon icon={faStar}/>} {props.movie?.vote_average}</p>
                            <div className="rentButtons">
                                <div className="button" onClick={() => addToList()}>ADD TO LIST</div>
                            </div>
                        </div>
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
    movie : state.movie
  }))(FilmInfo);