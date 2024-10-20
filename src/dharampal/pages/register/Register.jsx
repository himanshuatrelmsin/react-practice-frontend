import axios from "axios";
import { useState } from "react";

const RegisterComponent = () => {
  const [errors, setErrors] = useState({
    name: "",
    number: "",
    email: "",
    dob: "",
    username: "",
    password: "",
    cpassword: "",
  }); 

  const [formSubmitted, setFormSubmitted] = useState(false);

  const validateForm = (formData) => {
    const errors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      errors.name = "Please enter your name";
    }

    // Phone number validation (only digits and length check)
    const phonePattern = /^[0-9]{10}$/;
    if (!formData.number.trim()) {
      errors.number = "Please enter your phone number";
    } else if (!phonePattern.test(formData.number)) {
      errors.number = "Please enter a valid 10-digit phone number";
    }

    // Email validation (basic regex for format check)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = "Please enter your email";
    } else if (!emailPattern.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    // Date of birth validation
    if (!formData.dob) {
      errors.dob = "Please enter your date of birth";
    }

    // Username validation
    if (!formData.username.trim()) {
      errors.username = "Please enter your username";
    }

    // Password validation
    if (!formData.password) {
      errors.password = "Please enter your password";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    // Confirm password validation and matching
    if (!formData.cpassword) {
      errors.cpassword = "Please confirm your password";
    } else if (formData.password !== formData.cpassword) {
      errors.cpassword = "Passwords do not match";
    }

    return errors;
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: "",
      cpassword: "",
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { name, number, email, dob, username, password, cpassword } = e.target.elements;

    const formData = {
      name: name.value.trim(),
      number: number.value.trim(),
      email: email.value.trim(),
      dob: dob.value,
      username: username.value.trim(),
      password: password.value,
      cpassword: cpassword.value,
    };

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/api/registrationData",
        formData
      );

      if (response.status === 200) {
        setFormSubmitted(true);
        e.target.reset();
        // Do something on success, like redirect or showing a message
        console.log('Form submitted successfully!');
      } else {
        console.error("Error submitting form data:", response.data);
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  return (
    <div className="user-register md:w-1/2 mx-auto">
      <div className="container mx-auto">
        <div className="flex flex-col justify-center w-full items-center">
          <h1 className="text-4xl font-bold text-blue-600 my-5">
            User Registration
          </h1>
          {formSubmitted && (
            <div className="success-message text-green-600 mb-5">
              Form submitted successfully!
            </div>
          )}
          <form onSubmit={onSubmit} className="form-layout mx-auto w-full">
            <div className="grid">
              <div className="mb-3">
                <label className="text-sm mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  className="block w-full rounded-md border-0 py-3 pl-4 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  placeholder="Please enter name"
                />
                {errors.name && <div className="error">{errors.name}</div>}
              </div>
              <div className="mb-3">
                <label className="text-sm mb-2">Phone</label>
                <input
                  type="text"
                  name="number"
                  className="block w-full rounded-md border-0 py-3 pl-4 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  placeholder="Please enter phone"
                />
                {errors.number && <div className="error">{errors.number}</div>}
              </div>
              <div className="mb-3">
                <label className="text-sm mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  className="block w-full rounded-md border-0 py-3 pl-4 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  placeholder="Please enter email"
                />
                {errors.email && <div className="error">{errors.email}</div>}
              </div>
              <div className="mb-3">
                <label className="text-sm mb-2">Dob</label>
                <input
                  type="date"
                  name="dob"
                  className="block w-full rounded-md border-0 py-3 pl-4 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
                {errors.dob && <div className="error">{errors.dob}</div>}
              </div>
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
                  onChange={handlePasswordChange}
                />
                {errors.password && <div className="error">{errors.password}</div>}
              </div>
              <div className="mb-5">
                <label className="text-sm mb-2">Confirm Password</label>
                <input
                  type="password"
                  name="cpassword"
                  className="block w-full rounded-md border-0 py-3 pl-4 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  placeholder="Please confirm password"
                  onChange={handlePasswordChange}
                />
                {errors.cpassword && <div className="error">{errors.cpassword}</div>}
              </div>
              <div className="mb-5 pb-5">
                <button type="submit" className="block w-full btn-submit focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
