import React, {useEffect, useState} from 'react';
import UserHeader from '../../components/UserHeader/UserHeader';
import './AdminAllUsers.scss';
import axios from 'axios';
import Link from '../../components/Link/Link';
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faUsers, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import { CLIENT } from '../../redux/types';
import { useHistory } from 'react-router-dom';

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
                <div className="userHeaderHome">
                    <UserHeader/>
                </div> 
                <div className="adminHomeContent">
                    <div className="adminHeader">
                        <div className="iconsAdmin">{<FontAwesomeIcon icon={faUsers}/>}</div>
                        <Link path="/allorders" destination={<FontAwesomeIcon icon={faList}/>}/>
                    </div>
                    <div className="adminInfo allUsersContent">

                        {users.map((user, index) => (
                            <div key={index} className="UserCards">   
                                <div className="userOptions">
                                    <div className="button" onClick={() => userInfo(user)}>{user.id} </div>   
                                    <div onClick={() => deleteUser(user)} className="button">{<FontAwesomeIcon icon={faTrashAlt}/>}</div>
                                </div>
                                <p>NAME : {user.firstname} </p>
                                <p>LASTNAME : {user.lastname} </p>
                                <p>EMAIL : {user.email} </p>
                                <p>PHONE : {user.phone}</p>
                                <p>BIRTHDAY : {user.birthday}</p>
                                <p>CITY : {user.adress}</p>
                                <p>ROLE : {isAdminTest(user)}</p>
                                <div onClick={() => isAdminUpdate(user)} className="button">UPDATE ROLE</div>
                            
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