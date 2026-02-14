import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/users/register/", {
        username,
        email,
        password,
      });
      navigate("/login");
    } catch (err) {
      if (err.response && err.response.data) {
        setMessage("Error: " + (err.response.data.detail || "Try again"));
      } else {
        setMessage("Error: Try again");
      }
    }
  };

  return (
    <div className="fade-in kitty-container" style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="kitty-panel" style={{ width: '100%', maxWidth: '400px' }}>
        <div className="text-center mb-6">
          <h2 className="text-secondary" style={{ fontSize: '2.5rem' }}>Register</h2>
          <p className="text-secondary">Create an account to get started</p>
        </div>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <input
              className="input-field"
              type="text"
              placeholder="Username 🐱"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              className="input-field"
              type="email"
              placeholder="Email 📧"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6" style={{ position: 'relative' }}>
            <input
              className="input-field"
              type={showPassword ? "text" : "password"}
              placeholder="Password 🔒"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '15px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                opacity: 0.6
              }}
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
          <button type="submit" className="btn w-full">
            Register ✨
          </button>
        </form>
        {message && <div className={`text-center ${message.includes('Success') ? 'text-success' : 'text-danger'}`} style={{ marginTop: '1rem', fontWeight: '800' }}>{message}</div>}

        <div className="text-center" style={{ marginTop: '1.5rem', borderTop: '2px dashed var(--border-color)', paddingTop: '1rem' }}>
          <p className="text-secondary" style={{ fontSize: '0.9rem' }}>
            Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 'bold', textDecoration: 'none' }}>Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
