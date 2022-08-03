import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Answers from "./pages/Answer/Answers";
import Login from "./pages/Login/Login";
import Questions from "./pages/Questions/Questions";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/answers" element={<Answers />} />
        <Route path="/questions" element={<Questions />} />
      </Routes>
    </div>
  );
}

export default App;
