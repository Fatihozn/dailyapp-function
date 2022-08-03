/* eslint-disable react/prop-types */
import React from "react";
import "./style.css";
import classnames from "classnames";

export default function Input(props) {
  return (
    <div id="input">
      <input
        type="text"
        placeholder={props.place}
        id={props.id}
        onChange={props.change}
        name={props.name}
        value={props.value}
        onKeyDown={props.onKeyDown}
        className={classnames("pass-input", { "danger-input": props.error })}
      />
      {props.error && <p className="danger-input"> {props.error} </p>}
    </div>
  );
}
