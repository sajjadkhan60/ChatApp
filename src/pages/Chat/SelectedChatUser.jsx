import React from "react";
import { useState, useEffect } from "react";
import Loading from "./Loading";

function SelectedChatUser({ user }) {
  const [state, setState] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setState(true);
    }, 1000);
  }, []);

  return (
    <div>
      <div>
        <div className="selectedChatUserDetails">
          <div
            className="user-img"
            style={{ backgroundImage: `url(${user.avatar})` }}
          ></div>
          <div className="user_details">
            <div className="user_name">{user.name}</div>
            <div className="username">@{user.username}</div>
          </div>
        </div>
        <div className="divider"></div>
        <div className="otherDetails">
          <div className="title">Phone</div>
          <div className="detail">{user.number}</div>
        </div>
        <div className="otherDetails">
          <div className="title">Description</div>
          <div className="detail">No Description</div>
        </div>
        <div className="otherDetails pb-0">
          <div className="title">Email</div>
          <div className="detail">{user.email}</div>
        </div>
        <div className="divider"></div>
        <div className="otherDetails pb-0 ">
          <div className="title">Shared Files</div>
          <br />
          {state ? (
            <div className="detail text-center">No files to show</div>
          ) : (
            <div className="detail text-center" style={{ marginLeft: "-50px" }}>
              {<Loading />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SelectedChatUser;
