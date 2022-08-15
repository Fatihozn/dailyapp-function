import React from "react";
import { useContext } from "react";
import { mainContext } from "./Context";
import "./Input/style.css";

export default function Icon() {
  const { IconCount } = useContext(mainContext);

  return <div id="Icon">{IconCount}</div>;
}
