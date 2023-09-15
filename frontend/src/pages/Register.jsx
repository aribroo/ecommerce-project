import { useState } from 'react';
import { register } from '../api/product-api';
import '../components/styles/Register.css';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [registerResult, setRegisterResult] = useState({});
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    phone_number: '',
    email: '',
    address: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register(formData).then((result) => {
      setRegisterResult(result);
      if (result.data) {
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }

      if (result.errors) {
        setErrors(result.errors);
      }
    });
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      {registerResult.data && (
        <div className="modal">
          <div className="modal-content">
            <h2>Registered Successfully</h2>
            <p>Redirecting...</p>
          </div>
        </div>
      )}

      <div className="register-container">
        <h1>User Registration</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="text" id="username" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <input type={showPassword ? 'text' : 'password'} id="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? '👁️' : '👁️'}
            </span>
          </div>
          <div className="form-group">
            <input type="tel" id="phone_number" name="phone_number" placeholder="Phone number" value={formData.phone_number} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <input type="email" id="email" name="email" value={formData.email} placeholder="Email" onChange={handleChange} />
          </div>
          <div className="form-group">
            <textarea id="address" name="address" value={formData.address} placeholder="Address" onChange={handleChange} rows="4" required />
          </div>
          <button type="submit">Register</button>
        </form>
        <div>
          <p>
            Already have an account? <Link to={'/login'}>Login here</Link>
          </p>
        </div>
        {registerResult.errors && <p>{errors}!</p>}
      </div>
    </>
  );
};

export default Register;
