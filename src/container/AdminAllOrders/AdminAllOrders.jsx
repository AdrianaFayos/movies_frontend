import React, { useEffect, useState } from 'react';
import UserHeader from '../../components/UserHeader/UserHeader';
import './AdminAllOrders.scss';
import axios from 'axios';
import Link from '../../components/Link/Link';
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faUsers} from "@fortawesome/free-solid-svg-icons";
// import Link from '../../components/Link/Link';

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
                        <Link path="/allusers" destination={<FontAwesomeIcon icon={faUsers}/>}/>
                        <div className="iconsAdmin">{<FontAwesomeIcon icon={faList}/>}</div>
                    </div>
                    <div className="adminInfo allUsersContent">
                        {orders.map((order, index) => (
                            <div key={index} className="OrderCards">        
                                <p>USER ID : {order.userId} </p>
                                <p>MOVIE : {order.movieTitle} </p>
                                <p>MOVIE ID : {order.movieId} </p>
                                <p>RENTED : {order.rentedDate}</p>
                                <p>RETURNED : {order.returnDate}</p>
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