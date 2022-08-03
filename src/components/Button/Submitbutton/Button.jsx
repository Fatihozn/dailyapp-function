/* eslint-disable react/prop-types */
import React from "react";
import "./style.css";

function Button(props) {
  return (
    <div>
      <button className="btn" onClick={props.send}>
        {props.children}
      </button>
    </div>
  );
}
export default Button;
