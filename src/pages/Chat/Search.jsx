import React, { useState } from "react";
import { connect } from "react-redux";
import { db } from "../firebaseconfig";
import { getDocs, collection, query, where } from "firebase/firestore";
import Input from "../../components/input/Input";

function Search({
  onSearch,
  setSearchQuery,
  searchQuery,
  setIsSearching,
  user,
  chats,
}) {
  const handleSearch = (event) => {
    const searchQuery = event.target.value;

    if (searchQuery.trim() === "") {
      setIsSearching(false);
      setSearchQuery("");
    } else {
      setIsSearching(true);
      setSearchQuery(searchQuery);
      const lowercaseSearchQuery = searchQuery.toLowerCase().trim();
      const searchResults = chats.filter((user) =>
        user.name.toLowerCase().includes(lowercaseSearchQuery)
      );
      onSearch(searchResults);
    }
  };

  return (
    <div>
      <div>
        <Input
          type="text"
          placeholder="Search Your Conversations"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

export default connect(mapStateToProps)(Search);
