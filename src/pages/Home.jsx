import { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

const baseUrl = import.meta.env.VITE_WP_BASEURL;

const Home = () => {
  // const [mainPosts, setMainPosts] = useState(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   axios
  //     .get(`${apiUrl}/mainposts`)
  //     .then((res) => {
  //       setMainPosts(res.data)
  //       setLanding(res.data);
  //       setLoading(false);
  //       // console.log(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, [apiUrl]);

  // if (loading) {
  //   return (
  //     <>
  //       <Loading />
  //     </>
  //   );
  // }

  // const MainPosts = ({ mainPosts }) => {
  //   const mappedMainPosts = mainPosts.map((mainPost, index) => {
  //     function getFeaturedImage(mainPost, index) {
  //       if (
  //         mainPost &&
  //         mainPost._embedded &&
  //         mainPost._embedded["wp:featuredmedia"] &&
  //         mainPost._embedded["wp:featuredmedia"][0].source_url
  //       ) {
  //         return mainPost._embedded["wp:featuredmedia"][0].source_url;
  //       } else {
  //         return null;
  //       }
  //     }
  //   })
  // }

  const [logoUrl, setLogoUrl] = useState("");

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
        {/* {loading ? <Loading /> : <MainPosts mainPosts={mainPosts} />} */}
        <img src={logoUrl} alt="Regan Hill-Male" className="landing-logo" />
        <h1>Kia Ora, I'm Regan</h1>
        <p>I'm an artist, and mostly paint murals</p>
        <div className="landing-button-container">
          <Link
            to="/gallery" className="landing-button"
          >
            View Artwork
          </Link>
          <Link
            to="/contact" className="landing-button landing-button-contact"
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
