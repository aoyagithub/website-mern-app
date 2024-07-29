import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './index.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const jsonRes = await res.json();
      localStorage.setItem('token', jsonRes.token);
      navigate('/');
    } catch (err) {
      alert('Failed to log in');
    }
  };

  useEffect(() => {
    document.title = 'Log in';
  }, []);

  return (
    <div className="login">
      <h2>Log in</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
          placeholder="email"
          required
        />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          placeholder="password"
          required
        />
        <button className="button">Log in</button>
        {/* <Link to={'/'}>Cancel</Link> */}
      </form>
    </div>
  );
};

export default Login;
