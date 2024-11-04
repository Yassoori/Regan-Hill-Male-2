import React, { useEffect } from "react";
import { HashRouter } from "react-router-dom";
import "./css/App.css";
import useCustomizer from "./hooks/useCustomizer.jsx";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Links from "./Links";

// import "aos/dist/aos.css";
// import AOS from "aos";

function App() {
  const { backgroundColor, headingFont, subFont, bodyFont, fontColor, fontColor2, accentColor } =
    useCustomizer();

  useEffect(() => {
    const applyStyles = async () => {
      const styles = document.getElementById("dynamicStyles");
      styles.innerHTML = `
      h1 { font-family: ${headingFont}, serif; }
      h2, h3, h4, .card-body p { font-family: ${subFont}, serif; }
      p, li, a, input, textarea, button { font-family: ${bodyFont}, sans-serif; }
      body, nav, .card-text, .client-logo { background-color: #${backgroundColor}; color: ${fontColor}}
      a, button, .inquire, .social-media-a { color: ${fontColor}; }
      input, textarea { border: ${accentColor} 1px solid; }
      .highlight { background-color: ${accentColor}; color: ${fontColor2} },
      .head { border-bottom: ${accentColor} 2px solid; }
      `;
      // removed button animation
      // styles.innerHTML = `
      // h1 { font-family: ${headingFont}, serif; }
      // h2, h3, h4, .card-body p { font-family: ${subFont}, serif; }
      // p, li, a, input, textarea, button { font-family: ${bodyFont}, sans-serif; }
      // body, nav, .card-text, .client-logo { background-color: #${backgroundColor}; color: ${fontColor}}
      // a, button, .inquire, .social-media-a { color: ${fontColor}; }
      // input, textarea { border: ${accentColor} 1px solid; }
      // .nav-links .nav-button.active, .filter a.selected, .nav-links .nav-button:hover, .filter a:hover, .regular-button, .landing-button-contact { background-color: ${accentColor}; color: ${fontColor2}; }
      // .highlight { background-color: ${accentColor}; color: ${fontColor2} },
      // .head { border-bottom: ${accentColor} 2px solid; }
      // `;
    };

    applyStyles();
  }, [backgroundColor, headingFont, subFont, bodyFont, fontColor, fontColor2, accentColor]);

  console.log(backgroundColor, headingFont, subFont, bodyFont, fontColor,  fontColor2, accentColor);

  // useEffect(() => {
  //   AOS.init({
  //     duration: 1200,
  //   });
  //   // console.log("AOS initialized");
  // }, []);

  return (
    <>
      <HashRouter>
        <Header />
        <Links />
        <Footer />
      </HashRouter>
    </>
  );
}

export default App;
