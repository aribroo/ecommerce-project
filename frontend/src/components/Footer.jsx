import './styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-text">
          Create with <span className="love-icon"></span> by Rifki Ari
        </p>
        <div className="social-links">
          <p>Follow my social media</p>
          <a href="mailto:rifkiari123@gmail.com" className="gmail-icon"></a>
          <a href="https://www.instagram.com/rifkiarri_" className="instagram-icon"></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
