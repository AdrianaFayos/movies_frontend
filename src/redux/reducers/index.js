import { combineReducers } from "redux";
import credentials from './credentials-reducer'


const rootReducer = combineReducers ({

    credentials,

});

export default rootReducer;