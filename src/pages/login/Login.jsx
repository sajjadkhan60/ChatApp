import React, { useState, useEffect } from "react";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import "./login.css";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { logIn } from "../../redux/user/userActions";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

function Login({ Login }) {
  const [state, setState] = useState({
    password: "",
    email: "",
    error: "",
    submitting: false,
    success: "",
  });

  const { password, email, error, submitting, success } = state;

  const navigate = useNavigate();

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
        Login(user.user.uid);
        setTimeout(() => {
          navigate("/");
        }, 2000);
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
        } else if (error.code === "auth/too-many-requests") {
          setState({
            ...state,
            error:
              "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.  ",
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
                      <div className="alert alert-danger ">{error}</div>
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

const mapDispatchToProps = (dispatch) => {
  return {
    Login: (data) => {
      dispatch(logIn(data));
    },
  };
};

export default connect(null, mapDispatchToProps)(Login);
