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
