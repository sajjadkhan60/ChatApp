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
    console.log(frienduid);
    const q2 = query(collection(db, "users"), where("uid", "==", frienduid[0]));

    try {
      const querySnapshot = await getDocs(q2);
      querySnapshot.forEach((doc) => {
        setChats(doc.data());
      });
      console.log("State is : ", chats);
    } catch (error) {
      console.error("Error getting document:", error);
    }
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
      {chats ? (
        <div className="chats">{<SingleChat chats={chats} />} </div>
      ) : (
        <div className="col-12 text-center loader-div">
          <Loading />
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
