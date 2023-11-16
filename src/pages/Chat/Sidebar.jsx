import React from "react";
import { useState } from "react";
import Profile from "./Profile";
import Search from "./Search";
import Chats from "./Chats";
import SearchResults from "./SearchResults";

function Sidebar() {
  const [chats, setChats] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (results) => {
    setSearchResults(results);
  };

  return (
    <>
      <div className="container sidebar">
        <div className="profile">{<Profile />}</div>
        <div className="search">
          {
            <Search
              onSearch={handleSearch}
              setSearchQuery={setSearchQuery}
              searchQuery={searchQuery}
              setIsSearching={setIsSearching}
              chats={chats}
            />
          }
        </div>

        {isSearching ? (
          <SearchResults results={searchResults} searchQuery={searchQuery} />
        ) : (
          <div className="chats-section">
            {<Chats setChats={setChats} chats={chats} />}
          </div>
        )}
      </div>
    </>
  );
}

export default Sidebar;
