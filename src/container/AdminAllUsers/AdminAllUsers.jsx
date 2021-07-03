import React, {useEffect, useState} from 'react';
import UserHeader from '../../components/UserHeader/UserHeader';
import axios from 'axios';
import Link from '../../components/Link/Link';
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faUsers, faTrashAlt, faTimes} from "@fortawesome/free-solid-svg-icons";
import { CLIENT } from '../../redux/types';
import { useHistory } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Tooltip from "react-simple-tooltip";
import moment from 'moment'
import Logo from '../../components/Logo/Logo'

const AdminAllUsers = (props) => {

    let history = useHistory();

    const [ users, setUsers ] = useState([]);

    useEffect(() => {

        findAllUsers();

    },[]);

    useEffect(() => {

    });


    const findAllUsers = async () => {

        try {

            let token = props.credentials?.token;
    
            let res = await axios.get('http://localhost:3006/users', {headers:{'authorization':'Bearer ' + token}});  
        
            setUsers(res.data)

        } catch (error) {

            console.log(error);
        }

    }

    const submit = (user1) => {
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
                      deleteUser(user1);
                      onClose();
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

    const deleteUser = async (user) => {

        let token = props.credentials?.token;
        let id = user.id;

        let body = {
            userId : id
        }

        let res = await axios.post('http://localhost:3006/users/deleteuser', body, {headers:{'authorization':'Bearer ' + token}})

        window.location.reload();

    }

    const isAdminUpdate = async (user) => {

        let token = props.credentials?.token;
        let id = user.id;

        let body = {
            userId : id
        }

        let res = await axios.post('http://localhost:3006/users/isadminupdate', body, {headers:{'authorization':'Bearer ' + token}})

        window.location.reload();

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

    const userInfo = async (user) => {

        props.dispatch({ type: CLIENT, payload: user });

         history.push("/clientinfo");

    }


    if (props.credentials?.user.isAdmin === true) {

        return(

            <div className="adminHomeContainer">
                <Logo />
                <div className="userHeaderHome">
                    <UserHeader/>
                </div> 
                <div className="adminHomeContent">
                    <div className="adminHeader">

                        <Tooltip content="Users" placement="top" background="#8191A6" padding="10" radius="2" border="unset">
                            <div className="iconsAdmin">{<FontAwesomeIcon icon={faUsers}/>}</div>
                        </Tooltip>   
                        <Tooltip content="Orders" placement="top" background="#8191A6" padding="10" radius="2" border="unset">
                            <Link path="/allorders" destination={<FontAwesomeIcon icon={faList}/>}/> 
                        </Tooltip> 
                        
                    </div>
                    <div className="adminInfo allUsersContent">

                        {users.map((user, index) => (
                            <div key={index} className="UserCards">   
                                <div className="userOptions">
                                    <div className="button1" onClick={() => userInfo(user)}>{user.id} </div>   
                                    <div onClick={() => submit(user)} className="button1">{<FontAwesomeIcon icon={faTimes}/>}</div>
                                </div>
                                <p>NAME : {user.firstname} </p>
                                <p>LASTNAME : {user.lastname} </p>
                                <p>EMAIL : {user.email} </p>
                                <p>PHONE : {user.phone}</p>
                                <p>BIRTHDAY : {moment(user.birthday).format('DD/MM/YYYY')}</p>
                                <p>CITY : {user.adress}</p>
                                <p>ROLE : {isAdminTest(user)}</p>
                                <div onClick={() => isAdminUpdate(user)} className="button">UPDATE ROLE</div>
                            {/* <div className="button" onClick={() => submit()}>prueba</div> */}
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
  }))(AdminAllUsers);