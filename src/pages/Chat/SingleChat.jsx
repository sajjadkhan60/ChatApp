import React from "react";
import { useDispatch } from "react-redux";
import { selectChat } from "../../redux/messages/messageActions";

function SingleChat({ chat }) {
  const dispatch = useDispatch();
  function handleChatClick() {
    dispatch(selectChat(chat));
    console.log(chat);
  }
  return (
    <>
      <div className="container pe-0 mt-2">
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
