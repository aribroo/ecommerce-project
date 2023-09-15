import { useState } from 'react';
import '../components/styles/Register.css';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api/product-api';

const Login = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({});

  const [formData, setFormData] = useState({
    username: '',
    password: ''
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
    login(formData).then((result) => {
      if (result.errors) setData(result);

      if (result.data) {
        setData(result);
        localStorage.setItem('access_token', result.data.access_token);

        setTimeout(() => {
          navigate('/');
        }, 1500);
      }
    });
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      {data.data && (
        <div className="modal">
          <div className="modal-content">
            <h2>Login success</h2>
            <p>Redirecting...</p>
          </div>
        </div>
      )}
      <div className="register-container">
        <h1>User Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} placeholder="Username or phone number" required />
          </div>
          <div className="form-group">
            <input type={showPassword ? 'text' : 'password'} id="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />{' '}
            <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? '👁️' : '👁️'}
            </span>
          </div>
          <button type="submit">Login</button>
          <div className="form-group">
            <p className="link-button">
              Don&apos;t have an account? <Link to={'/register'}>Register here</Link>
            </p>
          </div>
          {data.errors && <p>{data.errors}!</p>}
        </form>
      </div>
    </>
  );
};

export default Login;
