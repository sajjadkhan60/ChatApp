import React from "react";
import { useState, useEffect } from "react";
import SingleChat from "./SingleChat";
import Loading from "./Loading";
import { connect } from "react-redux";
import { db } from "../firebaseconfig";
import { getDocs, collection, query, where } from "firebase/firestore";

function Chats({ user }) {
  const [chats, setChats] = useState(null);

  const getFriendDetails = async (frienduid) => {
    const users = [];
    for (let i = 0; i < frienduid.length; i++) {
      const q2 = query(
        collection(db, "users"),
        where("uid", "==", frienduid[i])
      );
      try {
        const querySnapshot = await getDocs(q2);
        querySnapshot.forEach((doc) => {
          users.push(doc.data());
        });
      } catch (error) {
        console.error("Error getting document:", error);
      }
    }
    // Append the users to the existing chats array
    setChats(users);
  };

  useEffect(() => {
    const getDocumentByUID = async () => {
      const q = query(collection(db, "chats"), where("uid", "==", user));

      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          getFriendDetails(doc.data().frienduid);
        });
      } catch (error) {
        console.error("Error getting document:", error);
      }
    };

    getDocumentByUID();
  }, []);

  return (
    <div>
      <div className="chats-heading">Chats</div>
      {chats === null ? (
        <div className="col-12 text-center loader-div">
          <Loading />
        </div>
      ) : (
        <div className="chats">
          {chats.map((chat) => (
            <SingleChat chat={chat} key={chat.uid} />
          ))}
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
