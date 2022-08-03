/* eslint-disable react/prop-types */
import React from "react";
import "./style.css";
export default function Button(props) {
  return (
    <button
      className="delete fa-solid fa-trash-can"
      onClick={props.send}
      id={props.id}
    ></button>
  );
}
