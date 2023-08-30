import { Link } from 'react-router-dom';
import '../components/styles/NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="wrapper">
        <h1>Oops! Page not found</h1>
        <p>The page you are looking for does not exist.</p>
        <Link to="/">Go back to Home</Link>
      </div>
    </div>
  );
};

export default NotFound;
