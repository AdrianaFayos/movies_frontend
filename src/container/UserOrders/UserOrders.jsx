import React, { useEffect, useState } from 'react';
import UserHeader from '../../components/UserHeader/UserHeader';
import axios from 'axios';
import Link from '../../components/Link/Link';
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faUsers, faTimes} from "@fortawesome/free-solid-svg-icons";

const UserOrders = (props) => {

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

        let res = await axios.post('http://localhost:3006/orders/delete', body, {headers:{'authorization':'Bearer ' + token}})

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

    const baseImgUrl = "https://image.tmdb.org/t/p"
    const size = "w200"

    if (props.credentials?.user.isAdmin === true) {

        return(
            <div className="vista">
                <div className="userHeaderHome">
                    <UserHeader/>
                </div> 
                <div className="userOrdersContent">
                    
                        {orders.map((order, index) => (
                            <div key={index} className="AllOrderCards">
                                <div className="cross1">
                                     <div onClick={() => deleteOrder(order)} className="button">{<FontAwesomeIcon icon={faTimes}/>}</div>  
                                </div>     
                                <img className="OrderCardsImg" src={`${baseImgUrl}/${size}${order.moviePoster}`} width="180" alt="poster"/>
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