import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import getUserInfo from "../../utilities/decodeJwt";

const PrivateUserProfile = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    setUser(getUserInfo());
  }, []);

  const handleLogout = async () => {
    localStorage.clear();
    window.location.href = "/"; // Redirect to homepage
  };

  if (!user) return <div><h4>Log in to view this page.</h4></div>;

  return (
    <div className="container">
      <div className="col-md-12 text-center">
        <h1>{user && user.username}</h1>
        <p>Email: {user.email}</p>
        {/* Additional user information can be displayed here */}
        <Button onClick={handleLogout}>Log Out</Button>
      </div>
    </div>
  );
};

export default PrivateUserProfile;
