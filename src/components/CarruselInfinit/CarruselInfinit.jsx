import React, { useState } from 'react';
import { connect } from "react-redux";
import Movie from '../Movie/Movie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';


const CarruselInfinit = (props) => {

    const [popular, setPopular ] = useState({
        i: 0,
    });


    const goRight = () => {
        let i = popular.i;
    
        if (i < props.type.length - 1) {
          i = i+1;
        } else {
          i= 0;
        }
         setPopular({ ...popular, i: i });
      };
    
      const goLeft = () => {
        let i = popular.i;
    
        if (i > 0) {
          i = i-1;
        } else {
          i = ( props.type.length - 7 );
        }
        setPopular({ ...popular, i: i });
      };
    
      // let i = popular.movies.length - 1;

      let movies = [];
      let x = popular.i + 7;

      let data1 = props.type;
      let result = [];

      for (let n = popular.i ; n < x ; n ++ ){

        if (n < data1.length) {
           movies.push( <Movie movie={props.type[n]}/> )
        } else {
          popular.i = 0
        }

      }

      for (let j = 0 ; j < data1.length ; j++) {

        if (popular.i === j) {

            result.push(

                <div>
                <div className="titleContent">
                    <p className="typeMovie">{props.filmType.toUpperCase()}</p>
                </div>
                
                <div className="prueba2">

                     <div className="buttonGo" onClick={() => goLeft()}>
                          <FontAwesomeIcon icon={faArrowLeft}/>
                      </div>

                     {movies}

                     <div className="buttonGo" onClick={() => goRight()}>
                        <FontAwesomeIcon icon={faArrowRight}/>
                     </div>
                     
                </div>
             </div>
  
              
              
            );
   
        }
      }


    return(
  
        <div>
            <div className="filmsCarruselType">
                {result}
            </div>
         </div>
    )

}

export default connect((state) => ({
    credentials: state.credentials,
  }))(CarruselInfinit);