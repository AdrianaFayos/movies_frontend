import React, {useState} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import moment from 'moment';

const Register = (props) => {

    let history = useHistory();

    // Hook
    const [datosUser,setDatosUser] = useState(
        {
        firstname:'',
        lastname:'',
        email:'',
        password:'',
        password2: '',
        phone:'',
        birthday: '',
        adress: ''
    });

    const [errors, setErrors] = useState({
        eName: '',
        eLastname: '',
        eEmail: '',
        ePhone: '',
        ePassword: '',
        ePassword2: '',
        eCity: '',
        eValidate:'',
        eBirthday:''
    });

    // Handler
    const updateFormulario = (e) => {
        setDatosUser({...datosUser, [e.target.name]: e.target.value})
    }

    const applyRegister = async () => {

        try {

            let body = {
                firstname: datosUser.firstname,
                lastname: datosUser.lastname,
                email : datosUser.email,
                password : datosUser.password,
                phone: datosUser.phone,
                birthday: datosUser.birthday,
                adress: datosUser.adress,
            }

            if(datosUser.password === datosUser.password2){
                await axios.post('https://afp-popstv-b.herokuapp.com/users/create', body);
                history.push('/login')
            } else {
                setErrors({...errors, eValidate: 'Register could not be completed., please try again.'});
            }

        } catch {
             setErrors({...errors, eValidate: 'Register could not be completed., please try again.'});
        }

    }

    const checkError = (arg) => {
        switch (arg){
            case 'firstname':
                if ((datosUser.firstname.length < 2)||(! /^[a-z ,.'-]+$/i.test(datosUser.firstname))||(datosUser.firstname.length > 20)){
                    setErrors({...errors, eName: 'Please enter a valid name'});
                }else{
                    setErrors({...errors, eName: ''});
                }
            break;

            case 'lastname':
                if ((datosUser.lastname.length < 2)||(! /^[a-z ,.'-]+$/i.test(datosUser.lastname))||(datosUser.lastname.length > 20)){
                    setErrors({...errors, eLastname: 'Please enter a valid lastname'});
                }else{
                    setErrors({...errors, eLastname: ''});
                }
            break;

            case 'email':
                if (! /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(datosUser.email)){
                    setErrors({...errors, eEmail: 'Introduce un email v??lido'});
                }else{
                    setErrors({...errors, eEmail: ''});
                }
                
            break;

            case 'password':
                if (! /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(datosUser.password)){
                // if (datosUser.password.length < 8){
                    // setErrors({...errors, ePassword: 'At least 8 characters, must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number. Can contain special characters'});
                    setErrors({...errors, ePassword: 'Password must have at least 8 characters'});
                }else{
                    setErrors({...errors, ePassword: ''});
                }
            break;

            case 'phone':
                if ((! /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/gm.test(datosUser.phone))||(datosUser.phone.length > 16)){
                // if (datosUser.password.length < 8){
                    setErrors({...errors, ePhone: 'Wrong phone number'});
                }else{
                    setErrors({...errors, ePhone: ''});
                }
            break;

            case 'password2':
                if (datosUser.password !== datosUser.password2){
                    setErrors({...errors, ePassword2: 'Password should be the same'});
                }else{
                    setErrors({...errors, ePassword2: ''});
                }
            break;

            case 'birthday':

                let years = moment().diff(moment(datosUser.birthday).format('MM/DD/YYYY'), 'years');
                
                if (years < 19 || years > 100){
                    setErrors({...errors, eBirthday: 'You must be at least 18 years old to register.'});
                }else {
                    setErrors({...errors, eBirthday: ''});
                }
            break    

            default:
                break;
        }
    }
    
    //  const errorStyle = (arg) =>{
        
    //     let errorDefault = "name";
    //     let errorWarning = "red";

    //     if (errors.eName!== ''){
    //         return errorWarning;
    //     }

    //     return errorDefault;
    //  }

    return (
        <div className="registerContainer">
            <Logo />
            <div className="registerBox"> 
            
            <h1>WELCOME TO POP'S TV</h1>

                <div className="registerBox1">

               
                    <div className="box">
                        <input className="input" placeholder="Firstname" name="firstname" type="text" onChange={updateFormulario} onBlur={()=>checkError("firstname")} />
                        <div className="errorsText">{errors.eName}</div>
                    </div>
    
                    <div className="box">
                        <input className="input" placeholder="Lastname" name="lastname" type="text" onChange={updateFormulario} onBlur={()=>checkError("lastname")} />
                        <div className="errorsText">{errors.eLastname}</div>
                    </div>
                </div>
                
                <div className="registerBox1">
                    <div className="box">
                        <input className="input" placeholder="Email" name="email" type="text" onChange={updateFormulario} onBlur={()=>checkError("email")} />     
                        <div className="errorsText">{errors.eEmail}</div>
                    </div>
    
                    <div className="box">
                        <input placeholder="Phone" className="input" name="phone" type="text" onChange={updateFormulario} onBlur={()=>checkError("phone")}/>   
                        <div className="errorsText">{errors.ePhone}</div>
                    </div>
                </div>

                <div className="registerBox1">
                    <div className="box">
                        <input placeholder="Password" className="input" name="password" type="password" onChange={updateFormulario} onBlur={()=>checkError("password")}/>
                        {/* <div className="errorsText">{errors.ePassword}</div> */}
                    </div>
    
                    <div className="box">
                        <input placeholder="Confirm Password" className="input" name="password2" type="password" onChange={updateFormulario} onBlur={()=>checkError("password2")}/>
                        <div className="errorsText">{errors.ePassword2}</div>
                    </div>
                </div>

                <div className="registerBox1">
                    <div className="box">
                        <label className="label">Birthday:</label>
                        <input className="input" name="birthday" type="date" onChange={updateFormulario} onBlur={()=>checkError("birthday")}/>   
                        <div className="errorsText">{errors.eBirthday}</div>
                    </div>
    
                    <div className="box">
                        <input placeholder="City" className="input" name="adress" type="text" onChange={updateFormulario} onBlur={()=>checkError("city")}/>
                    </div>  
                </div>
            

                <div className="button loginB" onClick={()=>applyRegister()}>Enviar</div>
                <div className="errorsText1">{errors.eValidate}</div>
            </div>
        </div>
    )
}

export default Register;