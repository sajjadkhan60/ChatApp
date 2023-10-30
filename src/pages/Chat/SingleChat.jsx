import React from "react";

function SingleChat({ chats }) {
  return (
    <>
      <div className="container pe-0 mt-2">
        <div className="row pe-0">
          <div className="row pe-0">
            <div className="single-chat">
              <div
                className="user-img"
                style={{
                  backgroundImage: `url(${chats.avatar})`,
                }}
              ></div>
              <div className="user_details">
                <div className="user_name" style={{ marginBottom: "-3px" }}>
                  {chats.name}
                </div>
                <div className="last_message">{chats.username}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleChat;
