import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeChat } from "../../redux/messages/messageActions";
import Loading from "./Loading";

function SelectedChatUser({ user }) {
  const [state, setState] = useState(null);
  const dispatch = useDispatch();
  function clear() {
    dispatch(closeChat());
  }
  useEffect(() => {
    setState(null);
    setTimeout(() => {
      setState(true);
    }, 1000);
  }, [user]);

  return (
    <div>
      <div className="user-profile">
        <div className="selectedChatUserDetails">
          <div className="close-icon" onClick={clear}>
            <span className="clear-icon">&#x2715;</span>
          </div>
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
        <div className="profile-below-details">
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
            <div className="title">Files</div>
            <br />

            {state ? (
              <div className="detail text-center">No files to show</div>
            ) : (
              <div
                className="detail text-center"
                style={{ marginLeft: "-50px", marginTop: "5px" }}
              >
                {<Loading />}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectedChatUser;
