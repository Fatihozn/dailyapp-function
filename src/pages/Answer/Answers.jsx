import React, { useState } from "react";

import Input from "../../components/Input/Input";
import Submit from "../../components/Button/Submitbutton/Button";

import "./style.css";

import data from "../../data.json";

export default function Answers() {
  const [sorular, setSorular] = useState(data.sorular);
  const [error, setError] = useState([]);

  const submitClick = () => {
    const errors = [...error];

    sorular.forEach((item) => {
      if (!item.cevap) {
        errors.push(item.id);
      }
    });
    if (errors.length === 0) {
      sorular.forEach((question) => {
        console.log(question.cevap);
      });
    }
    setError(errors);
  };

  const onChange = (event) => {
    const { id, value } = event.target;
    const errors = [...error];

    const questions = sorular.map((soru) => {
      if (Number(id) === soru.id) {
        const filteredError = errors.filter((item) => item !== soru.id);
        setError(filteredError);
        soru.cevap = value;
      }
      return soru;
    });
    setSorular(questions);
  };

  const keyDown = (event) => {
    if (event.keyCode === 13) {
      submitClick();
    }
  };
  const gotohomepage = () => {
    window.location.replace("/login");
  };

  return (
    <div id="answerdiv">
      <ul>
        {sorular.map((question) => (
          <div key={question.id} className="answer">
            <label className="dark"> {question.soru}</label>
            <br />
            <Input
              value={question.cevap}
              id={question.id}
              change={onChange}
              onKeyDown={keyDown}
              error={error.includes(question.id) && "bu alan boş bırakılamaz"}
            />
          </div>
        ))}
        <Submit send={submitClick}>Submit</Submit>
        <Submit send={gotohomepage}>Home Page</Submit>
      </ul>
    </div>
  );
}
