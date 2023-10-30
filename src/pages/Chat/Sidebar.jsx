import React from "react";
import Profile from "./Profile";
import Search from "./Search";
import Chats from "./Chats";

function Sidebar() {
  return (
    <>
      <div className="container sidebar">
        <div className="profile">{<Profile />}</div>
        <div className="search">{<Search />}</div>
        <div className="chats-section">{<Chats />}</div>
      </div>
    </>
  );
}

export default Sidebar;
