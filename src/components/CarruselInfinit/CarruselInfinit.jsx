import React, { useEffect, useState } from 'react';
import { MOVIE } from "../../redux/types";
import { connect } from "react-redux";
import axios from 'axios';
import { useHistory } from 'react-router';
import Movie from '../Movie/Movie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';


const CarruselInfinit = (props) => {

    const [popular, setPopular ] = useState({
        i: 0,
    });


    const goRight = () => {
        let i = popular.i;
    
        if (i < props.type.length - 5) {
          i = i+5;
        } else {
          i= 0;
        }
         setPopular({ ...popular, i: i });
      };
    
      const goLeft = () => {
        let i = popular.i;
    
        if (i > 0) {
          i = i-5;
        } else {
          i = props.type.length - 5;
        }
        setPopular({ ...popular, i: i });
      };
    
      // let i = popular.movies.length - 1;

      let data1 = props.type;
    
      let result = [];
      for (let j = 0; j < data1.length; j++) {

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
                     <Movie movie={props.type[j]} />
                     <Movie movie={props.type[j+1]} />
                     <Movie movie={props.type[j+2]} />
                     <Movie movie={props.type[j+3]} />
                     <Movie movie={props.type[j+4]} />

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