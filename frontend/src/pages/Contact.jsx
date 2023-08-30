import { useState } from 'react';
import '../components/styles/Contact.css'; // Pastikan Anda mengganti 'ContactUs.css' dengan nama file gaya yang sesuai

const Contact = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="contact-page">
      <div className="contact-content">
        <div className="contact-info">
          <h1>Contact Us</h1>
          <p>Email: example@example.com</p>
          <p>Phone: +1234567890</p>
          <p>Address: 123 Street, City</p>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="input-container">
            <input type="text" placeholder="Full Name" maxLength={100} value={fullName} onChange={handleFullNameChange} required />
            <input type="email" placeholder="Email" value={email} maxLength={100} onChange={handleEmailChange} required />
            <textarea placeholder="Message" value={message} onChange={handleMessageChange} required></textarea>
            <button type="submit">Send Message</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
