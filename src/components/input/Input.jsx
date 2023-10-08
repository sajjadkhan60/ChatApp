import React from "react";
import "./input.css";

function Input(props) {
  return (
    <div>
      <label>{props.label}</label>
      <input {...props} className="login-input" />
    </div>
  );
}

export default Input;
