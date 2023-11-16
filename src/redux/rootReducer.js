import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
import messageReducer from "./messages/messageReducer";

const rootReducer = combineReducers({
  user: userReducer,
  messages: messageReducer,
});

export default rootReducer;
