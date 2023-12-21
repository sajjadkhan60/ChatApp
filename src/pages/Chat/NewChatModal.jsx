import React, { useState, useEffect } from "react";
import { closeNewChatModal } from "../../redux/user/userActions";
import { useDispatch } from "react-redux";
import { db } from "../firebaseconfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import Input from "../../components/input/Input";
import Loading from "./Loading";
import SingleChat from "./SingleChat";

function NewChatModal() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [chatSource, setChatSource] = useState("search");
  const [searchResults, setSearchResults] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {}, [searchResults]);

  function closeModals(e) {
    if (
      e.target.classList.contains("modals") ||
      e.target.classList.contains("close-modals") ||
      e.target.classList.contains("clear-icon")
    ) {
      dispatch(closeNewChatModal());
    }
  }
  async function handleChange(e) {
    if (e.target.value !== "") {
      setSearchQuery(e.target.value);
      setSearching(true);
      setLoading(true); // Set loading to true when starting the query.

      const usersRef = collection(db, "users");
      const lowercasedQuery = e.target.value.toLowerCase();

      try {
        const querySnapshot = await getDocs(usersRef);
        const results = [];

        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          const lowercasedName = userData.name.toLowerCase();

          if (lowercasedName.includes(lowercasedQuery)) {
            results.push(userData);
            console.error("The Doc Data Is:", userData);
          }
        });

        console.log("Results", results);
        setSearchResults(results);
      } catch (error) {
        console.error("Error searching users:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setSearchQuery(e.target.value);
      setSearching(false);
      setLoading(false);
      setSearchResults([]);
    }
  }

  return (
    <div>
      <div className="modals" onClick={closeModals}>
        <div className="container">
          <div className="content">
            <div className="close-modals" onClick={closeModals}>
              <span className="clear-icon">&#x2715;</span>
            </div>
          </div>
          <div className="newChatModalWindow">
            <div className="search-field">
              <Input
                placeholder="Search People ..."
                style={{ marginBottom: "0px" }}
                value={searchQuery}
                onChange={handleChange}
              />
            </div>
            <div className="searchResults">
              {searching && (
                <div>
                  {loading ? (
                    <div className="searchLoading">{<Loading />}</div>
                  ) : (
                    <div>
                      <div
                        className="chats-heading"
                        style={{ marginTop: "10px" }}
                      >
                        Results for{" "}
                        <b style={{ fontWeight: "700" }}>{searchQuery}</b>
                      </div>
                      <div className="searchedUsers">
                        {searchResults.length > 0 ? (
                          searchResults.map((chat) => (
                            <SingleChat
                              chat={chat}
                              key={chat.uid}
                              chatSource={chatSource}
                            />
                          ))
                        ) : (
                          <div className="noResults">No Users Found</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewChatModal;
