import userActionTypes from "./userActionTypes";

const initialState = {
  user: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userActionTypes.LOG_IN:
      return {
        ...state,
        user: action.payload,
      };
    case userActionTypes.LOG_OUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default userReducer;
