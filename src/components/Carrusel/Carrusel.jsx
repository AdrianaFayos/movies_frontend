import React, { useEffect, useState } from 'react';
import { MOVIE } from "../../redux/types";
import { connect } from "react-redux";
import axios from 'axios';
import { useHistory } from 'react-router';

const Carrusel = (props) => {

    let history = useHistory()

    const [popular, setPopular ] = useState({
        movies: [],
        i: 0,
    });

    useEffect (() =>{
    
        getPopular();

    },[] )


    useEffect(() =>{

      setTimeout(() => {
        goRight()
      }, 3500);
       
    })


    const getPopular = async () => {

        try {

            let res = await axios.get("http://localhost:3006/movies/popular");

            setPopular({ ...popular, movies: res.data.results });

        } catch (error) {

            console.log( { message: error.message} );
        }
    }

    const getFilmInfo = (film) => {
        props.dispatch({ type: MOVIE, payload: film });

        history.push("/filminfo");
    }

    const baseImgUrl = "https://image.tmdb.org/t/p"
    const size = "w200"

    const goRight = () => {
        let i = popular.i;
    
        if (i < popular.movies.length - 1) {
          i++;
        } else {
          i= 0;
        }
         setPopular({ ...popular, i: i });
      };
    
      // const goLeft = () => {
      //   let i = popular.i;
    
      //   if (i > 0) {
      //     i--;
      //   } else {
      //     i = popular.movies.length - 1;
      //   }
      //   setPopular({ ...popular, i: i });
      // };
    
      // let i = popular.movies.length - 1;

      let data1 = popular.movies;
    
      let result = [];
      for (let j = 0; j < data1.length; j++) {

        if (popular.i === j) {

          if(popular.movies[j].backdrop_path === null) {

            result.push(

              <div>
                  <div className="pathMovie">
                    <div className="backdropCont"></div>
                  </div>
                  <div className="contentCarrusel">
                      {/* <div className="buttonGo" onClick={() => goLeft()}>
                          <FontAwesomeIcon icon={faArrowLeft}/>
                      </div> */}
                      <div className="movieInfo">
                          <p className="filmTitle1">{popular.movies[j].title}</p>
                          <div className="button info" onClick={() => getFilmInfo(popular.movies[j])}>More information</div>
                      </div>
                      {/* <div className="buttonGo" onClick={() => goRight()}>
                          <FontAwesomeIcon icon={faArrowRight}/>
                      </div> */}
                  </div>
              </div>
  
              
              
            );
  
          } else {

            result.push(

              <div>
                  <div className="pathMovie">
                  <img src={`${baseImgUrl}/${size}${popular.movies[j].backdrop_path }`} className="backMovie" alt="poster" />
                  </div>
                  <div className="contentCarrusel">
                      {/* <div className="buttonGo" onClick={() => goLeft()}>
                          <FontAwesomeIcon icon={faArrowLeft}/>
                      </div> */}
                      <div className="movieInfo">
                          <p className="filmTitle1">{popular.movies[j].title}</p>
                          <div className="button info" onClick={() => getFilmInfo(popular.movies[j])}>More information</div>
                      </div>
                      {/* <div className="buttonGo" onClick={() => goRight()}>
                          <FontAwesomeIcon icon={faArrowRight}/>
                      </div> */}
                  </div>
              </div>
  
              
              
            );
          }
            
        }
      }


    return(
  
        <div>
            <div className="filmsCarrusel">
                {result}
            </div>
         </div>
    )

}

export default connect((state) => ({
    credentials: state.credentials,
  }))(Carrusel);