import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";

const baseUrl = import.meta.env.VITE_WP_BASEURL;

const Gallery = () => {
  const [projects, setProjects] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [filter, setFilter] = useState(null);
  // const [type, setType] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseUrl}/wp-json/wp/v2/project?_embed&per_page=100`)
      .then((res) => {
        setProjects(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));

    axios
      .get(`${baseUrl}/wp-json/wp/v2/categories`)
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, [baseUrl]);

  useEffect(() => {
    if (!filter) {
      setFilteredProjects(projects);
    } else {
      const selectedCategory = categories.find(
        (category) => category.name === filter
      );
      const filtered = projects.filter((project) =>
        project.categories.includes(selectedCategory?.id)
      );
      setFilteredProjects(filtered);
    }
  }, [filter, projects, categories]);

  const handleFilterClick = (selectedFilter) => {
    if (filter === selectedFilter) {
      setFilter(null);
    } else {
      setFilter(selectedFilter);
    }
  };

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  const Projects = ({ projects }) => {
    const mappedProjects = projects.map((project, index) => {
      const isFiltered =
        filter &&
        project.categories.some((category) => category.name === filter);
      const projectCardClassed = `project-card${isFiltered ? " filtered" : ""}`;

      function getFeaturedImage(project, index) {
        if (
          project &&
          project._embedded &&
          project._embedded["wp:featuredmedia"] &&
          project._embedded["wp:featuredmedia"][0].source_url
        ) {
          return project._embedded["wp:featuredmedia"][0].source_url;
        } else {
          return null;
        }
      }
      return (
        <Link
          key={project.slug + "_" + index}
          className="project-card"
          id={`${project.title.rendered}-card`}
          to={`/gallery/${project.slug}`}
          // data-aos="zoom-in-down"
          // data-aos-easing="liner"
          // data-aos-offset="50"
          // data-set-delay="1000"
        >
          {/* <div className="card-text">
            <h3 className="card-heading">{project.title.rendered}</h3>
            <div
              dangerouslySetInnerHTML={{ __html: project.excerpt.rendered }}
              className="card-body"
            />
          </div> */}
          <img
            src={getFeaturedImage(project)}
            alt={project.title.rendered}
            className="card-image"
          />
        </Link>
      );
    });
    return <>{mappedProjects}</>;
  };

  return (
    <>
      <Helmet>
        <title>Gallery</title>
        <meta name="description" content="Art Gallery" />
        <meta
          name="keywords"
          content="Gallery, Murals, Art, Prints, Portfolio"
        />
        Additional meta tags, e.g., social media share tags for Twitter, etc.
        <meta
          property="og:title"
          content="Facebook Open Graph Meta Tag example"
        />
      </Helmet>
      <div className="container full-container" id="gallery-page">
        <div className="filter">
          {categories
            .filter((category) => category.id !== 1) // Exclude "Uncategorized"
            .map((category) => (
              <a
                key={category.id}
                onClick={() => handleFilterClick(category.name)}
                className={`filter-button ${
                  filter === category.name ? "selected" : ""
                }`}
              >
                {category.name}
              </a>
            ))}
        </div>

        <div className="main-content-container grid-container gallery-grid">
          {loading ? (
            <Loading />
          ) : (
            <Projects projects={filteredProjects || projects} />
          )}
          <a href="" className="project-card last-card"></a>
        </div>
      </div>
    </>
  );
};

export default Gallery;
