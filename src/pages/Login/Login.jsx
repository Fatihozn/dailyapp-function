import React, { useState } from "react";

import Sumbit from "../../components/Button/Submitbutton/Button";
import Input from "../../components/Input/Input";
import "./style.css";

import data from "../../data.json";

export default function Login() {
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    usernameError: "",
    passwordError: "",
  });

  const onClick = () => {
    if (!userInfo.username || !userInfo.password) {
      return setErrors({
        usernameError: !userInfo.username && "username alanı boş geçilemez",
        passwordError: !userInfo.password && "password alanı boş geçilemez",
      });
    }
    const filteredUser = data.kullanici.filter((user) => {
      return (
        user.username === userInfo.username &&
        user.password === userInfo.password &&
        user.attribute === "user"
      );
    });

    const filteredAdmin = data.kullanici.filter((user) => {
      return (
        user.username === userInfo.username &&
        user.password === userInfo.password &&
        user.attribute === "admin"
      );
    });

    if (filteredUser.length > 0) {
      window.location.replace("/answers");
    } else if (filteredAdmin.length > 0) {
      window.location.replace("/questions");
    } else {
      alert("EKSİK YADA HATALI TUŞLADINIZ");
    }
  };

  const onChange = (event) => {
    const { id, value } = event.target;

    setUserInfo({
      ...userInfo,
      [`${id}`]: value,
    });

    setErrors({
      ...errors,
      [`${id}Error`]: "",
    });
  };

  // setErrors({
  //   ...errors,
  //   usernameError: "asdfgf",
  // });

  const keyDown = (event) => {
    if (event.keyCode === 13) {
      this.onClick();
    }
  };

  return (
    <div className="login">
      <Input
        place="username"
        id="username"
        change={onChange}
        onKeyDown={keyDown}
        error={errors.usernameError}
      />
      <Input
        place="PASSWORD"
        id="password"
        change={onChange}
        onKeyDown={keyDown}
        error={errors.passwordError}
      />
      <Sumbit send={onClick}>Submit</Sumbit>
    </div>
  );
}
