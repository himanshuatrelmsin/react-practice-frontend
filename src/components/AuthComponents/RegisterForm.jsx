import React, { useState } from "react";
import Input from "../Input";
import InputChecks from "../Input/InputChecks";
import Button from "../Button";
import TermsCondition from "../Modal";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import "./auth.scss";
import { FiEye, FiEyeOff } from 'react-icons/fi';

function RegisterForm() {
  const [verifyUser, setVerifyUser] = useState("Verify");
  const [verifyDisable, setVerifyDisable] = useState(false);
  const [submitDisable, setSubmitDisable] = useState(true);
  const [userError, setUserError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const verifyUsername = async (e) => {
    e.preventDefault();
    try {
      const usernameValue = document.getElementById("username").value.trim();
      const sanitizedUsername = usernameValue.replace(/[^a-zA-Z0-9]/g, "");
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}api_user/userVerification`,
        { username: sanitizedUsername }
      );
      if (response.status === 200) {
        setVerifyUser("Verified");
        setVerifyDisable(true);
        setSubmitDisable(false);
        setUserError(<div className="text-white">Username is available.</div>);
      } else {
        setVerifyUser("Retry");
        setVerifyDisable(false);
        setSubmitDisable(true);
        setUserError(<div className="text-red-600">Please try another username.</div>);
      }
    } catch (error) {
      setVerifyUser("Retry");
      setVerifyDisable(false);
      setSubmitDisable(true);
      setUserError(<div className="text-red-600">Please try another username.</div>);
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .required("Full name is required"),
    number: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
      .required("Mobile number is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    dob: Yup.date().required("Date of birth is required"),
    username: Yup.string()
      .matches(/^\S*$/, "Username cannot contain spaces")
      .min(4, "Username must be at least 4 characters")
      .required("Username is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    cpassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
    terms: Yup.boolean()
      .oneOf([true], "You must accept the terms and conditions")
      .required("You must accept the terms and conditions"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      number: "",
      email: "",
      dob: "",
      username: "",
      password: "",
      cpassword: "",
      terms: false,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}api_user/userRegistration`,
          values
        );
        if (response.status === 200) {
          setSuccessMessage('Registration successful!');
          resetForm();
          resetStates();
          setTimeout(() => {
            setSuccessMessage(''); // Clear success message after 3 seconds
          }, 3000);
        } else {
          console.error("Error submitting form data:", response.data);
        }
      } catch (error) {
        console.error("Error submitting form data:", error);
      }
    },
  });

  const resetStates = () => {
    setVerifyUser("Verify");
    setVerifyDisable(false);
    setSubmitDisable(true);
    setUserError("");
  };

  const isUsernameValid = formik.values.username.trim().length > 0;

  return (
    <form onSubmit={formik.handleSubmit}>
      <Input
        type="text"
        name="name"
        id="name"
        placeholder="Enter your full name"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.name}
        error={formik.touched.name && formik.errors.name ? formik.errors.name : null}
      />
      <Input
        type="tel"
        name="number"
        id="number"
        placeholder="Enter your mobile number"
        inputMode="numeric"
        pattern="\d*"
        onChange={(e) => {
          const { value } = e.target;
          const numericValue = value.replace(/\D/g, "");
          formik.setFieldValue("number", numericValue);
        }}
        onBlur={formik.handleBlur}
        value={formik.values.number}
        error={formik.touched.number && formik.errors.number ? formik.errors.number : null}
      />
      <Input
        type="email"
        name="email"
        id="email"
        placeholder="Enter your email address"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
        error={formik.touched.email && formik.errors.email ? formik.errors.email : null}
      />
      <Input
        type="date"
        name="dob"
        id="dob"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.dob}
        error={formik.touched.dob && formik.errors.dob ? formik.errors.dob : null}
      />
      <div className="relative">
        <Input
          type="text"
          name="username"
          id="username"
          placeholder="Enter username and verify"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          error={formik.touched.username && formik.errors.username ? formik.errors.username : null}
          disabled={verifyDisable}
          usernameerror={userError}
        />
        <Button
          className="text-dark showPass verifyUser"
          disabled={!isUsernameValid}
          onClick={verifyUsername}
        >
          {verifyUser}
        </Button>
      </div>
      <div className='relative'>
        <Input
          type={showPassword ? "text" : "password"}
          name="password"
          id="password"
          placeholder="Create password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          error={formik.touched.password && formik.errors.password ? formik.errors.password : null}
        />
        <button
          type="button"
          className="absolute right-2 top-[18px]"
          onClick={() => setShowPassword(prev => !prev)}
        >
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </button>
      </div>
      <div className='relative'>
        <Input
          type={showCPassword ? "text" : "password"}
          name="cpassword"
          id="cpassword"
          placeholder="Confirm password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.cpassword}
          error={formik.touched.cpassword && formik.errors.cpassword ? formik.errors.cpassword : null}
        />
        <button
          type="button"
          className="absolute right-2 top-[18px]"
          onClick={() => setShowCPassword(prev => !prev)}
        >
          {showCPassword ? <FiEyeOff /> : <FiEye />}
        </button>
      </div>
      <InputChecks
        type="checkbox"
        name="terms"
        id="terms"
        label={
          <span>
            I have read all the{" "}
            <span className="text-blue-500 cursor-pointer" onClick={openModal}>
              terms and conditions
            </span>
            .
          </span>
        }
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        checked={formik.values.terms}
        error={formik.touched.terms && formik.errors.terms ? formik.errors.terms : null}
      />
      <Button type="submit" className="mt-8" disabled={submitDisable}>
        Submit
      </Button>
      {successMessage && <div className="text-green-600 text-center font-[100px] z-index[999] relative mt-4">{successMessage}</div>}
      <TermsCondition
        showModal={showModal}
        setShowModal={setShowModal}
        modalTitle="Terms and Conditions"
        modalText="Here are the terms and conditions for using the platform."
        btnPrimaryLabel="I Agree"
        onPrimaryClick={() => {
          formik.setFieldValue("terms", true);
          closeModal();
        }}
        btnSecondaryLabel="Close"
        onSecondaryClick={() => {
          formik.setFieldValue("terms", false);
          closeModal();
        }}
      />
    </form>
  );
}

export default RegisterForm;
