import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Footer from '../Footer';
import axios from 'axios';
import PrivateUserProfile from './privateUserProfilePage';

const Login = () => {
  const [data, setData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('accessToken');
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/user/login', data);
      const { accessToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
      setUser(accessToken);
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  const renderLoginForm = () => (
    <div className="login-form">
      <h2 className="text-center mb-4">Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </Form.Group>
        <div className="text-center">
          <Button variant="primary" type="submit" className="w-100">
            Login
          </Button>
        </div>
      </Form>
    </div>
  );

  return (
    <div>
      {/* Title Bar */}
      <div
        style={{
          position: 'relative',
          backgroundImage: `url('https://artypartybucket.s3.amazonaws.com/gallery.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '300px',
          color: '#fff',
          textAlign: 'center',
          textShadow: '80px 80px 40px rgba(0, 0, 0, 0.2)',
          padding: '20px',
        }}
      >
        <h1 style={{ 
              fontSize: '3.5vw', 
              textTransform: 'uppercase', 
              letterSpacing: '2px', 
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' // Add drop shadow effect
            }}>
        {user ? <PrivateUserProfile /> : renderLoginForm()}
      </h1>
      </div>
      <div className="login-page" style={{ backgroundColor: '#f8f9fa', minHeight: '50vh' }}>
        <Container>
          {/* Add rows of blank space */}
          <Row className="justify-content-center align-items-center" style={{ height: '40vh' }}>
            <Col>
              {/* Empty rows */}
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    </div>
  );
};

export default Login;
