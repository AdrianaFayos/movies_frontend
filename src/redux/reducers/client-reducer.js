import { CLIENT } from "../types";

const initialState = {
  
};

const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLIENT:
      return action.payload;

    // case DELETE_APPOINTMENT:
    //   return initialState;

    // case UPDATE_APPOINTMENT:
    //   return { ...state, user: action.payload };

    default:
      return state;
  }
};

export default clientReducer;