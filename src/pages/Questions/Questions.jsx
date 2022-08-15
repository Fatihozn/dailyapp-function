/* eslint-disable no-debugger */
import React, { useState, useContext } from "react";
//import { useNavigate } from "react-router-dom";

import Add from "../../components/Button/Addbutton/Button";
import Del from "../../components/Button/Deletebutton/Button";
import Submit from "../../components/Button/Submitbutton/Button";
import Input from "../../components/Input/Input";
import Icon from "../../components/Icon";

import { mainContext } from "../../components/Context";

import "./style.css";

import data from "../../data.json";

export default function Questions() {
  // const navigate = useNavigate();
  const { count, setCount, IconCount, setIconCount } = useContext(mainContext);

  const [sorular, setSorular] = useState(data.sorular);
  const [error, setError] = useState("");

  const onChange = (event) => {
    const { id, value } = event.target;
    const errors = [...error];

    const questions = sorular.map((question) => {
      if (question.id === Number(id)) {
        question.soru = value;
        let filtered = errors.filter((item) => item !== Number(id));
        setError(filtered);
      }
      return question;
    });
    setSorular(questions);
  };

  const addOnClick = () => {
    const questions = [...sorular];

    setCount(count + 1);
    setIconCount(IconCount + 1);

    questions.push({
      id: Date.now(),
      soru: "",
      cevap: "",
    });

    setSorular(questions);
  };

  const submitClick = () => {
    const questions = [...sorular];
    const errors = [...error];

    questions.forEach((question) => {
      if (!question.soru) {
        errors.push(question.id);
      }
    });
    if (errors.length === 0) {
      sorular.forEach((item) => {
        console.log(item.soru);
      });
    }
    setError(errors);
    localStorage.setItem("count", count);
  };

  const del = (event) => {
    const { id } = event.target;
    const dizi = sorular.filter((item) => Number(id) !== item.id);
    setSorular(dizi);
    setIconCount(IconCount - 1);
  };

  const keyDown = (event) => {
    if (event.keyCode === 13) {
      submitClick();
    }
  };

  const logOut = () => {
    localStorage.clear();
    window.location.replace("/");
  };

  return (
    <div id="question">
      <div>
        <Submit send={logOut}>LOG OUT</Submit>
        <Icon />
      </div>
      <div className="addbutton">
        <Add send={addOnClick} />
      </div>

      <ul>
        {sorular.map((item) => (
          <li id="ques" key={item.id}>
            <Input
              value={item.soru}
              id={item.id}
              change={onChange}
              onKeyDown={keyDown}
              error={error.includes(item.id) && "Bu alanı boş bırakmayınız"}
            />
            <Del send={del} id={item.id} />
          </li>
        ))}
        <div id="buttondiv">
          <Submit send={submitClick}>Submit</Submit>
        </div>
      </ul>
    </div>
  );
}
