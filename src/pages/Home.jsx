import { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

const baseUrl = import.meta.env.VITE_WP_BASEURL;

const Home = () => {
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
          <div className="landing-button-container">
            <Link to="/gallery" className="landing-button">
              View Artwork
            </Link>
            <Link
              to="/contact"
              className="landing-button landing-button-contact"
            >
              Inquire
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
