import React, { useState, useEffect } from "react";
import Input from "../components/input/Input";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../redux/messages/messageActions";
import Loading from "./Chat/Loading";
import { db } from "./firebaseconfig";
import { MdOutlineAttachFile } from "react-icons/md";
import {
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

function Messages({ user }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState(null);
  const [filesURL, setFilesURL] = useState(null);
  const [error, setError] = useState("");
  const [messagesFinal, setMessagesFinal] = useState([]);
  const [Dbmessages, setDbMessages] = useState([]);
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user.user);
  const reduxMessages = useSelector((state) => state.messages.messages);
  const selectedChatUser = useSelector(
    (state) => state.messages.selectedChatUser
  );
  const combinedIds = `${loggedInUser}_${selectedChatUser.uid}`;
  let filteredMessages = [];
  useEffect(() => {
    setMessagesFinal([]);
    setLoading(true);
    setFiles(null);
    // Scroll the messages-area to the bottom when messages change

    if (reduxMessages.length > 0) {
      filteredMessages = reduxMessages.filter(
        (message) => message.id === combinedIds
      );
      if (filteredMessages.length > 0) {
        setTimeout(() => {
          const messagesArea = document.querySelector(".messages-area");
          if (messagesArea) {
            messagesArea.scrollTop = messagesArea.scrollHeight;
          }
        }, 10);
        setMessagesFinal(filteredMessages);
        setLoading(false);
      } else {
        const messageDocRef = doc(db, "messages", combinedIds);
        const unsubscribe = onSnapshot(messageDocRef, (doc) => {
          if (doc.exists()) {
            const data = doc.data();
            setDbMessages(data.messages || []);
            // Update the status of messages whose sender is senderId
            const updatedMessages = data.messages.map((msg) => {
              if (msg.sender === selectedChatUser.uid) {
                return { ...msg, status: true };
              }
              return msg;
            });
            setMessagesFinal(updatedMessages);
            setLoading(false);
            setTimeout(() => {
              const messagesArea = document.querySelector(".messages-area");
              if (messagesArea) {
                messagesArea.scrollTop = messagesArea.scrollHeight;
              }
            }, 10);
          } else {
            setTimeout(() => {
              const messagesArea = document.querySelector(".messages-area");
              if (messagesArea) {
                messagesArea.scrollTop = messagesArea.scrollHeight;
              }
            }, 10);
            setLoading(false);
          }

          return () => {
            // Unsubscribe from the snapshot listener when the component unmounts
            if (unsubscribe) {
              unsubscribe();
            }
          };
        });
      }
    }
  }, [reduxMessages, user.uid, selectedChatUser.uid]);

  // const getMessages = async (combinedIds) => {
  //   try {
  //     const snapshot = await db.collection("Messages").get();
  //     const messages = snapshot.docs.map((doc) => doc.data());
  //     console.log("Received messages:", messages);
  //   } catch (error) {
  //     console.error("Error retrieving messages:", error);
  //   }
  // };

  const types = ["image/png", "image/jpeg"];
  const storage = getStorage();
  const selectPicture = async (e) => {
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setFiles(selected);
      setError("");
      const storageRef = ref(storage, `images/${selected.name}`);
      const uploadTask = uploadBytes(storageRef, selected);
      const snapshot = await uploadTask;

      // Use snapshot.ref to get the reference to the uploaded file
      const imageUrl = await getDownloadURL(snapshot.ref);
      setFilesURL(imageUrl);
    } else {
      setFiles(null);
      setError("Please select an image file (png or jpg)");
    }
  };

  const cancelFile = () => {
    setFiles(null);
  };

  async function sendMessage(e) {
    console.log("File is", files);
    e.preventDefault();
    if (message == "" && files == null) {
    } else {
      if (files !== null) {
        const currentDate = new Date();
        const timestamp = currentDate.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });
        const newMessage = {
          id: combinedIds,
          content: message,
          sender: loggedInUser,
          receiver: selectedChatUser.uid,
          timestamp: timestamp,
          status: false,
          images: [filesURL],
        };
        // dispatch(addMessage(newMessage));
        setMessage("");
        setFiles(null);
        const newMessage2 = {
          sender: loggedInUser,
          receiver: selectedChatUser.uid,
          content: message,
          timestamp: timestamp,
          status: false,
          images: [filesURL],
        };
        // Get the document reference
        const messageDocRef = doc(db, "messages", combinedIds);

        // Check if the document exists
        const docSnap = await getDoc(messageDocRef);

        if (docSnap.exists()) {
          // Document exists, update the "messages" field
          await updateDoc(messageDocRef, {
            messages: arrayUnion(newMessage2),
          });
        } else {
          // Document doesn't exist, create it
          await setDoc(messageDocRef, {
            messages: [newMessage2],
          });
        }
      } else {
        const currentDate = new Date();
        const timestamp = currentDate.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });
        const newMessage = {
          id: combinedIds,
          content: message,
          sender: loggedInUser,
          receiver: selectedChatUser.uid,
          timestamp: timestamp,
          status: false,
        };
        // dispatch(addMessage(newMessage));
        setMessage("");
        setFiles(null);
        const newMessage2 = {
          sender: loggedInUser,
          receiver: selectedChatUser.uid,
          content: message,
          timestamp: timestamp,
          status: false,
        };
        // Get the document reference
        const messageDocRef = doc(db, "messages", combinedIds);

        // Check if the document exists
        const docSnap = await getDoc(messageDocRef);

        if (docSnap.exists()) {
          // Document exists, update the "messages" field
          await updateDoc(messageDocRef, {
            messages: arrayUnion(newMessage2),
          });
        } else {
          // Document doesn't exist, create it
          await setDoc(messageDocRef, {
            messages: [newMessage2],
          });
        }
      }
      // sendMessage(
      //   (sender = user.uid),
      //   (receiver = selectedChatUser.uid),
      //   (content = message),
      //   (timestamp = timestamp)
      // );
    }
  }

  return (
    <div>
      <div className="main-messages-section">
        <div className="heading">{user.name}</div>
        {files ? (
          <div className="selectFilesArea">
            <div
              className="cancelFile"
              style={{ position: "relative" }}
              onClick={cancelFile}
            >
              <span className="clear-icon">&#x2715;</span>
            </div>
            <div className="selectedPicture">
              <img src={URL.createObjectURL(files)} />
            </div>
          </div>
        ) : (
          <div className="messages-area">
            {loading ? (
              <div
                style={{
                  position: "absolute",
                  top: "45%",
                  left: "38%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <Loading />
              </div>
            ) : messagesFinal.length > 0 ? (
              messagesFinal.map((msg) => (
                <div
                  className={`single-message ${
                    msg.sender === loggedInUser ? "outgoing" : "incoming"
                  }`}
                >
                  {msg.images &&
                  Array.isArray(msg.images) &&
                  msg.images.length > 0 ? (
                    msg.images.length > 1 ? (
                      <div className="message-images">
                        {msg.images.map((image) => (
                          <img src={`${image}`} alt="Message Image" />
                        ))}
                      </div>
                    ) : (
                      msg.images.map((image) => (
                        <div className="message-image" key={image}>
                          <img src={`${image}`} alt="Message Image" />
                        </div>
                      ))
                    )
                  ) : (
                    <div></div>
                  )}
                  <div className="msg-content">{msg.content}</div>

                  <div className="msg-details">
                    <div className="time">{msg.timestamp}</div>
                    <div className="status">
                      {msg.status ? (
                        <span class="material-symbols-outlined read-check-icon">
                          done_all
                        </span>
                      ) : (
                        <span class="material-symbols-outlined unread-check-icon">
                          done_all
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-communication-message">
                No previous communications
              </div>
            )}
          </div>
        )}
        <div className="send-message-area">
          <div className="error">{error}</div>
          <form onSubmit={sendMessage} className="sendForm">
            <div className="inputTypeFile">
              <label htmlFor="fileInput">
                <MdOutlineAttachFile className="attach-file-icon" />
              </label>
              <input
                id="fileInput"
                type="file"
                style={{ display: "none" }}
                onChange={selectPicture}
              />
            </div>
            <div className="inputTypeText">
              {
                <Input
                  style={{
                    backgroundColor: "white",
                    marginBottom: "0px",
                    boxShadow: "0px 2px 3px -1px #a7a4a4",
                    width: "100%",
                    paddingLeft: "45px",
                    paddingRight: "55px",
                  }}
                  placeholder="Type Here"
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                />
              }
            </div>
            <div className="sendMessageBtn">
              <button onClick={sendMessage}>
                <i class="fa-regular fa-paper-plane"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Messages;
