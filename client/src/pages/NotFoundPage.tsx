import React from "react";
import ErrorImage from "../../dist/Ilustration.jpg";
import "../pages/styles/NotFoundPage.scss";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div className="container">
            <div className="text-container">
                <h1 className="text-container__title">Oops...</h1>
                <h3 className="text-container__title3">Page not found </h3>
                <p className="text-container__text">
                    This Page doesn`t exist or was removed! We suggest you back to home.
                </p>
                <button className="text-container__button">
                    <Link to="/" className="text-container__link">
                        Back to home
                    </Link>
                </button>
            </div>
            <div className="image-container">
                <img src={ErrorImage} alt="Illustration" />
            </div>
        </div>
    );
};
export default NotFoundPage;
