import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";

const baseUrl = import.meta.env.VITE_WP_BASEURL;

const Project = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const endpoint = `${baseUrl}/wp-json/wp/v2/project?slug=${slug}`;

  useEffect(() => {
    axios
      .get(`${endpoint}`)
      .then((res) => {
        if (res.data.length > 0) {
            setProject(res.data[0]);
            setLoading(false);
          } else {
            navigate("/gallery");
          }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [endpoint]);

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <div
      id="project-page"
      className="full-container"
      key={project.slug}
    >
      <div
        dangerouslySetInnerHTML={{ __html: project.content.rendered }}
        id={project.title.rendered}
        className="main-content-container project-grid"
      />
      <Link to={"/gallery"} className="back-button-container">
        <button className="back-button regular-button">Back to Gallery</button>
      </Link>
    </div>
  );
};

export default Project;
