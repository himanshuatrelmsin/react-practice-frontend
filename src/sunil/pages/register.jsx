import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    cpassword: '',
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    const { username, email, password, cpassword } = formData;

    if (!username) {
      newErrors.username = 'Username is required';
    }

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (password !== cpassword) {
      newErrors.cpassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    axios.post('http://localhost:3001/api/registrationData', formData)
      .then(() => {
        alert('Registration successful!');
        setFormData({
          username: '',
          email: '',
          password: '',
          cpassword: '',
        });
        setErrors({});
        setApiError('');
      })
      .catch((error) => {
        setApiError('Registration failed. Please try again.');
        console.error(error);
      });
  };

  return (
    <div className="flex items-center justify-center flex-col my-4">
      <h5 className="text-blue-600 mb-3">Registration Form</h5>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between flex-col">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="border"
          />
        </div>
          {errors.username && <div className="text-red-500 mb-3 ">{errors.username}</div>}
        <div className=" flex justify-between flex-col">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border"
          />
        </div>
          {errors.email && <div className="text-red-500 mb-3 ">{errors.email}</div>}
        <div className=" flex justify-between flex-col">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border"
          />
        </div>
          {errors.password && <div className="text-red-500 mb-3 ">{errors.password}</div>}
        <div className=" flex justify-between flex-col">
          <label>Confirm Password</label>
          <input
            type="password"
            name="cpassword"
            value={formData.cpassword}
            onChange={handleChange}
            className="border"
          />
        </div>
          {errors.cpassword && <div className="text-red-500 mb-3 ">{errors.cpassword}</div>}
        <button type="submit" className="btn btn-primary btn-submit mt-5">Register</button>
      </form>
      {apiError && <div className="text-red-500 mt-3">{apiError}</div>}
     
    </div>
  );
};

export default Register;
