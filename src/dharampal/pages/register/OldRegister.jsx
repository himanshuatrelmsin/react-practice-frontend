import axios from "axios";
import { useState } from "react";

const RegisterComponent = () => {
  const [errors, setErrors] = useState({name: "", number: "", email: "", dob: "", username: "", password: "", cpassword: ""});
  const onSubmit = async (e) => {
    e.preventDefault();
    const { name, number, email, dob, username, password } = e.target.elements;
    const formData = {
      name: name.value,
      number: number.value,
      email: email.value,
      dob: dob.value,
      username: username.value,
      password: password.value,
      cpassword: password.value,
    };
    const validateForm = (formData) => {
      const errors = {};
      if (!formData.name) {
        errors.name = "Please enter the name";
      }
      if (!formData.number) {
        errors.number = "Please enter the phone"
      }
      if (!formData.email) {
        errors.email = "Please enter the email";
      }
      if (!formData.dob) {
        errors.dob = "Please enter the dob"; 
      }
      if (!formData.username) {
        errors.username = "Please enter the username";
      }
      if (!formData.password) {
        errors.password = "Please enter the password";
      }
      if (!formData.cpassword) {
        errors.cpassword = "Please enter the password";
      }
      if (!formData.password && !formData.cpassword && !formData.password !== !formData.cpassword ) {
        errors.cpassword = "Passwords do not Match"; 
      }
      return errors; 
    };
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // if (name.value == "") {
    //   setErrors("Please enter the name");
    // }
    // if (email.value == "") {
    //   setErrors("Please enter the email"); 
    // }
    try {
      const response = await axios.post(
        "http://localhost:3001/api/registrationData",
        formData
      );
  
      if (response.status === 200) {
        setFieldDisabled(true);
  
        // alert('Form data submitted successfully!');
      } else {
        console.error("Error submitting form data:", response.data);
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };
  
  return (
    <div className="user-registerbg-gray-100 md:w-1/2 mx-auto">
      <div className="container mx-auto">
        <div className="flex flex-col justify-center w-full items-center">
          <h1 className="text-4xl font-bold text-blue-600 my-5">
            User Registration
          </h1>
          <form onSubmit={onSubmit} className="form-layout mx-auto w-full">
            <div className="grid">
              <div className="mb-3">
                <label className="text-sm mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
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
                  id="number"
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
                  id="email"
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
                  id="dob"
                  className="block w-full rounded-md border-0 py-3 pl-4 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  placeholder="Please enter dob"
                />
                {errors.dob && <div className="error">{errors.dob}</div>}
              </div>
              <div className="mb-3">
                <label className="text-sm mb-2">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
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
                  id="password"
                  className="block w-full rounded-md border-0 py-3 pl-4 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  placeholder="Please enter password"
                />
                {errors.password && <div className="error">{errors.password}</div>}
              </div>
              <div className="mb-5">
                <label className="text-sm mb-2">Confirm Password</label>
                <input
                  type="password"
                  name="cpassword"
                  id="cpassword"
                  className="block w-full rounded-md border-0 py-3 pl-4 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  placeholder="Please enter confrim password"
                />
                {errors.cpassword && <div className="error">{errors.cpassword}</div>}
              </div>
              <div className="mb-5 pb-5">
                <button type="submit" className="block w-full btn-submit focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
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
