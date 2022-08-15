import React from "react";

import "../Login/style.css";

export default function Pop(props) {
  return (
    <>
      <div className="loaderdiv">
        <div className="loader"></div>
        <h1> {props.children} SAYFASINA YÖNLENDİRİLİYORSUNUZ</h1>
      </div>
    </>
  );
}
