import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { mainContext } from "./components/Context";

import Answers from "./pages/Answer/Answers";
import Login from "./pages/Login/Login";
import Questions from "./pages/Questions/Questions";
import SignUp from "./pages/sıgnUp/SignUp";
import Error from "./pages/pop-up/Error";

function App() {
  const [count, setCount] = useState(3);
  const [IconCount, setIconCount] = useState(0);

  const data = {
    count,
    setCount,
    IconCount,
    setIconCount,
  };

  return (
    <mainContext.Provider value={data}>
      <div className="App">
        <Routes>
          {localStorage.getItem("token") ? (
            <>
              <Route path="/questions" element={<Questions />} />
              <Route path="/answers" element={<Answers />} />

              {localStorage.getItem("admin") === "fatih@ozn.com" ? (
                <Route path="/" element={<Navigate to="/questions" />} />
              ) : (
                <Route path="/" element={<Navigate to="/answers" />} />
              )}
            </>
          ) : (
            <>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </>
          )}
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </mainContext.Provider>
  );
}

export default App;
