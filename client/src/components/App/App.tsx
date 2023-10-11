import React from "react";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";

import "./App.scss";
import "react-toastify/dist/ReactToastify.css";
import "modern-normalize";

import Home from "../../pages/Home";
import NotFoundPage from "../../pages/NotFoundPage";
import LoginPage from "../../pages/LoginPage";
import RegistrationPage from "../../pages/RegistrationPage";

const App: React.FC = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/registration" element={<RegistrationPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <ToastContainer />
        </>
    );
};

export default App;
