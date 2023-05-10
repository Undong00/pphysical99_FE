import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../components/common/Header";
import Navi from "../components/common/Navi";
import Home from "../pages/Home";
import Join from "../pages/Join";
import Quiz from "../pages/Quiz";
import Register from "../pages/Register";
import List from "../pages/List";
import Test from "../pages/Test";
import Go from "../pages/Go";

const Router = () => {
  return (
    <BrowserRouter>
      <Header></Header>
      <Navi></Navi>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Go />} />
        <Route path="/join" element={<Join />} />
        <Route path="/quiz/:id" element={<Quiz />} />
        <Route path="/register" element={<Register />} />
        <Route path="/list" element={<List />} />
        <Route path="/test" element={<Test />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
