import React from "react";
import "./button.css";

function Button(props) {
  return (
    <div>
      <button {...props} className="form-btn">
        {props.value}
      </button>
    </div>
  );
}

export default Button;
