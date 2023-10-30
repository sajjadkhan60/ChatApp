import React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { db } from "../firebaseconfig";
import { getDocs, collection, query, where } from "firebase/firestore";
import Loading from "./Loading";

function Profile({ user }) {
  const [state, setState] = useState(null);
  useEffect(() => {
    const getDocumentByUID = async () => {
      const q = query(collection(db, "users"), where("uid", "==", user));

      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setState(doc.data());
        });
      } catch (error) {
        console.error("Error getting document:", error);
      }
    };
    getDocumentByUID();
  }, []);
  return (
    <>
      <div className="container ">
        <div className="row p-0">
          {state ? (
            <div className="row p-0">
              <div className="profile">
                <div
                  className="user-img"
                  style={{ backgroundImage: `url(${state.avatar})` }}
                ></div>
                <div className="user_details">
                  <div className="user_name">{state.name}</div>
                  <div className="username">@{state.username}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="col-12 text-center loader-div">
              <Loading />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

export default connect(mapStateToProps)(Profile);
