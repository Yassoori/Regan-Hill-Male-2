import { useState, useEffect } from "react";
import axios from "axios";

const formEndpoint = import.meta.env.VITE_APP_WP_API_FORM_ENDPOINT;
const baseUrl = import.meta.env.VITE_WP_BASEURL;

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const contactForm = new FormData();
    contactForm.append("your-name", name);
    contactForm.append("your-email", email);
    contactForm.append("your-subject", subject);
    contactForm.append("your-message", message);

    axios
      .post(formEndpoint, contactForm, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then(() => {
        setSubmitted(true);
      })
      .catch((error) => {
        console.error("Form submission error:", error);
        setError(true);
      });
  };

  if (submitted) {
    return (
      <>
        <h3>Thank you for your message!</h3>
        <p>We'll be in touch soon</p>
      </>
    );
  }

  if (error) {
    return (
      <>
        <h3>Error!</h3>
        <p>Sorry, we were unable to send your message</p>
      </>
    );
  }

  return (
    <form onSubmit={handleSubmit} method="POST">
      <input
        type="text"
        name="name"
        onChange={(event) => setName(event.target.value)}
        value={name}
        required
        placeholder="Your name"
      />
      <input
        type="email"
        name="email"
        onChange={(event) => setEmail(event.target.value)}
        value={email}
        required
        placeholder="Your email"
      />
      <input
        type="text"
        name="subject"
        onChange={(event) => setSubject(event.target.value)}
        value={subject}
        required
        placeholder="Your subject"
      />
      <textarea
        name="message"
        onChange={(event) => setMessage(event.target.value)}
        value={message}
        required
        placeholder="Your message"
      />
      <button id="submit-button" className="regular-button" type="submit">
        Send
      </button>
    </form>
  );
};

const Contact = () => {
  const [contactPost, setContactPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${baseUrl}/wp-json/wp/v2/contact-post`)
      .then((res) => {
        setContactPost(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching contact post:", err);
      });
  }, []);

  const ContactPost = ({ contactPosts }) => {
    if (!contactPosts) return null;

    return (
      <>
        {contactPosts.map((contact, index) => (
          <div
            className="contact-section"
            id={contact.title.rendered}
            key={index}
            dangerouslySetInnerHTML={{ __html: contact.content.rendered }}
          />
        ))}
      </>
    );
  };
  
  return (
    <div id="contact-page" className="full-container">
      <div className="main-content-container">
        <div id="contact-content">
          <ContactPost contactPosts={contactPost} />
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Contact;
