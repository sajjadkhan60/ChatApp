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

export const openModal = (picUrl) => {
  return {
    type: messageActionTypes.OPENMODAL,
    payload: picUrl,
  };
};

export const closeModal = () => {
  return {
    type: messageActionTypes.CLOSEMODAL,
  };
};
export const setChatSource = (source) => {
  return {
    type: messageActionTypes.SETCHATSOURCE,
    payload: source,
  };
};

export const setUserChats = (chats) => {
  return {
    type: messageActionTypes.SETCHATS,
    payload: chats,
  };
};

export const addUserToChats = (user) => {
  return {
    type: messageActionTypes.ADDUSERTOCHATS,
    payload: user,
  };
};
