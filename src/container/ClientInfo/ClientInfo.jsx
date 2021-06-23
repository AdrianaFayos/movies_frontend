import React, { useEffect, useState } from 'react';
import UserHeader from '../../components/UserHeader/UserHeader';
import './ClientInfo.scss';
import axios from 'axios';
import Link from '../../components/Link/Link';
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faUsers} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from 'react-router-dom';

const ClientInfo = (props) => {

    let history = useHistory();

    const [ orders, setOrders ] = useState([]);

    useEffect(() => {

        findOrders();

    },[]);

    useEffect(() => {

    });

    const findOrders = async () => {

        let token = props.credentials?.token;

        let body = {
            userId : props.client?.id
        }

        let res = await axios.post('http://localhost:3006/orders/findbyid', body, {headers:{'authorization':'Bearer ' + token}}); 
        
        console.log(res.data)

        setOrders(res.data)

    }

    const isAdminTest = (user) => {
        if (user.isAdmin === true) {

            let isAdmin = "Admin";
            return isAdmin;

        } else {

            let isAdmin = "User";
            return isAdmin;
        } 
    }


    if (props.credentials?.user.isAdmin === true) {


        if(props.client?.id != null) {

            return(
                <div className="adminHomeContainer">
                    <div className="userHeaderHome">
                        <UserHeader/>
                    </div> 
                    <div className="adminHomeContent">
                        <div className="adminHeader">
                            <Link path="/allusers" destination={<FontAwesomeIcon icon={faUsers}/>}/>
                            <Link path="/allorders" destination={<FontAwesomeIcon icon={faList}/>}/>
                        </div>
                        <div className="clientInfoContent">
                            <div className="UserCards">   
                               <p>ID: {props.client?.id}</p> 
                               <p>NAME : {props.client?.firstname} </p>
                               <p>LASTNAME : {props.client?.lastname} </p>
                               <p>EMAIL : {props.client?.email} </p>
                               <p>PHONE : {props.client?.phone}</p>
                               <p>BIRTHDAY : {props.client?.birthday}</p>
                               <p>CITY : {props.client?.adress}</p>
                               <p>ROLE : {isAdminTest(props.client)}</p>
    
                               {/* <div className="userOptions">
                                   <div onClick={() => deleteUser(user)} className="button">REMOVE</div>
                                   <div onClick={() => isAdminUpdate(user)} className="button">UPDATE ROLE</div>
                               </div> */}
                            </div>
                            <div className="userOrders">

                                {orders.map((order, index) => (
                                <div key={index} className="OrderCardsUser">        
                                    <p>MOVIE : {order.movieTitle} </p>
                                    <p>RENTED : {order.rentedDate}</p>
                                    <p>RETURNED : {order.returnDate}</p>
                                </div>
                                ))}
    
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {

            return(
                <div className="adminHomeContainer">
                    <div className="userHeaderHome">
                        <UserHeader/>
                    </div> 
                    <div className="adminHomeContent">
                        <div className="adminHeader">
                            <Link path="/allusers" destination={<FontAwesomeIcon icon={faUsers}/>}/>
                            <Link path="/allorders" destination={<FontAwesomeIcon icon={faList}/>}/>
                        </div>
                        <div className="adminInfoContent">
                            <p className="text1">Please select a user.</p>
                        </div>
                    </div>
                </div>
            )

        }

    } else {
        return (
            <div>NO TIENES PERMISO</div>
        )
    }
}

export default connect((state) => ({
    credentials: state.credentials,
    client : state.client,
  }))(ClientInfo);