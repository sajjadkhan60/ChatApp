import messageActionTypes from "./messageActionTypes";

const initialState = {
  selectedChat: "",
  selectedChatUser: "",
  chatSource: "",
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
  chats: null,
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
    case messageActionTypes.SETCHATSOURCE:
      return {
        ...state,
        chatSource: action.payload,
      };
    case messageActionTypes.SETCHATS:
      return {
        ...state,
        chats: action.payload,
      };
    case messageActionTypes.ADDUSERTOCHATS:
      return {
        ...state,
        chats: [action.payload, ...state.chats],
      };
    default:
      return state;
  }
};

export default messageReducer;
