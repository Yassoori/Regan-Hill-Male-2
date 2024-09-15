import { useState, useEffect } from "react";
// import MobileMenu from "./MobileMenu";
import { Link, useLocation } from "react-router-dom";
// import { List } from "react-bootstrap-icons";
import axios from "axios";

const baseUrl = import.meta.env.VITE_WP_BASEURL;

const Header = () => {
  const [menuIsOpen, openMenu] = useState(false);
  const [logoUrl, setLogoUrl] = useState("");
  const [activeNavItem, setActiveNavItem] = useState("");
  const location = useLocation();

  useEffect(() => {
    const fetchNavLogo = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/wp-json/custom/v1/nav-logo`
        );
        if (response.status === 200) {
          const data = response.data;
          setLogoUrl(data[0]);
        } else {
          console.error("Failed to fetch logo url", error);
        }
      } catch (error) {
        console.error("Error fetching lol URL", error);
      }
    };

    fetchNavLogo();
  }, []);

  const closeMobileMenu = () => {
    openMenu(false);
    document.body.classList.remove("no-scroll");
  };

  const handleWindowResize = () => {
    if (window.innerWidth > 660) {
      closeMobileMenu();
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const toggleMobileMenu = () => {
    openMenu(!menuIsOpen);
    document.body.classList.toggle("no-scroll");
  };

  useEffect(() => {
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  // useEffect(() => {
  //   const pathParts = location.pathname.split("/").filter(Boolean);
  //   const baseRoute = pathParts[0] === "product" ? "art" : pathParts[0] || "home";
  //   setActiveNavItem(baseRoute);
  // }, [location.pathname]);

  const handleNavClick = (navItem) => {
    setActiveNavItem(navItem);
    // toggleMobileMenu();
  };

  return (
    <>
      {activeNavItem !== "home" && (
        <nav>
          <div id="logo">
            <Link
              to="/"
              className={`nav-button photo-nav-button ${
                activeNavItem === "home" ? "active" : ""
              }`}
              // onClick={() => handleNavClick("home")}
            >
              <img src={logoUrl} alt="Regan Hill-Male" className="logo-image"/>
              {/* <h4 className="logo-text">Regan Hill-Male</h4> */}
            </Link>
          </div>
          <div className="nav-links">
            <Link
              to="/about"
              className={`nav-button about-button ${
                activeNavItem === "about" ? "active" : ""
              }`}
              onClick={() => handleNavClick("about")}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`nav-button contact-button ${
                activeNavItem === "contact" ? "active" : ""
              }`}
              onClick={() => handleNavClick("contact")}
            >
              Contact
            </Link>
            <Link
              to="/gallery"
              className={`nav-button gallery-button ${
                activeNavItem === "gallery" ? "active" : ""
              }`}
              onClick={() => handleNavClick("gallery")}
            >
              Gallery
            </Link>
          </div>
        </nav>
      )}
      {/* <MobileMenu closeMethod={toggleMobileMenu} isOpen={menuIsOpen} /> */}
    </>
  );
};

export default Header;
