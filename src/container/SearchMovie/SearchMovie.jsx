import React, { useEffect, useState } from 'react';
import UserHeader from '../../components/UserHeader/UserHeader';
import axios from 'axios';
import { connect } from "react-redux";
import { MOVIE } from "../../redux/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Logo from '../../components/Logo/Logo';
import { useHistory } from 'react-router-dom';
import Movie from '../../components/Movie/Movie';

const SearchMovie = (props) => {

    let history = useHistory()

    //hooks 
    const [ searchMovie, setSearchMovie] = useState({
        movieTitle: ''
    });

    const [ movies, setMovies ] = useState([]);

    useEffect(() => {
        
    },[]);

    useEffect(() => {
        searchMovies ()
    });

    const updateSearch = (e) => {
        setSearchMovie({...searchMovie, [e.target.name]: e.target.value})
    }

    const searchMovies = async () => {
        let movie = searchMovie.movieTitle;

        let res = await axios.get('http://localhost:3006/movies/search/'+movie);

        setMovies(res.data.results)


    } 

    const getFilmInfo = (film) => {
        props.dispatch({ type: MOVIE, payload: film });

        history.push("/filminfo");
    }

    if (props.credentials?.user) {

        return(
            <div className="searchContainer">
                <Logo />
                <div className="userHeaderHome">
                    <UserHeader/>
                </div> 

                <div className="movieSearch">
                    <input type="text" name="movieTitle" id="" className="searcher" onChange={updateSearch} placeholder="Please enter a title"/>
                    <FontAwesomeIcon icon={faSearch}/>
                </div>
                <div className="searchContent">

                        {movies.map((film, index) => (
        
                            <div className="contentFilm" key={index} onClick={() => getFilmInfo(film)}>
                               <Movie movie={film} />
                            </div>
                    
                        ))}
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
  }))(SearchMovie);