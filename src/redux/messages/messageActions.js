import messageActionTypes from "./messageActionTypes";

export const selectChat = (user) => {
  return {
    type: messageActionTypes.CHATSELECTED,
    payload: user,
  };
};

// export const logOut = () => {
//   return {
//     type: messageActionTypes.LOG_OUT,
//   };
// };
