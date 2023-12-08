import React from "react";
import Loading from "./Loading";
import SingleChat from "./SingleChat";

function SearchResults({ results, searchQuery }) {
  return (
    <div>
      <div className="">
        <div className="chats-heading" style={{ marginTop: "10px" }}>
          Results for <b style={{ fontWeight: "700" }}>'{searchQuery}' </b>
        </div>
        {results === null ? (
          <div className="col-12 text-center loader-div">
            <Loading />
          </div>
        ) : results.length > 0 ? (
          <div className="chats">
            {results.map((chat) => (
              <SingleChat chat={chat} key={chat.uid} />
            ))}
          </div>
        ) : (
          <div className="chats text-center mt-5" style={{ height: "20vh" }}>
            <p>Didn't find any results</p>
          </div>
        )}
      </div>
      {/* {results.map((result) => (
      ))} */}
    </div>
  );
}

export default SearchResults;
