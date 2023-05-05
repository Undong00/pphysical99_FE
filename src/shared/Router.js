import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home"

const Router = () => {
    return (
        <BrowserRouter>
            {/* 헤더자리 */}
                <Routes>
                    <Route path="/" element={<Home/>} />
                </Routes>
            {/* 푸터..? */}
        </BrowserRouter>
    );
};

export default Router;
