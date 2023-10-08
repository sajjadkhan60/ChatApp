import React, { useState } from "react";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import "./register.css";
import { Link } from "react-router-dom";
import { auth } from "../firebaseconfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseconfig";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

function Register() {
  const [avatar, setAvatar] = useState("");
  const [state, setState] = useState({
    name: "",
    password: "",
    email: "",
    cpassword: "",
    number: "",
    username: "",
    error: "",
    submitting: false,
    success: "",
  });
  const usersCollectionRef = collection(db, "users");
  const storage = getStorage();

  const {
    name,
    password,
    email,
    cpassword,
    number,
    username,
    error,
    success,
    submitting,
  } = state;

  const setInputs = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setAvatar(selectedFile);
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    if (
      name == "" ||
      email == "" ||
      password == "" ||
      number == "" ||
      username == "" ||
      avatar == ""
    ) {
      setState({
        ...state,
        error: "Please make sure all the fields are filled",
      });
    } else if (password != cpassword) {
      setState({
        ...state,
        error: "Both passwords should be same",
      });
    } else {
      try {
        setState({
          ...state,
          error: "",
          submitting: true,
        });
        const user = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        var uid = user.user.uid;

        // Upload the avatar to Firebase Storage
        const avatarRef = ref(storage, `avatars/${avatar.name}`);
        const avatarSnapshot = await uploadBytes(avatarRef, avatar);

        // Get the download URL for the uploaded avatar
        const avatarURL = await getDownloadURL(avatarSnapshot.ref);

        console.log(avatarURL);

        await addDoc(usersCollectionRef, {
          uid,
          name,
          email,
          number,
          username,
          avatar: avatarURL,
        });
        setState({
          ...state,
          name: "",
          password: "",
          email: "",
          cpassword: "",
          number: "",
          avatar: "",
          username: "",
          error: "",
          submitting: false,
          success:
            "You have been successfully registered. You can login to your account now.",
        });
        setAvatar("");
      } catch (error) {
        if (error.code === "auth/email-already-in-use") {
          setState({
            ...state,
            error: "This email is already in use. Please try a new email.",
          });
        } else if (error.code === "auth/weak-password") {
          setState({
            ...state,
            error: "Password should be at least 6 characters.",
          });
        } else {
          setState({ ...state, error: error.message });
        }
      }
    }
  };

  return (
    <>
      <div className="container">
        <div className="row mb-5 pb-5">
          <div className="col-md-8 mx-auto  ">
            <div className="form shadow">
              <div className="row">
                <div className="col-12">
                  <div className="form-heading">Register</div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  {error.length > 0 ? (
                    <div className="alert alert-danger">{error}</div>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  {success.length > 0 ? (
                    <div className="alert alert-success">{success}</div>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
              <form
                onSubmit={handleRegistration}
                action=""
                method="POST"
                enctype="multipart/form-data"
              >
                <div className="row">
                  <div className="col-md-6">
                    <Input
                      label="Name"
                      type="text"
                      onChange={setInputs}
                      value={name}
                      name="name"
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      label="Username"
                      type="text"
                      onChange={setInputs}
                      value={username}
                      name="username"
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      label="Email"
                      type="text"
                      onChange={setInputs}
                      value={email}
                      name="email"
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      label="Number"
                      type="number"
                      onChange={setInputs}
                      value={number}
                      name="number"
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      label="Password"
                      type="password"
                      onChange={setInputs}
                      value={password}
                      name="password"
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      label="Confirm Password"
                      type="password"
                      onChange={setInputs}
                      value={cpassword}
                      name="cpassword"
                    />
                  </div>
                  <div className="col-md-12">
                    <Input
                      label="Select an Avatar"
                      type="file"
                      onChange={handleFileChange}
                      name="avatar"
                    />
                  </div>
                  <div className="row pe-0">
                    <div className="col-12 pe-0">
                      {submitting ? (
                        <Button
                          type="submit"
                          value="Registering, Please wait ..."
                          disabled="disabled"
                          className="disabled"
                        />
                      ) : (
                        <Button type="submit" value="Register" />
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12  text-end">
                      <p>
                        Already a member? <Link to="/login">Login</Link>
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
