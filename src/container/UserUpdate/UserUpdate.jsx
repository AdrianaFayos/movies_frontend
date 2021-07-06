import React , {useState} from 'react';
import UserHeader from '../../components/UserHeader/UserHeader';
import axios from 'axios';
import { connect } from 'react-redux';
import {useHistory} from 'react-router-dom';
import { UPDATE_USER } from '../../redux/types';
import Logo from '../../components/Logo/Logo';
import Error from '../../components/Error/Error';


const UserUpdate = (props) => {

    let history = useHistory();

    // Hooks

    const [updateInfo, setUpdateInfo] = useState({
        firstname : props.credentials?.user.firstname,
        lastname : props.credentials?.user.lastname,
        email: props.credentials?.user.email,
        phone : props.credentials?.user.phone,
        adress: props.credentials?.user.adress
    });

    const [passwords, setPasswords] = useState({
        oldPassword : "",
        newPassword : "",
        newPassword2 : ""
    });

    const [errors, setErrors] = useState({
        eName: '',
        eLastname: '',
        eEmail: '',
        ePhone: '',
        ePassword: '',
        ePassword2: '',
        eCity: '',
        eValidate:''
    });


    // Handlers
    const updateInfoUser = (e) => {
        setUpdateInfo({...updateInfo, [e.target.name]: e.target.value})
    }

    const updatePasswordClient = (e) => {
        setPasswords({...passwords, [e.target.name]: e.target.value})
    }

    const updateUser = async () => {

        try {

            let token = props.credentials?.token;
            let user = props.credentials?.user;
    
            let body = {

                userId: user.id,
                firstname: updateInfo.firstname,
                lastname: updateInfo.lastname,
                email: updateInfo.email,
                phone: updateInfo.phone,
                adress: updateInfo.adress,
            
            }
    
            let res = await axios.put('https://afp-popstv-b.herokuapp.com/users', body, {headers:{'authorization':'Bearer ' + token}});

    
            props.dispatch({type: UPDATE_USER, payload:res.data});
    
            setTimeout(()=>{
                history.push('/profile');
            },750);

        } catch {
            setErrors({...errors, eValidate1: 'Could not be completed., please try again'});
        }
 
    }
    

    const updatePassword = async () => {

        try{
 
             let token = props.credentials?.token;
             let user = props.credentials?.user;

             let body = {
                 userId: user.id,
                 oldPassword : passwords.oldPassword,
                 newPassword : passwords.newPassword
             
             }

             if(passwords.newPassword === passwords.newPassword2){
             let res = await axios.put('https://afp-popstv-b.herokuapp.com/users/password', body, {headers:{'authorization':'Bearer ' + token}});

             props.dispatch({type: UPDATE_USER, payload:res.data});
             
             setTimeout(()=>{
                 history.push('/profile');
             },750);
            }else {
                setErrors({...errors, eValidate2: 'Please confirm your password.'});
            }
 
        } catch {
            setErrors({...errors, eValidate2: 'Wrong password, please try again'});
        }
 
         
    }

    const checkError = (arg) => {
        switch (arg){
            case 'firstname':
                if ((updateInfo.firstname.length < 2)||(! /^[a-z ,.'-]+$/i.test(updateInfo.firstname))||(updateInfo.firstname.length > 20)){
                    setErrors({...errors, eName: 'Please enter a valid name'});
                }else{
                    setErrors({...errors, eName: ''});
                }
            break;

            case 'lastname':
                if ((updateInfo.lastname.length < 2)||(! /^[a-z ,.'-]+$/i.test(updateInfo.lastname))||(updateInfo.lastname.length > 20)){
                    setErrors({...errors, eLastname: 'Please enter a valid lastname'});
                }else{
                    setErrors({...errors, eLastname: ''});
                }
            break;

            case 'email':
                if (! /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(updateInfo.email)){
                    setErrors({...errors, eEmail: 'Please enter a valid e-mail'});
                }else{
                    setErrors({...errors, eEmail: ''});
                }
                
            break;

            case 'password':
                 if (! /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(passwords.newPassword)){
                // if (updateInfo.password.length < 8){
                    // setErrors({...errors, ePassword: 'At least 8 characters, must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number. Can contain special characters'});
                    setErrors({...errors, ePassword: 'Password must have at least 8 characters'});
                }else{
                    setErrors({...errors, ePassword: ''});
                }
            break;

            case 'phone':
                if ((! /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/gm.test(updateInfo.phone))||(updateInfo.phone.length > 16)){
                // if (updateInfo.password.length < 8){
                    setErrors({...errors, ePhone: 'Wrong phone number'});
                }else{
                    setErrors({...errors, ePhone: ''});
                }
            break;

            case 'password2':
                if (passwords.newPassword !== passwords.newPassword2){
                    setErrors({...errors, ePassword2: 'Password should be the same'});
                }else{
                    setErrors({...errors, ePassword2: ''});
                }
            break;

            default:
                break;
        }
    }

    
    if(props.credentials?.user.id) {

        return(
    
            <div className="updateView">
                <Logo />
                <div className="userHeaderHome">
                    <UserHeader/>
                </div> 
                <div className="updateUserContainer">
                    
                    <div className="updateContainer">

        
                        <h3 className="titleUpdate">Update your info</h3>
                        
                        <input className="input" type="text" name="firstname" placeholder={props.credentials?.user.firstname} onBlur={()=>checkError("firstname")} onChange={updateInfoUser}/>
                        <div className="errorsText">{errors.eName}</div>

                        
                        <input className="input" type="text" name="lastname" placeholder={props.credentials?.user.lastname} onBlur={()=>checkError("lastname")} onChange={updateInfoUser}/>
                        <div className="errorsText">{errors.eLastname}</div>

                        <input className="input" type="email" name="email" placeholder={props.credentials?.user.email} onChange={updateInfoUser} onBlur={()=>checkError("email")} />
                        <div className="errorsText">{errors.eEmail}</div>

                        <input className="input" type="text" name="phone" placeholder={props.credentials?.user.phone} onChange={updateInfoUser} onBlur={()=>checkError("phone")} />
                        <div className="errorsText">{errors.ePhone}</div>
                        
                        
                        <input className="input" type="text" name="city" placeholder={props.credentials?.user.adress} onChange={updateInfoUser} onBlur={()=>checkError("city")}/>
                        <div className="errorsText">{errors.eCity}</div>


                        <div className="errorsText">{errors.eValidate1}</div>
                        
                        <div className="button" onClick={() => updateUser()}>UPDATE</div>
                        
                    </div>
                    
                    <div className="updatePassword">
        
                        <h3 className="titleUpdate">Update your password</h3>
        
                        <input placeholder="Old Password" className="input" type="password" name="oldPassword" onChange={updatePasswordClient}/> 
                        <div className="errorsText"></div>

                        <input placeholder="New Password"  className="input" type="password" name="newPassword" onChange={updatePasswordClient} onBlur={()=>checkError("password")}reqired/> 
                        <div className="errorsText">{errors.ePassword}</div>
                        
                        <input placeholder="Confirm New Password" className="input" type="password" name="newPassword2" onChange={updatePasswordClient} onBlur={()=>checkError("password2")}/> 
                        <div className="errorsText">{errors.ePassword2}</div>

                        <div className="errorsText">{errors.eValidate2}</div>
        
                        <div className="button" onClick={() => updatePassword()}>UPDATE</div>
                        
                    </div>    
                </div>
            </div>
        )

    } else{

        return(
            <div>
                <Error />
            </div>
        )
    }
}

export default connect((state) => ({

    credentials:state.credentials
  
}))(UserUpdate);