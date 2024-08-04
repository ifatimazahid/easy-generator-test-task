import { useState } from 'react';
import './styles.css';
import { Link, useNavigate } from 'react-router-dom';
import { CustomSnackBar } from '../../Components/Snackbar';
import { CONTENT_TYPE, LOGIN_ERROR, LOGIN_SUCCESS, POST } from '../../common/constants';

function Login() {

  const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
      });
    const [snackBar, setSnackBar] = useState({});

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const res = await fetch(process.env.REACT_APP_LOGIN_API_URL, {
            method: POST,
            headers: { "Content-Type": CONTENT_TYPE },
            body: JSON.stringify(formData),
          });

          const result = await res.json();

          if (!res.ok) {
            setSnackBar({
              show: true,
              message: result.message,
              color: "error",
            });
          } else {
            setSnackBar({
              show: true,
              message: LOGIN_SUCCESS,
              color: "success",
            });
            setTimeout(() => {
              navigate('/welcome');
            }, 2000);
          }
        } catch (err) {
          setSnackBar({
            show: true,
            message: LOGIN_ERROR,
            color: "error",
          });
        }
      };

      const handleClose = () => {
        setSnackBar((prevState) => {
          return {
            open: false,
            color: prevState.color,
            message: prevState.message,
          };
        });
      };

  return (
    <>
    <div className="signup-form">
    <h1>Login</h1>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
    <p>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
  </div>
    <CustomSnackBar
    isOpen={snackBar.show}
    color={snackBar.color}
    message={snackBar.message}
    onClose={handleClose}
  />
  </>
  );
}

export default Login;
