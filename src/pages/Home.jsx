import { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

const apiUrl = import.meta.env.VITE_WP_API_BASEURL;

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
        <div className="main-content grid-container"></div>
        {/* {loading ? <Loading /> : <MainPosts mainPosts={mainPosts} />} */}
        <p>home</p>
      </div>
    </>
  );
};

export default Home;
