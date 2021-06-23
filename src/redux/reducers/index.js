import { combineReducers } from "redux";
import credentials from './credentials-reducer'
import client from "./client-reducer";

const rootReducer = combineReducers ({

    credentials,
    client

});

export default rootReducer;