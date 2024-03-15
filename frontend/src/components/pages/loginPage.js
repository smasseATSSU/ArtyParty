import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Footer from '../Footer';
import axios from 'axios';

const Login = () => {
  const [featuredArtworks, setFeaturedArtworks] = useState([]);
  const [landingArtworks, setLandingArtworks] = useState([]);
  const [user, setUser] = useState(null);
  const [data, setData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [light, setLight] = useState(false);
  const [bgColor, setBgColor] = useState('#f8f9fa');

  useEffect(() => {
    async function fetchFeaturedArtworks() {
      try {
        const response = await axios.get('http://localhost:8081/art/featured');
        setFeaturedArtworks(response.data);
      } catch (error) {
        console.error('Error fetching featured artworks:', error);
      }
    }
    fetchFeaturedArtworks();
  }, []);

  useEffect(() => {
    async function fetchLandingArtworks() {
      try {
        const response = await axios.get('http://localhost:8081/art/artwork');
        setLandingArtworks(response.data);
      } catch (error) {
        console.error('Error fetching landing artworks:', error);
      }
    }
    fetchLandingArtworks();
  }, []);

  useEffect(() => {
    // Check if user is logged in
    const loggedInUser = localStorage.getItem("accessToken");
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const handleLogout = () => {
    // Clear user data from local storage
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8081/user/login", data);
      const { accessToken } = response.data;
      // Store token in local storage
      localStorage.setItem("accessToken", accessToken);
      setUser(accessToken);
    } catch (error) {
      setError("Invalid username or password");
    }
  };

  // Function to shuffle array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Shuffle the landing artworks
  const shuffledLandingArtworks = shuffleArray(landingArtworks);

  return (
    <div style={{ backgroundColor: bgColor, minHeight: '100vh', paddingBottom: '100px' }}>
      <Container style={{ paddingTop: '20px' }}>
        <Row className="justify-content-center mt-5">
          <Col xs={12} md={6} lg={4}>
            <form onSubmit={handleSubmit}>
              <h2 className="text-center mb-4">Login</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="username" 
                  name="username" 
                  value={data.username} 
                  onChange={(e) => setData({ ...data, username: e.target.value })} 
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input 
                  type="password" 
                  className="form-control" 
                  id="password" 
                  name="password" 
                  value={data.password} 
                  onChange={(e) => setData({ ...data, password: e.target.value })} 
                />
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary">Login</button>
              </div>
            </form>
            {user && (
              <div className="text-center mt-3">
                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </Col>
        </Row>
      
      </Container>
      <Footer style={{ position: 'fixed', bottom: '0', width: '100%' }} />
    </div>
  );
};

export default Login;
