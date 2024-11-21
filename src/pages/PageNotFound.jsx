import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="full-container" id="error-page">
      <div className="main-content-container" id="page-not-found">
        <div className="landing-text">
          <h2>Oh no! You aren't supposed to be here.</h2>
        </div>
        <div className="landing-button-container">
          <Link to="/" className="landing-button landing-button-contact">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
