import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Quiz from "../pages/Quiz";

const Router = () => {
  return (
    <BrowserRouter>
      {/* 헤더자리 */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
      {/* 푸터..? */}
    </BrowserRouter>
  );
};

export default Router;
