import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import UserHeader from '../UserHeader/UserHeader';
import axios from 'axios';
import Logo from '../Logo/Logo';
import Carrusel from '../Carrusel/Carrusel';
import CarruselFilms from '../CarruselFilms/CarruselFilms';

const UserHome = () => {

    const [ topRated, setTopRated ] = useState([]);
    const [ upcoming, setUpcoming ] = useState([]);

    const [ genre, setGenre ] = useState({
        action : [],
        adventure : [],
        comedy : [],
        family : [],
        horror : [],
        romance : [],
        war : []
    });

    useEffect(() =>{
        getTopRated();
        getUpcoming();
        getByGenre('comedy');
        getByGenre('action');
        // getByGenre('family');
        // getByGenre('horror');
        // getByGenre('romance');

    },[])


    useEffect(() =>{
       
    })


    const getTopRated = async () => {

        try {

            let res = await axios.get("http://localhost:3006/movies/toprated");

            setTopRated(res.data.results)

        } catch (error) {

            console.log( { message: error.message} );
        }
    }


    const getUpcoming = async () => {

        try {

            let res = await axios.get("http://localhost:3006/movies/upcoming");

            setUpcoming(res.data.results)

        } catch (error) {

            console.log( { message: error.message} );
        }
    }

    const getByGenre = async (type) => {

        try {

           let res = await axios.get("http://localhost:3006/movies/genre/"+type);

           // setGenre({genre[type]: res.data.results})
           // In the previous way I only could save a value of genre object
            
           genre[type] = res.data.results;


        } catch (error) {

            console.log( { message: error.message} );
        }

    }
    

    return(

        <div className="userHomeContainer">

            <Logo />
            
            <div className="userHeaderHome">
                <UserHeader/>
            </div>  
            <div className="userHomeContent">
                <Carrusel />
            
                <CarruselFilms filmType="upcoming" filmType1={upcoming} />

                <CarruselFilms filmType="top rated" filmType1={topRated} />
                
                <CarruselFilms filmType="comedy" filmType1={genre.comedy} />
                
                <CarruselFilms filmType="action" filmType1={genre.action} />
                
                {/* <CarruselFilms filmType="family" filmType1={genre.family} /> */}
                
                {/* <CarruselFilms filmType="horror" filmType1={genre.horror} />

                <CarruselFilms filmType="romance" filmType1={genre.romance} />
                 */}
                
            </div> 

        </div>
    )

}

export default connect((state) => ({
    credentials: state.credentials,
  }))(UserHome);