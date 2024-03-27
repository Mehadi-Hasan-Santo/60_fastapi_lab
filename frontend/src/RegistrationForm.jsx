import React, { useState } from 'react';
import './RegistrationForm.css';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirm_password: '',
    email: '',
    phone_number: '',
    error: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password, confirm_password, email, phone_number } = formData;

    // Frontend validation for minimum character constraints
    if (username.length < 6) {
      setFormData({ ...formData, error: 'Username must have at least 6 characters' });
      return;
    }
    if (password.length < 7) {
      setFormData({ ...formData, error: 'Password must have at least 7 characters' });
      return;
    }
    if (password !== confirm_password) {
      setFormData({ ...formData, error: 'Passwords do not match' });
      return;
    }
    if (phone_number.length !== 11) {
      setFormData({ ...formData, error: 'Phone number must have exactly 11 digits' });
      return;
    }

    // If all frontend validations pass, submit the form
    setFormData({ ...formData, error: '' });
    // Implement the logic to send data to backend (FastAPI) here

    // Make the POST request to your FastAPI backend
    console.log("dsifhihy")
    fetch('http://127.0.0.1:8000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, email, phone_number ,confirm_password}),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
        // Handle success response from the server
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle error
      });
      console.log("dsifhihy")
  };


return (
  <div className="registration-container">
    <h2>Registration Form</h2>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Username:</label>
        <input type="text" name="username" value={formData.username} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Confirm Password:</label>
        <input type="password" name="confirm_password" value={formData.confirm_password} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Phone Number:</label>
        <input type="tel" name="phone_number" value={formData.phone_number} onChange={handleChange} required />
      </div>
      <button type="submit" className="submit-btn">Register</button>
      {formData.error && <p className="error-msg">{formData.error}</p>}
    </form>
  </div>
);
};

export default RegistrationForm;
