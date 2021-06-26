import React from 'react';
import {useHistory} from 'react-router-dom';


const Link = (props) => {

    let history = useHistory();

    const go = () => {
        history.push(props.path)
    }

    return(
  
        <div className="buttonLink" onClick={() => go()}>
            {props.destination}
        </div>
    )

}

export default Link;