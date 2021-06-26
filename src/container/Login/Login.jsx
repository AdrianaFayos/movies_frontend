import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { LOGIN } from '../../redux/types';


const Login = (props) => {

    let history = useHistory();

    // Hooks
    const [credentials,setCredentials] = useState({email:'',password:''});
    const [msgError, setMensajeError] = useState({eEmail:'',ePassword: '',eValidate:''});

    // Handlers
    const updateCredentials = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    useEffect(()=>{

    },[]);


    useEffect(()=>{

    });

    const checkError = async (arg) => {

        switch (arg){

            case 'email':

                if (credentials.email.length < 1){
                    setMensajeError({...msgError, eEmail: "Please enter your email"});
                }else {
                    setMensajeError({...msgError, eEmail: ""});
                }

            break;

            case 'password':

                if (credentials.password.length < 1){
                    setMensajeError({...msgError, ePassword: "Please enter your password"});
                }else {
                    setMensajeError({...msgError, ePassword: ""});
                }
            break;

            default:
                break;
        }
    }


    const logeame = async () => {
        
        try{

        let body = {
            email : credentials.email,
            password : credentials.password
        }
        // Envío por axios

        let res = await axios.post('http://localhost:3006/login', body);


        props.dispatch({type:LOGIN, payload:res.data});

        // redirección
        setTimeout(()=>{
            history.push('/');
        },750);

        }catch{
            setMensajeError({...msgError, eValidate: 'Wrong email or password'});
        }

    }


    return(

        <div className="loginContainer vista">
            <div className="box1">
                
                    <span className="text-nomb1">Email</span>
                    <input className="input1" name="email" type="text"  onChange={updateCredentials} onBlur={()=>checkError("email")} required/>
                    <div className="errorsText">{msgError.eEmail}</div>   
                    <span className="text-nomb3">Password</span>
                    <input className="input3" name="password" type="password" onChange={updateCredentials} onBlur={()=>checkError("password")}required/>
                    <div className="errorsText">{msgError.ePassword}</div>
              
               <div className="sendButton" onClick={()=>logeame()}>Login</div>
               <div>{msgError.eValidate}</div>
               <br />

               <div onClick={() => history.push('/register')}>REGISTER</div> 
            </div>

         
        </div>
    )

}

export default connect()(Login);