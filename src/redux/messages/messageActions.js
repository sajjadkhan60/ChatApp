import messageActionTypes from "./messageActionTypes";

export const selectChat = (user) => {
  return {
    type: messageActionTypes.CHATSELECTED,
    payload: user,
  };
};

export const closeChat = () => {
  return {
    type: messageActionTypes.CLOSECHAT,
  };
};

export const addMessage = (message) => {
  return {
    type: messageActionTypes.ADDMESSAGE,
    payload: message,
  };
};
