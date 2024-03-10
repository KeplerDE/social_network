import React, { useState } from 'react';

const Register = () => {
  const [userDetails, setUserDetails] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implement your registration logic here, e.g., API call to backend
    console.log('Submitting registration details: ', userDetails);
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={userDetails.username}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={userDetails.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={userDetails.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
