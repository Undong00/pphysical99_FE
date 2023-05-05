import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import Navi from "../components/Navi";
import Home from "../pages/Home"
import Register from "../pages/Register"
import Join from "../pages/Join"
import Test from "../pages/Test"

const Router = () => {
    return (
        <BrowserRouter>
            <Header></Header>
            <Navi></Navi>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/join" element={<Join/>}/>
                    <Route path="/test" element={<Test/>}/>
                </Routes>
        </BrowserRouter>
    );
};

export default Router;
