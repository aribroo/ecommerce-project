import '../components/styles/About.css';
import aboutImage from '../assets/banner/about.jpg';

const AboutUs = () => {
  return (
    <div className="about-page">
      <section className="about-section">
        <div className="about-image">
          <img src={aboutImage} alt="About Us" />
        </div>
        <div className="about-content">
          <h1>About Us</h1>
          <p>Welcome to SHOPMANIA, your one-stop online shopping destination. We are committed to providing the best shopping experience for you, offering a wide range of high-quality products from various categories.</p>
          <p>Our mission is to make online shopping convenient, enjoyable, and secure for every customer. With a user-friendly interface, secure payment options, and fast delivery, we aim to exceed your expectations at every step.</p>
        </div>
      </section>

      <footer></footer>
    </div>
  );
};

export default AboutUs;
