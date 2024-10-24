import React, { useContext, useState } from "react";
import Button from "../Button";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Input from "../Input";
import { UserContext } from "../../UserContext";
import { FiEye, FiEyeOff } from "react-icons/fi";

function LoginForm() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(4, "Username must be at least 4 characters")
      .required("Username is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}api_user/userLogin`,
          values
        );
        if (response.status === 200) {
          const user = response.data.user;
          const loginTimestamp = new Date().getTime();
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("loginTimestamp", loginTimestamp);

          setUser(user);

          console.log("User login successfully!");
          navigate("/");
        } else {
          console.error("Error submitting form data:", response.data);
        }
      } catch (error) {
        console.error("Error submitting form data:", error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Input
        type="text"
        name="username"
        id="username"
        placeholder="Enter username or email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.username}
        error={
          formik.touched.username && formik.errors.username
            ? formik.errors.username
            : null
        }
      />
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          name="password"
          id="password"
          placeholder="Enter password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          onCopy={(e) => e.preventDefault()} // Disable copy
          onPaste={(e) => e.preventDefault()} // Disable paste
          onCut={(e) => e.preventDefault()} // Disable cut
          error={
            formik.touched.password && formik.errors.password
              ? formik.errors.password
              : null
          }
        />
        <button
          type="button"
          className="absolute right-2 top-[18px] text-white"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </button>
      </div>
      <Button type="submit" className="mt-2">
        Submit
      </Button>
    </form>
  );
}

export default LoginForm;
