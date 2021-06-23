import React, { useEffect, useState } from 'react';
import UserHeader from '../../components/UserHeader/UserHeader';
import './UserOrders.scss';
import axios from 'axios';
import Link from '../../components/Link/Link';
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faUsers} from "@fortawesome/free-solid-svg-icons";

const UserOrders = (props) => {

    const [ orders, setOrders ] = useState([]);

    useEffect(() => {

        findAllOrders();

    },[]);

    useEffect(() => {

    });



    const findAllOrders = async () => {

        let token = props.credentials?.token;

        let body = {
            userId : props.credentials?.user.id
        }

        let res = await axios.post('http://localhost:3006/orders/findbyuser', body , {headers:{'authorization':'Bearer ' + token}});  

        setOrders(res.data)

    }

    if (props.credentials?.user.isAdmin === true) {

        return(
            <div className="vista">
                <div className="userHeaderHome">
                    <UserHeader/>
                </div> 
                <div className="userOrdersContent">
                    
                        {orders.map((order, index) => (
                            <div key={index} className="OrderCards">        
                                <p>MOVIE : {order.movieTitle} </p>
                                <p>IMAGEN</p>
                                <p>RENTED : {order.rentedDate}</p>
                                <p>RETURNED : {order.returnDate}</p>
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
  }))(UserOrders);