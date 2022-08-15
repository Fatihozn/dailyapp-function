import React, { useContext, useState } from "react";

import api from "../../api";

import Sumbit from "../../components/Button/Submitbutton/Button";

import { mainContext } from "../../components/Context";

import Input from "../../components/Input/Input";
import Loading from "../pop-up/Loading";
import Pop from "../pop-up/Pop";

import "./style.css";

function maybeValidEmail(email) {
  return /^\S+@\S+\.\S+$/.test(email);
}

function maybeValidPassword(password) {
  const splittedPassword = password.split(""); // split string i array e çeviriyor
  return splittedPassword.length > 5 ? true : false;
}

export default function Login() {
  const count = useContext(mainContext);

  console.log({ count });
  const [userInfo, setUserInfo] = useState({
    email: "fatih@ozn.com",
    password: "2476161",
  });

  const [isPop, setisPop] = useState(false);
  const [loading, setloading] = useState(false);

  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
  });

  const onClick = () => {
    // Email geçerli mi
    setloading(true);
    const isEmailValid = maybeValidEmail(userInfo.email);
    // Şifre min. 8 karakter olmalı
    const isPasswordValid = maybeValidPassword(userInfo.password);
    if (
      !userInfo.email ||
      !userInfo.password ||
      !isEmailValid ||
      !isPasswordValid
    ) {
      if (!userInfo.email || !userInfo.password) {
        return setErrors({
          emailError: !userInfo.email && "email alanı boş geçilemez",
          passwordError: !userInfo.password && "password alanı boş geçilemez",
        });
      }
      return setErrors({
        emailError: !isEmailValid && "Lütfen geçerli bir mail adresi giriniz",
        passwordError: !isPasswordValid && "Şifre en az 6 karakter olmalıdır",
      });
    }

    api()
      .post("/auth/login", userInfo)
      .then((response) => {
        if (response.request.status === 200) {
          localStorage.setItem("token", response.data.accessToken);
          localStorage.setItem("admin", userInfo.email);
          setloading(false);
          setisPop(true);
          setTimeout(() => {
            window.location.replace("/");
          }, 1000);
        }
      })
      .catch((error) => alert("eksik yada hatalı tuşladınız"));
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
  //   emailError: "asdfgf",
  // });

  const keyDown = (event) => {
    if (event.keyCode === 13) {
      onClick();
    }
  };

  return (
    <>
      {loading && <Loading />}
      {isPop &&
        (localStorage.getItem("admin") === "fatih@ozn.com" ? (
          <Pop> GİRİŞ BAŞARILI QUESTİONS </Pop>
        ) : (
          <Pop>GİRİŞ BAŞARILI ANSWERS </Pop>
        ))}
      <div className="login">
        <Input
          place="email"
          id="email"
          value={userInfo.email}
          change={onChange}
          onKeyDown={keyDown}
          error={errors.emailError}
        />
        <Input
          place="PASSWORD"
          id="password"
          value={userInfo.password}
          change={onChange}
          onKeyDown={keyDown}
          error={errors.passwordError}
        />
        <Sumbit send={onClick}>Submit</Sumbit>
      </div>
    </>
  );
}
