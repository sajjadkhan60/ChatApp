import React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { db } from "../firebaseconfig";
import { getDocs, collection, query, where } from "firebase/firestore";
import Sidebar from "./Sidebar";
import SelectedChatUser from "./SelectedChatUser";
import LoadingBar from "react-top-loading-bar";
import Loading from "./Loading";
import Messages from "../Messages";

function Chat({ user, selectedChat, selectedChatUser }) {
  const [state, setState] = useState(null);
  const [progress, setProgress] = useState(null);
  useEffect(() => {
    const getDocumentByUID = async () => {
      setProgress(20);
      const q = query(collection(db, "users"), where("uid", "==", user));
      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          setState(doc.data());
        });
        setTimeout(() => {
          setProgress(50);
        }, 500);
        setTimeout(() => {
          setProgress(100);
          console.log("Progress is:", progress);
        }, 1200);
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
                <div className="col-md-8">
                  {selectedChat ? (
                    <div className="row">
                      <div className="col-8">{<Messages />}</div>
                      <div className="col-4 pe-0 ">
                        {<SelectedChatUser user={selectedChatUser} />}
                      </div>
                    </div>
                  ) : progress == 100 ? (
                    <div className="row">
                      <div className="col-12">
                        <div className="no-chats-selected">
                          <div className="no-chat-icon">
                            <span class="material-symbols-outlined">chat</span>
                            <p>
                              Select a conversation from the chats <br />
                              or start a new conversation
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="row">
                      <div className="col-12" style={{ paddingRight: "170px" }}>
                        <div className="no-chats-selected">{<Loading />}</div>
                      </div>
                    </div>
                  )}
                </div>
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
    selectedChat: state.messages.selectedChat,
    selectedChatUser: state.messages.selectedChatUser,
  };
};

export default connect(mapStateToProps)(Chat);
