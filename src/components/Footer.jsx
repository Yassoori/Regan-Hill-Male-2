import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faFacebook, faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  
if (location.pathname === "/") {
  return null;
} else {
  return (
    <div id="footer">
      <div id="social-media-icons">
        <a href="https://www.instagram.com/regan.hillmale">
          <FontAwesomeIcon icon={faInstagram} size="lg"  className="social-media-a"/>
        </a>
        <a href="https://www.facebook.com/reganhillmaleart/">
          <FontAwesomeIcon icon={faFacebook} size="lg"  className="social-media-a"/>
        </a>
        <a href="mailto: contact@reganhillmale.com">
          <FontAwesomeIcon icon={faEnvelope} size="lg"  className="social-media-a"/>
        </a>
      </div>
      <p className="contact-info">Phone: +64 21 0285 3849</p>
      <p className="contact-info">© 2024 Regan Hill Male.</p>
      <p className="contact-info">All Rights Reserved.</p>
      <a className="contact-info" href="https://www.yassersaeed.com/">Site by Yasser Saeed.</a>
    </div>      

  )};
};

export default Footer;
