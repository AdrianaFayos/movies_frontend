import React, { useEffect, useState } from 'react';
import UserHeader from '../../components/UserHeader/UserHeader';
import axios from 'axios';
import Link from '../../components/Link/Link';
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faUsers} from "@fortawesome/free-solid-svg-icons";
import Tooltip from "react-simple-tooltip";
import moment from 'moment'

const AdminAllOrders = (props) => {

    const [ orders, setOrders ] = useState([]);

    useEffect(() => {

        findAllOrders();

    },[]);

    useEffect(() => {

    });



    const findAllOrders = async () => {

        let token = props.credentials?.token;

        let res = await axios.get('http://localhost:3006/orders', {headers:{'authorization':'Bearer ' + token}});  

        setOrders(res.data)

    }

    if (props.credentials?.user.isAdmin === true) {

        return(
            <div className="adminHomeContainer">
                <div className="userHeaderHome">
                    <UserHeader/>
                </div> 
                <div className="adminHomeContent">
                    <div className="adminHeader">
                    <Tooltip content="Users" placement="top" background="#8191A6" padding="10" radius="2" border="unset">
                        <Link path="/allusers" destination={<FontAwesomeIcon icon={faUsers}/>}/>
                    </Tooltip>   
                    <Tooltip content="Orders" placement="top" background="#8191A6" padding="10" radius="2" border="unset">
                        <div className="iconsAdmin">{<FontAwesomeIcon icon={faList}/>}</div>
                    </Tooltip>     
                    </div>
                    <div className="adminInfo allUsersContent">
                        {orders.map((order, index) => (
                            <div key={index} className="OrderCards">        
                                <p>USER ID : {order.userId} </p>
                                <p>MOVIE : {order.movieTitle} </p>
                                <p>MOVIE ID : {order.movieId} </p>
                                <p>RENTED : {moment(order.createdAt).format('DD/MM/YYYY')}</p>
                            </div>
                        ))}
                    </div>
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
  }))(AdminAllOrders);