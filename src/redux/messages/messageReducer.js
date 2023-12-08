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
  modal: null,
  modalPicSelected: null,
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

    case messageActionTypes.OPENMODAL:
      return {
        ...state,
        modal: true,
        modalPicSelected: action.payload,
      };

    case messageActionTypes.CLOSEMODAL:
      return {
        ...state,
        modal: null,
        modalPicSelected: null,
      };
    default:
      return state;
  }
};

export default messageReducer;
