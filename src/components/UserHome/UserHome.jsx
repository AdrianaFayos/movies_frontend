import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import UserHeader from '../UserHeader/UserHeader';
import axios from 'axios';
import Logo from '../Logo/Logo';
import Carrusel from '../Carrusel/Carrusel';
//import CarruselFilms from '../CarruselFilms/CarruselFilms';
import CarruselInfinit from '../CarruselInfinit/CarruselInfinit';

const UserHome = () => {

    const [ topRated, setTopRated ] = useState([]);
    const [ upcoming, setUpcoming ] = useState([]);

    // eslint-disable-next-line 
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
        getByGenre('comedy');
        getByGenre('action');
        getTopRated();
        getUpcoming();
        
        // getByGenre('family');
        // getByGenre('horror');
        // getByGenre('romance');


// eslint-disable-next-line 
    },[])


    useEffect(() =>{
       
    })


    const getTopRated = async () => {

        try {

            let res = await axios.get("https://afp-popstv-b.herokuapp.com/movies/toprated");

            setTopRated(res.data.results)

        } catch (error) {

            console.log( { message: error.message} );
        }
    }


    const getUpcoming = async () => {

        try {

            let res = await axios.get("https://afp-popstv-b.herokuapp.com/movies/upcoming");

            setUpcoming(res.data.results)

        } catch (error) {

            console.log( { message: error.message} );
        }
    }

    const getByGenre = async (type) => {

        try {

           let res = await axios.get("https://afp-popstv-b.herokuapp.com/movies/genre/"+type);

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

                {/* <CarruselFilms filmType="upcoming" filmType1={upcoming} /> */}
            
                <CarruselInfinit  filmType="upcoming" type={upcoming}/>

                <CarruselInfinit  filmType="top rated" type={topRated}/>

                <CarruselInfinit  filmType="action" type={genre.action}/>

                <CarruselInfinit  filmType="comedy" type={genre.comedy}/>
                                
            </div> 

        </div>
    )

}

export default connect((state) => ({
    credentials: state.credentials,
  }))(UserHome);