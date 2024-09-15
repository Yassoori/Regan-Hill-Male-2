import React, { useEffect } from "react";
import { HashRouter } from "react-router-dom";
import "./css/App.css";
import useCustomizer from "./hooks/useCustomizer.jsx";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Links from "./Links";

import 'aos/dist/aos.css';
import AOS from 'aos';

function App() {

  const {
    bgColor,
    headingFont,
    subFont,
    bodyFont,
    fontColor,
  } = useCustomizer();

  useEffect(() => {
    const applyStyles = async () => {

      const styles = document.getElementById("dynamicStyles");
      styles.innerHTML = `
      h1, h4 { font-family: ${headingFont}, serif; }
      h2, h3, .card-body p { font-family: ${subFont}, serif; }
      p, li, a, input, textarea, button { font-family: ${bodyFont}, sans-serif; }
      input, textarea { border: ${fontColor} 1px solid; }
      body, nav, .card-text { background: #${bgColor}; color: ${fontColor}}
      a, button, .inquire { color: ${fontColor}; }
      `
    };

    applyStyles();

  }, [bgColor, headingFont, subFont, bodyFont, fontColor]);

  // console.log(bgColor, headingFont, subFont, bodyFont, fontColor);

  useEffect(() => {
    AOS.init({
      duration: 1200,
    });
    // console.log("AOS initialized");
  }, []);

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