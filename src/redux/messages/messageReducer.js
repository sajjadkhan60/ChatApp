import messageActionTypes from "./messageActionTypes";

const initialState = {
  selectedChat: "",
  selectedChatUser: "",
  messages: [
    {
      id: "Test ID",
      content: "Test Message",
      sender: "Test Sender",
      receiver: "Test Receiver",
      timestamp: "Test Time",
    },
  ],
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
        selectedChat: "",
        selectedChatUser: "",
      };
    case messageActionTypes.ADDMESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    default:
      return state;
  }
};

export default messageReducer;
