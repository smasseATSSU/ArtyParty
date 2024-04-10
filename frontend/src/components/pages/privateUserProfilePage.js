import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import getUserInfo from "../../utilities/decodeJwt";
import axios from "axios";

const PrivateUserProfile = () => {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({});
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [error, setError] = useState("");

  useEffect(() => {
    setUser(getUserInfo());
  }, []);

  const handleShow = () => {
    setShow(true);
    setPassword("");
    setEmail("");
    setError("");
  };

  const handleClose = () => setShow(false);

  const handleLogout = async () => {
    localStorage.clear();
    window.location.href = "/"; // Redirect to homepage
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("password", password);
      formData.append("email", email);

      const response = await axios.put(
        `http://localhost:8081/user/${user.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" }, // Set content type for file upload
        }
      );
      // Update user state with new details
      setUser(response.data);
      setShow(false);
    } catch (error) {
      setError("Failed to update profile. Please try again.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (!user) return <div><h4>Log in to view this page.</h4></div>;

  return (
    <div className="container">
      <div className="col-md-12 text-center">
        <h1>{user && user.username}</h1>
        <p>Email: {user.email}</p>
        {/* Additional user information can be displayed here */}
        <Button className="me-2" onClick={handleShow}>
          Edit Profile
        </Button>
        <Button onClick={handleLogout}>Log Out</Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {error && <div className="alert alert-danger">{error}</div>}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="password">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Form.Check
                  type="checkbox"
                  label="Show Password"
                  onClick={togglePasswordVisibility}
                />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>New Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default PrivateUserProfile;
