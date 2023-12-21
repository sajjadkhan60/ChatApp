import userActionTypes from "./userActionTypes";

const initialState = {
  user: "L5OhIgi5N6hywJcfNVlqJyQyHup1",
  newChatModal: null,
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
    case userActionTypes.OPENNEWCHATMODAL:
      return {
        ...state,
        newChatModal: true,
      };
    case userActionTypes.CLOSENEWCHATMODAL:
      return {
        ...state,
        newChatModal: null,
      };
    default:
      return state;
  }
};

export default userReducer;
