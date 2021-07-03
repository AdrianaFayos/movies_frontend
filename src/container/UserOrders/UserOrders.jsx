import React, { useEffect, useState } from 'react';
import UserHeader from '../../components/UserHeader/UserHeader';
import axios from 'axios';
import { connect } from "react-redux";
import { MOVIE } from "../../redux/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import OrderPath from '../../components/OrderPath/OrderPath';
import Error from '../../components/Error/Error';


const UserOrders = (props) => {

    let history = useHistory()

    const [ orders, setOrders ] = useState([]);

    useEffect(() => {

        findAllOrders();

    },[]);

    useEffect(() => {

    });

    const deleteOrder = async (order) => {

        let token = props.credentials?.token;
        let id = props.credentials?.user.id;

        let body = {
            userId : id,
            id : order.id
        }

        await axios.post('http://localhost:3006/orders/delete', body, {headers:{'authorization':'Bearer ' + token}})

        window.location.reload();

    }

    const findAllOrders = async () => {

        let token = props.credentials?.token;

        let body = {
            userId : props.credentials?.user.id
        }

        let res = await axios.post('http://localhost:3006/orders/findbyuser', body , {headers:{'authorization':'Bearer ' + token}});  

        setOrders(res.data)

    }

    const getFilmInfo = async (film) => {

        let id = film.movieId

        let res = await axios.get('http://localhost:3006/movies/searchid/' + id)

        props.dispatch({ type: MOVIE, payload: res.data });

        history.push("/filminfo");
    }


    if (props.credentials?.user) {

        return(
            <div className="userOrderContainer">
                <Logo />
                <div className="userHeaderHome">
                    <UserHeader/>
                </div> 
                
                <div className="userOrdersContent">
                    
                        {orders.map((order, index) => (
                            <div key={index} className="AllOrderCards">
                                <div className="cross1">
                                     <div onClick={() => deleteOrder(order)} className="button1">{<FontAwesomeIcon icon={faTimes}/>}</div>  
                                </div>     
                                <div className="" onClick={() => getFilmInfo(order)}>
                                     <OrderPath order={order} />
                                </div>
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
  }))(UserOrders);