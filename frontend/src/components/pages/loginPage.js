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
  const [bgColor, setBgColor] = useState('#f8f9fa');

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
    <div className="bg-white p-4 shadow rounded">
      <h2 className="text-center mb-4">Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
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
    <div style={{ backgroundColor: bgColor, minHeight: '100vh', paddingBottom: '100px' }}>
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            {user ? <PrivateUserProfile /> : renderLoginForm()}
          </Col>
        </Row>
      </Container>
      <Footer style={{ position: 'fixed', bottom: '0', width: '100%' }} />
    </div>
  );
};

export default Login;
