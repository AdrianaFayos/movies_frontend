import React from 'react';
import './Home.scss';
import Header from '../../components/Header/Header';
import UserHome from '../../components/UserHome/UserHome';
import { connect } from "react-redux";

const Home = (props) => {


    if(props.credentials?.user.id){
        return(

            <UserHome />
        )
    } else {

        return(
    
            <div className="homeContainer">
                <Header />
                SOY HOMEEEEE
            </div>
        )
    
    }    

}

export default connect((state) => ({
    credentials: state.credentials,
  }))(Home);