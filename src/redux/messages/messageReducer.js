import messageActionTypes from "./messageActionTypes";

const initialState = {
  selectedChat: null,
  selectedChatUser: null,
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case messageActionTypes.CHATSELECTED:
      return {
        ...state,
        selectedChat: true,
        selectedChatUser: action.payload,
      };
    case messageActionTypes.CLOSECHAT:
      return {
        ...state,
        selectedChat: null,
        selectedChatUser: null,
      };
    default:
      return state;
  }
};

export default messageReducer;
