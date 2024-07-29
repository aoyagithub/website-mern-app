import { Link, useNavigate } from 'react-router-dom';
import './index.scss';

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You are not logged in');
      return;
    }

    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      try {
        const res = await fetch(`${process.env.REACT_APP_BASE_URL}/logout`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          const result = await res.json();
          alert(result.message);
        }
      } catch (error) {
        alert('Error logging out');
      }
    }
  };

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="title">
          Membership <br className="sp-br" />
          Website
        </Link>

        <nav>
          <ul>
            {' '}
            {!isLoggedIn && (
              <>
                <li>
                  <Link to="/signup">Sign up</Link>
                </li>

                <li>
                  <Link to="/login">Log in</Link>
                </li>
              </>
            )}
            {isLoggedIn && <li onClick={handleLogout}>Log out</li>}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
