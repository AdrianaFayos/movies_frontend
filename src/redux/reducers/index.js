import { combineReducers } from "redux";
import credentials from './credentials-reducer'
import client from "./client-reducer";
import movie from "./movie-reducer";

const rootReducer = combineReducers ({

    credentials,
    client,
    movie

});

export default rootReducer;