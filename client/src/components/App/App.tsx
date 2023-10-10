import React from "react";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";
import "./App.scss";
import "react-toastify/dist/ReactToastify.css";
import NotFoundPage from "../../pages/NotFoundPage";

const App: React.FC = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                {/*<Route path="/login" element={<LoginPage />} />*/}
                {/*<Route path="/registration" element={<Registration />} />*/}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            {/*<Form title="ToDo App" />*/}
            {/*<List />*/}
            <ToastContainer />
        </>
    );
};

export default App;
