import React from "react";
import { useState, useEffect } from "react";
import SingleChat from "./SingleChat";
import Loading from "./Loading";
import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { setUserChats } from "../../redux/messages/messageActions";
import { db } from "../firebaseconfig";
import {
  getDocs,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

function Chats({ user, setChats, chats }) {
  const [error, setError] = useState(false);
  const [chatSource, setChatSource] = useState("chats");
  const dispatch = useDispatch();
  const userChats = useSelector((state) => state.messages.chats);
  const getFriendDetails = (frienduid) => {
    if (frienduid.length === 0) {
      // Handle the case when there are no frienduids to fetch
      return;
    }

    const q = query(collection(db, "users"), where("uid", "in", frienduid));

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const users = [];
        querySnapshot.forEach((doc) => {
          users.push(doc.data());
        });
        // Set the users to the existing chats array
        setChats(users);
        dispatch(setUserChats(users));
      },
      (error) => {
        console.error("Error getting documents:", error);
      }
    );

    // Remember to return the unsubscribe function so you can stop listening
    return unsubscribe;
  };

  useEffect(() => {
    const getDocumentByUID = async () => {
      const q = query(collection(db, "chats"), where("uid", "==", user));

      try {
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          console.log("No matching documents found.");
          // You can set an error state or handle it in your application as needed.
          setError(true); // Assuming setError is defined elsewhere
          setChats(false);
        } else {
          querySnapshot.forEach((doc) => {
            // Ensure the document data exists before calling getFriendDetails
            if (doc.exists()) {
              getFriendDetails(doc.data().frienduid);
            } else {
              console.log("Document data does not exist.");
              setError(true); // Set an error state or handle it as needed.
            }
          });
        }
      } catch (error) {
        console.error("Error getting documents:", error);
        // Handle the error appropriately, e.g., setting an error state or displaying an error message.
      }
    };

    getDocumentByUID();
  }, []);

  return (
    <div>
      <div className="chats-heading" style={{ marginTop: "10px" }}>
        Chats
      </div>
      {chats === null ? (
        <div className="col-12 text-center loader-div">
          <Loading />
        </div>
      ) : chats ? (
        <div className="chats">
          {userChats.map((chat) => (
            <SingleChat chat={chat} key={chat.uid} chatSource={chatSource} />
          ))}
        </div>
      ) : (
        <div className="chats text-center mt-5" style={{ height: "20vh" }}>
          <p>You don't have any chats</p>
          <p>Start a conversation with a user now</p>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

export default connect(mapStateToProps)(Chats);
