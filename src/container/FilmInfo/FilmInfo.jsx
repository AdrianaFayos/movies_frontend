import React, { useEffect, useState } from 'react';
import UserHeader from '../../components/UserHeader/UserHeader';
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTimes, faPlay} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import ReactPlayer from 'react-player';
import Logo from '../../components/Logo/Logo';

const FilmInfo = (props) => {

    let history = useHistory();

    const [ video, setVideo] = useState('');

    const [ movieOrder, setMovieOrder ] = useState('');

    useEffect(() => {
        checkOrder();
    },[]);

    useEffect(() => {
    });

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

            console.log(token,user)
    
            let res = await axios.post("http://localhost:3006/orders/create", body, {
            headers: { authorization: "Bearer " + token }
            });

            swal({
                text: "Movie added successfully",
                icon: "success",
                button: 'Close',
                timer: 2500,    
            })

            setTimeout(() => {
                window.location.reload();
              }, 750);

        } catch (error) {

            swal({
                text: "You already have this movie",
                icon: "error",
                button: 'Close',
                timer: 2500,
                
            })
            

        }

    }

    const playVideo = async () => {

        let body = {
            movieId : props.movie?.id,
        }

        let res = await axios.post("http://localhost:3006/movies/play", body)

        setVideo(res.data)
    }

    const resetMovie = () => {
        setVideo('')
    }

    const checkOrder = async () => {

        try {
            let token = props.credentials?.token;
            let user = props.credentials?.user;

            let body = {
            userId : user.id,
            movieId : props.movie?.id,
            }

            let res = await axios.post("http://localhost:3006/orders/findbymovie", body, {
            headers: { authorization: "Bearer " + token }
            });

            let movie = JSON.stringify(res.data[0].movieId)

            console.log(movie) 
            setMovieOrder(movie)
            console.log(movieOrder)

        } catch {
            
        }
    }


    if(video != '') {

        return(
            <div>
                <div className="resetButon">
                    <div onClick={() => resetMovie()} className="button cross">{<FontAwesomeIcon icon={faTimes}/>}</div>
                </div>    
                <ReactPlayer url={video} width="100vw" height="100vh" controls="unset"/>
            </div>
        )


    } else if (props.credentials?.user) {

        if ( movieOrder != '' ) {

        return(
            <div className="filmHomeContainer">
                <Logo />
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
                                {/* <div className="button" onClick={() => addToList()}>ADD TO LIST</div> */}
                                <div className="button" onClick={() => playVideo()}>{<FontAwesomeIcon icon={faPlay}/>}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

        } else if(movieOrder === '') {

            return (

            <div className="filmHomeContainer">
                <Logo />
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
                                {/* <div className="button" onClick={() => playVideo()}>{<FontAwesomeIcon icon={faPlay}/>}</div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            )

        }

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