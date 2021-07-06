import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { LOGIN } from '../../redux/types';
import Logo from '../../components/Logo/Logo';


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

        let res = await axios.post('https://afp-popstv-b.herokuapp.com//login', body);


        props.dispatch({type:LOGIN, payload:res.data});

        // redirección
        
        history.push('/');
        

        }catch{
            setMensajeError({...msgError, eValidate: 'Wrong email or password'});
        }

    }

    if(props.credentials?.user.id){

        return(

            <div className="errorContainer">
            <Logo />
            <div className="errorComponent">
                <div className="error1">Oops ...</div>
                <h1>It seems that you are already logged in.</h1>
                <h2>Try to go to <a href="/">HOME PAGE</a>.</h2>

            </div>
        </div>
        )
    } 

    else { 
        
        return(

            <div className="loginContainer ">
                <Logo />
                <div className="box1">
                    
                    <h1>POP'S TV</h1>
    
                   <input className="input" name="email" type="text" placeholder="Email" onChange={updateCredentials} onBlur={()=>checkError("email")} required/>
                   <div className="errorsText">{msgError.eEmail}</div>   
                   <input className="input" name="password" type="password" placeholder="Password" onChange={updateCredentials} onBlur={()=>checkError("password")}required/>
                   <div className="errorsText">{msgError.ePassword}</div>
                  
                   <div className="button loginB" onClick={()=>logeame()}>Login</div>
                   <div className="errorsText">{msgError.eValidate}</div>
                   
                   <div className="registerL">
                   <div>Don't have an account?</div>
                   <div className="registerLogin" onClick={() => history.push('/register')}>Sign up</div> 
                   </div>
    
                </div>
    
             
            </div>

        )

    }

}

export default connect((state) => ({
    credentials: state.credentials,
  }))(Login);