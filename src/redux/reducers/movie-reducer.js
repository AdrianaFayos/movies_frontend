import { MOVIE } from "../types";

const initialState = {
  
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case MOVIE:
      return action.payload;

    default:
      return state;
  }
};

export default movieReducer;