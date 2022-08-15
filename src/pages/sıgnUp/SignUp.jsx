import React, { useState } from "react";
//import { useNavigate } from "react-router-dom";

import api from "../../api";

import Input from "../../components/Input/Input";
import Button from "../../components/Button/Submitbutton/Button";
import Pop from "../pop-up/Pop";
import Loading from "../pop-up/Loading";

import "./style.css";

function maybeValidEmail(email) {
  return /^\S+@\S+\.\S+$/.test(email);
}

function maybeValidPassword(password) {
  const splittedPassword = password.split(""); // split string i array e çeviriyor
  return splittedPassword.length > 5 ? true : false;
}

export default function SignUp() {
  //const navigate = useNavigate();

  const [values, setvalues] = useState({
    email: "",
    name: "",
    password: "",
  });

  const [isPop, setisPop] = useState(false);
  const [loading, setloading] = useState(false);

  const [errors, setErrors] = useState({
    emailError: "",
    nameError: "",
    passwordError: "",
  });

  const onchange = (event) => {
    const { id, value } = event.target;
    setvalues({
      ...values,
      [id]: value,
    });
    setErrors({
      ...errors,
      [`${id}Error`]: "",
    });
  };

  const keyDown = (event) => {
    if (event.keyCode === 13) {
      onClick();
    }
  };
  const onClick = () => {
    setloading(true);
    // Email geçerli mi
    const isEmailValid = maybeValidEmail(values.email);
    // Şifre min. 8 karakter olmalı
    const isPasswordValid = maybeValidPassword(values.password);

    if (
      !values.name ||
      !values.password ||
      !values.email ||
      !isEmailValid ||
      !isPasswordValid
    ) {
      if (!values.name || !values.password || !values.email) {
        return setErrors({
          emailError: !values.email && "Email alanı boş bırakılamaz",
          nameError: !values.name && "Name alanı boş bırakılamaz",
          passwordError: !values.password && "Password alanı boş bırakılamaz",
        });
      }
      return setErrors({
        ...errors,
        emailError: !isEmailValid && "Lütfen geçerli bir mail adresi giriniz",
        passwordError:
          !isPasswordValid && "Şifreniz en az 6 karakter olmalıdır",
      });
    }
    api()
      .post("/auth/register", values)
      .then(() => {
        //console.log(baseURL);
        setloading(false);
        setisPop(true);
        setTimeout(() => {
          window.location.replace("/");
        }, 1000);
      })
      .catch((e) => alert("kayıt işlemi başarısız"));
  };

  const goToLogin = () => {
    window.location.replace("/");
  };

  return (
    <>
      {loading && <Loading />}
      {isPop && <Pop>KAYIT BAŞARILI GİRİŞ</Pop>}

      <div className="login">
        <Input
          place={"name"}
          value={values.name}
          change={onchange}
          id="name"
          keyDown={keyDown}
          error={errors.nameError}
        />
        <Input
          place={"E-mail"}
          value={values.email}
          change={onchange}
          id="email"
          keyDown={keyDown}
          error={errors.emailError}
        />
        <Input
          place={"Password"}
          value={values.password}
          change={onchange}
          id="password"
          error={errors.passwordError}
        />
        <Button send={onClick}>SIGN UP</Button>
        <Button send={goToLogin}>LOGIN</Button>
      </div>
    </>
  );
}
