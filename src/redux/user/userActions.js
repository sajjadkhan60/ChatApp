import userActionTypes from "./userActionTypes";

export const logIn = (user) => {
  return {
    type: userActionTypes.LOG_IN,
    payload: user,
  };
};

export const logOut = () => {
  return {
    type: userActionTypes.LOG_OUT,
  };
};

export const openNewChatModal = () => {
  return {
    type: userActionTypes.OPENNEWCHATMODAL,
  };
};

export const closeNewChatModal = () => {
  return {
    type: userActionTypes.CLOSENEWCHATMODAL,
  };
};
