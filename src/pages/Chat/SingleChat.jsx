import React from "react";
import { closeNewChatModal } from "../../redux/user/userActions";
import { useDispatch, useSelector } from "react-redux";
import { selectChat, setChatSource } from "../../redux/messages/messageActions";

function SingleChat({ chat, chatSource }) {
  const dispatch = useDispatch();
  const selectedChatUser = useSelector(
    (state) => state.messages.selectedChatUser
  );

  function handleChatClick() {
    dispatch(selectChat(chat));
    dispatch(setChatSource(chatSource));
    dispatch(closeNewChatModal());
  }

  return (
    <>
      <div
        className={`container pe-0 mt-1 ${
          chat.uid === selectedChatUser.uid ? "active" : ""
        }`}
      >
        {/* <div className="container"> */}
        <div className="row pe-0">
          <div className="row pe-0">
            <div className="single-chat" onClick={handleChatClick}>
              <div
                className="user-img"
                style={{
                  backgroundImage: `url(${chat.avatar})`,
                }}
              ></div>
              <div className="user_details">
                <div className="user_name" style={{ marginBottom: "-1px" }}>
                  {chat.name}
                </div>
                <div className="last_message">{chat.username}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleChat;
