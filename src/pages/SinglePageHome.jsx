import { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

const baseUrl = import.meta.env.VITE_WP_BASEURL;

const SinglePageHome = () => {
  const [logoUrl, setLogoUrl] = useState("");
  const [landingPost, setLandingPost] = useState(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    axios
      .get(`${baseUrl}/wp-json/wp/v2/landing-post`)
      .then((res) => {
        setLandingPost(res.data);
        setLoading(false);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, [baseUrl]);

  const LandingPost = ({ landingPosts }) => {
    if (!landingPosts) {
      return null;
    }

    const mappedLandingPosts = landingPosts.map((landing, index) => {
      console.log(landing.content.rendered);
      return (
        <div
          className="landing-text"
          id={landing.title.rendered}
          key={index}
          dangerouslySetInnerHTML={{ __html: landing.content.rendered }}
        />
      );
    });
    return <>{mappedLandingPosts}</>;
  };

  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="This is the home page" />
        <meta name="keywords" content="keyword1, keyword2, keyword3" />
        <meta
          property="og:title"
          content="Facebook Open Graph Meta Tag example"
        />
      </Helmet>
      <div className="full-container" id="home-page">
        <div className="main-content-container" id="landing">
          <img src={logoUrl} alt="Regan Hill-Male" className="landing-logo" />
          {loading ? <Loading /> : <LandingPost landingPosts={landingPost} />}
          {/* <LandingPost landingPosts={landingPost} /> */}
          {/* <div className="landing-button-container">
            <Link to="/gallery" className="landing-button">
              View Artwork
            </Link>
            <Link
              to="/contact"
              className="landing-button landing-button-contact"
            >
              Inquire
            </Link>
          </div> */}

          <div id="home-footer">
            <div id="social-media-icons">
              <a href="https://www.instagram.com/regan.hillmale">
                <FontAwesomeIcon
                  icon={faInstagram}
                  size="lg"
                  className="social-media-a"
                />
              </a>
              <a href="https://www.facebook.com/reganhillmaleart/">
                <FontAwesomeIcon
                  icon={faFacebook}
                  size="lg"
                  className="social-media-a"
                />
              </a>
              <a href="mailto: contact@reganhillmale.com">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  size="lg"
                  className="social-media-a"
                />
              </a>
              {/* <p className="contact-info">+64 21 0285 3849</p> */}
            </div>
          </div>
        </div>
        <div id="footer-text">
              {/* <p className="contact-info">+64 21 0285 3849</p> */}
              <p className="rights">© 2024 Regan Hill Male.</p>
              <p className="rights">All Rights Reserved.</p>
              <a className="rights" href="https://www.yassersaeed.com/">
                Site by Yasser Saeed.
              </a>
            </div>
      </div>
    </>
  );
};

export default SinglePageHome;
