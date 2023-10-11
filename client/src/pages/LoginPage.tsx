import React, { useState } from "react";
import "./styles/Authentication.scss";
import { Link } from "react-router-dom";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setFormData({
            email: "",
            password: "",
        });
    };
    return (
        <div className="layout">
            <form action="" className="form" onSubmit={handleSubmit}>
                <div className="form__link_container">
                    <div className="form__login_container">
                        <Link to="/login" className="form__link_login">
                            Login
                        </Link>
                    </div>

                    <div className="form__signup_container">
                        <Link to="/registration" className="form__link_signup">
                            Sign Up
                        </Link>
                    </div>
                </div>

                <div className="form__group">
                    <input
                        type="email"
                        placeholder="Email"
                        className="form__input"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <label htmlFor="" className="form__label"></label>
                </div>

                <div className="form__group">
                    <input
                        type="password"
                        placeholder="Password"
                        className="form__input"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <label htmlFor="" className="form__label"></label>
                </div>

                <button type="submit" className="form__button">
                    Login
                </button>

                <p className="form__text">
                    Don’t have an Account?
                    <Link to="/registration" className="form__link">
                        Register Here
                    </Link>
                </p>

                <div className="form__line"></div>

                <p className="form__text">or use your email account</p>
            </form>
        </div>
    );
};
export default LoginPage;
