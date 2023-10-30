import React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { db } from "../firebaseconfig";
import { getDocs, collection, query, where } from "firebase/firestore";
import Sidebar from "./Sidebar";
import LoadingBar from "react-top-loading-bar";

function Chat({ user }) {
  const [state, setState] = useState(null);
  const [progress, setProgress] = useState(null);
  useEffect(() => {
    setProgress(60);
    const getDocumentByUID = async () => {
      const q = query(collection(db, "users"), where("uid", "==", user));

      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          setState(doc.data());
        });
        setProgress(100);
      } catch (error) {
        console.error("Error getting document:", error);
      }
    };
    getDocumentByUID();
    document.title = "Chat";
  }, []);
  return (
    <>
      <LoadingBar color="black" progress={progress} />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="main">
              <div className="row">
                <div className="col-md-4">{<Sidebar />}</div>
                <div className="col-md-8"></div>
              </div>
            </div>
          </div>
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

export default connect(mapStateToProps)(Chat);
