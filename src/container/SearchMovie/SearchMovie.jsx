import React, { useEffect, useState } from 'react';
import UserHeader from '../../components/UserHeader/UserHeader';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Logo from '../../components/Logo/Logo';
import { connect } from "react-redux";
import Movie from '../../components/Movie/Movie';
import Error from '../../components/Error/Error';


const SearchMovie = (props) => {

    //hooks 
    const [ searchMovie, setSearchMovie] = useState({
        movieTitle: ''
    });

    const [ movies, setMovies ] = useState([]);

    useEffect(() => {
        
    },[]);

    useEffect(() => {
        setTimeout(() => {
            searchMovies ()
          }, 500);
    });

    const updateSearch = (e) => {
        setSearchMovie({...searchMovie, [e.target.name]: e.target.value})
    }

    const searchMovies = async () => {
        
        if (searchMovie.movieTitle[0]){
            let movie = searchMovie.movieTitle;

            let res = await axios.get('https://afp-popstv-b.herokuapp.com/movies/search/'+movie);
        
            setMovies(res.data.results)
        }
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
        
                            <div className="contentFilm" key={index}>
                               <Movie movie={film} />
                            </div>
                    
                        ))}
                </div>
            </div>
        )

    } else {
        return (
            <div>
                <Error />
            </div>
        )
    }
}

export default connect((state) => ({
    credentials: state.credentials,
  }))(SearchMovie);