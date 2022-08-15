/* eslint-disable react/prop-types */
import React from "react";
import "./style.css";

export default function Button(props) {
  return (
    <button
      className="add fa-solid fa-circle-plus"
      onClick={props.send}
    ></button>
  );
}
