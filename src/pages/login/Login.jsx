import React, { useState } from "react";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import "./login.css";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const [state, setState] = useState({
    password: "",
    email: "",
    error: "",
    submitting: false,
    success: "",
  });

  const { password, email, error, submitting, success } = state;

  const setInputs = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email == "" || password == "") {
      setState({
        ...state,
        error: "Please make sure all the fields are filled",
        success: "",
      });
    } else {
      try {
        setState({
          ...state,
          error: "",
          submitting: true,
        });
        const auth = getAuth();
        const user = await signInWithEmailAndPassword(auth, email, password);
        setState({
          ...state,
          password: "",
          email: "",
          error: "",
          submitting: false,
          success: "Logged In Successfully. Redirecting you to chat...",
        });
      } catch (error) {
        if (error.code === "auth/invalid-login-credentials") {
          setState({
            ...state,
            error: "Invalid Login Credentials",
            success: "",
          });
        } else if (error.code === "auth/weak-password") {
          setState({
            ...state,
            error: "Password should be at least 6 characters.",
            success: "",
          });
        } else {
          setState({ ...state, error: error.message, success: "" });
        }
      }
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-5 mx-auto  ">
            <div className="form shadow">
              <form onSubmit={handleLogin} action="" method="POST">
                <div className="row">
                  <div className="col-12">
                    <div className="form-heading">Login</div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    {error.length > 0 ? (
                      <div className="alert alert-danger">{error}</div>
                    ) : (
                      <div></div>
                    )}
                    {success.length > 0 ? (
                      <div className="alert alert-success">{success}</div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <Input
                      label="Email"
                      type="email"
                      onChange={setInputs}
                      value={email}
                      name="email"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <Input
                      label="Password"
                      type="password"
                      onChange={setInputs}
                      value={password}
                      name="password"
                    />
                  </div>
                </div>
                <div className="row pe-0">
                  <div className="col-12 pe-0">
                    {submitting ? (
                      <Button
                        type="submit"
                        value="Logging in, Please wait ..."
                        disabled="disabled"
                        className="disabled"
                      />
                    ) : (
                      <Button type="submit" value="Login" />
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 text-end">
                    <p>
                      New to chat? <Link to="/register">Register</Link>
                    </p>
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

export default Login;
