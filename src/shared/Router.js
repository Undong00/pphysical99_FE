import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../components/common/Header";
import Navi from "../components/common/Navi";
import Home from "../pages/Home";
import Join from "../pages/Join";
import Quiz from "../pages/Quiz";
import Register from "../pages/Register";
import Test from "../pages/Test";
import List from "../pages/List";

const Router = () => {
  return (
    <BrowserRouter>
      <Header></Header>
      <Navi></Navi>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/join" element={<Join />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/register" element={<Register />} />
        <Route path="/List" element={<List />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
