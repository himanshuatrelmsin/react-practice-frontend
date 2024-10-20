import axios from "axios";
import { useState } from "react";
import './Login.scss'; 
import { Link, useNavigate } from "react-router-dom"; 

const LoginComponent = () => {
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();

  const validateForm = (formData) => {
    const errors = {};
    
    // Username validation
    if (!formData.username.trim()) {
      errors.username = "Please enter your username";
    }

    // Password validation
    if (!formData.password) {
      errors.password = "Please enter your password";
    }

    return errors;
  };Failed to reso
    e.preventDefault();
    const { username, password } = e.target.elements;

    const formData = {
      username: username.value.trim(),
      password: password.value,
    };

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/api/loginData", // Adjust the API endpoint as needed
        formData
      );

      if (response.status === 200) {
        setFormSubmitted(true);
        e.target.reset();
        // Handle successful login, e.g., redirect or show a success message
        console.log('Login successful!'); 
        navigate('/');
      } else {
        console.error("Error logging in:", response.data);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="user-login md:w-1/2 mx-auto">
      <div className="container mx-auto">
        <div className="flex flex-col justify-center w-full items-center">
          <h1 className="text-4xl font-bold text-blue-600 my-5">User Login</h1>
          {formSubmitted && (
            <div className="success-message text-green-600 mb-5">
              Login successful!
            </div>
          )}
          <form onSubmit={onSubmit} className="form-layout mx-auto w-full">
            <div className="grid">
              <div className="mb-3">
                <label className="text-sm mb-2">Username</label>
                <input
                  type="text"
                  name="username"
                  className="block w-full rounded-md border-0 py-3 pl-4 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  placeholder="Please enter username"
                />
                {errors.username && <div className="error">{errors.username}</div>}
              </div>
              <div className="mb-5">
                <label className="text-sm mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  className="block w-full rounded-md border-0 py-3 pl-4 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  placeholder="Please enter password"
                />
                {errors.password && <div className="error">{errors.password}</div>}
              </div>
              <div className="mb-5 pb-5">
                <button type="submit" className="block w-full btn-submit focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
