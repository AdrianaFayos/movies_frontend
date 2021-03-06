import React, { useEffect, useState } from 'react';
import UserHeader from '../../components/UserHeader/UserHeader';
import axios from 'axios';
import Link from '../../components/Link/Link';
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faUsers, faTimes} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import moment from 'moment';
import Logo from '../../components/Logo/Logo';
import Error from '../../components/Error/Error';

const ClientInfo = (props) => {

    let history = useHistory();

    const [ orders, setOrders ] = useState([]);

    useEffect(() => {

        findOrders();

     // eslint-disable-next-line 
    },[]);

    useEffect(() => {

    });

    const submit = () => {
        confirmAlert({
            customUI: ({ onClose }) => {
              return (
                <div className="alert">
                  <h1 className="alert__title">Are you sure?</h1>
                  {/* <p className="alert__body">You want to delete this file?</p> */}
                  <div className="alertButtons">
                    <button onClick={onClose} className="alert__btn alert__btn--no">No</button>
                    <button
                      onClick={() => {
                        deleteUser();
                        onClose()
                      }}
                      className="alert__btn alert__btn--yes"
                    >
                      Yes, Delete it!
                    </button>
                  </div>
                </div>
              );
            }
          });
          
      }

    const findOrders = async () => {

        let token = props.credentials?.token;

        let body = {
            userId : props.client?.id
        }

        let res = await axios.post('https://afp-popstv-b.herokuapp.com/orders/findbyid', body, {headers:{'authorization':'Bearer ' + token}}); 
    
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

    const deleteUser = async () => {

        let token = props.credentials?.token;
        let id = props.client?.id;

        let body = {
            userId : id
        }

        await axios.post('https://afp-popstv-b.herokuapp.com/users/deleteuser', body, {headers:{'authorization':'Bearer ' + token}})

        history.push('allusers')
    }

    if (props.credentials?.user.isAdmin === true) {


        if(props.client?.id != null) {

            return(
                <div className="adminHomeContainer">
                    <Logo />
                    <div className="userHeaderHome">
                        <UserHeader/>
                    </div> 
                    <div className="adminHomeContent">
                        <div className="adminHeader">
                            <Link path="/allusers" destination={<FontAwesomeIcon icon={faUsers}/>}/>
                            <Link path="/allorders" destination={<FontAwesomeIcon icon={faList}/>}/>
                        </div>
                        <div className="clientInfoContent">
                            <div className="UserCards topCard">   
                                <div className="userOptions">
                                    <div className="button1">{props.client?.id} </div>   
                                    <div onClick={() => submit()} className="button1">{<FontAwesomeIcon icon={faTimes}/>}</div>
                                </div>
                               <p>NAME : {props.client?.firstname} </p>
                               <p>LASTNAME : {props.client?.lastname} </p>
                               <p>EMAIL : {props.client?.email} </p>
                               <p>PHONE : {props.client?.phone}</p>
                               <p>BIRTHDAY : {moment(props.client?.birthday).format('DD/MM/YYYY')}</p>
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
                                    <p>MOVIE ID : {order.movieId} </p>
                                    <p>RENTED : {moment(order.createdAt).format('DD/MM/YYYY')}</p>
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
            <div>
                <Error />
            </div>
        )
    }
}

export default connect((state) => ({
    credentials: state.credentials,
    client : state.client,
  }))(ClientInfo);