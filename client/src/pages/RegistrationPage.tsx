import React, { useState } from "react";
import "./styles/Authentication.scss";
import { Link } from "react-router-dom";

const RegistrationPage = () => {
    const [formData, setFormData] = useState({
        name: "",
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
            name: "",
            email: "",
            password: "",
        });
    };
    return (
        <div className="layout">
            <form action="" onSubmit={handleSubmit} className="form">
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
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form__input"
                    />
                    <label htmlFor="" className="form__label"></label>
                </div>

                <div className="form__group">
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form__input"
                    />
                    <label htmlFor="" className="form__label"></label>
                </div>

                <div className="form__group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="form__input"
                    />
                    <label htmlFor="" className="form__label"></label>
                </div>

                <button className="form__button">Login</button>

                <p className="form__text">
                    Already have an Account?
                    <Link to="/login" className="form__link">
                        Login Here
                    </Link>
                </p>

                <div className="form__line"></div>

                <p className="form__text">or use your email account</p>
            </form>
        </div>
    );
};
export default RegistrationPage;
