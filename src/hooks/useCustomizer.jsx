import { useState, useEffect } from "react";
import axios from "axios";

const useCustomizer = () => {
  const [backgroundColor, setBgColor] = useState("");
  const [headingFont, setHeadingFont] = useState("");
  const [subFont, setSubFont] = useState("");
  const [bodyFont, setBodyFont] = useState("");
  const [landingBgColor, setLandingBgColor] = useState("");
  const [navColor, setNavColor] = useState("");
  const [fontColor, setFontColor] = useState("");
  const [fontColor2, setFontColor2] = useState("");
  const [accentColor, setAccentColor] = useState("");

  const baseUrl = import.meta.env.VITE_WP_BASEURL;

  useEffect(() => {
    axios
      .get(`${baseUrl}/wp-json/custom/v1/customizer-settings`)
      .then((response) => {
        const { backgroundColor, landingBackgroundColor, headingFont, subFont, bodyFont, navbarColor, fontColor, fontColor2, accentColor } =
          response.data;
        setBgColor(backgroundColor);
        setLandingBgColor(landingBackgroundColor);
        setHeadingFont(headingFont);
        setSubFont(subFont);
        setBodyFont(bodyFont);
        setNavColor(navbarColor);
        setFontColor(fontColor);
        setFontColor2(fontColor2);
        setAccentColor(accentColor);
      })
      .catch((error) => {
        console.error("Error fetching customizer settings:", error);
      });
  }, [baseUrl]);

  return { backgroundColor, landingBgColor, headingFont, subFont, bodyFont, navColor, fontColor, fontColor2, accentColor };
};

export default useCustomizer;
