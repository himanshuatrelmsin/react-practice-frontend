import React, { useState } from "react";
import Input from "../../components/Input";
import "./Signup.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "../../components/Button";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Signup = () => {
  const [showPass, setShowPass] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  // {/****Define formik for initial value*********/}
  const formik = useFormik({
    initialValues: {
      name: "",
      number: "",
      email: "",
      dob: "",
      // username: "",
      pass: "",
      cpass: "",
      // terms: false,
    },
    // {/****Validation message*********/}
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Full name is required")
        .min(3, "Name must be at least 3 characters long"),
      number: Yup.string()
        .required("Mobile number is required")
        .matches(/^\d+$/, "Mobile number must be numeric") // automatically remove error after 10 digit
        .length(10, "Mobile number must be exactly 10 digits"),
      email: Yup.string()
        .required("Email id is required")
        .email("Email id is not valid"),
      dob: Yup.date()
        .required("Date of Birth is required")
        .test("age", "You must be atleast 18 years old", function (value) {
          const today = new Date();
          console.log(today);
          const birthDate = new Date(value);
          console.log(today);
          const age = today.getFullYear() - birthDate.getFullYear();
          return age >= 18;
        }),
      pass: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
          "Password must contain at least one uppercase letter, one lowercase letter, and one number"
        ),
      cpass: Yup.string()
        .required("Confirm Password is required")
        .oneOf([Yup.ref("pass"), null], "Passwords must match"),
    }),
    // {/****Click on submit values*********/}
    onSubmit: (values) => {
      console.log("Form submitted with values:", values); // value inside form
    },
  });

  return (
    <>
      <div className="signup-wrapper p-5">
        <form onSubmit={formik.handleSubmit}>
          <Input
            type="text"
            name="name"
            id="name"
            label="Full name"
            placeholder="Enter your full name"
            onChange={formik.handleChange} // When put the value
            onBlur={formik.handleBlur} // When focus the value
            value={formik.values.name}
            error={
              formik.touched.name && formik.errors.name
                ? formik.errors.name
                : null
            }
          />
          <Input
            type="tel"
            name="number"
            id="number"
            label="Mobile number"
            inputMode="numeric"
            placeholder="Enter your mobile number"
            pattern="\d*"
            onChange={(e) => {
              const { value } = e.target;
              // Remove any non-numeric characters
              const numericValue = value.replace(/\D/g, "");

              // Set the value only if it's 10 digits or less
              if (numericValue.length <= 10) {
                formik.setFieldValue("number", numericValue);
              }
            }}
            onBlur={formik.handleBlur}
            value={formik.values.number}
            error={
              formik.touched.number && formik.errors.number
                ? formik.errors.number
                : null
            }
          />
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email address"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : null
            }
          />
          <Input
            type="date"
            name="dob"
            id="dob"
            label="Date of birth"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.dob}
            error={
              formik.touched.dob && formik.errors.dob ? formik.errors.dob : null
            }
          />
          <div className="relative">
            <Input
              type={showPass ? "text" : "password"}
              name="pass"
              id="pass"
              label="Password"
              placeholder="Enter your password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.pass}
              onCopy={(e) => e.preventDefault()} // Disable cut, copy, paste
              onPaste={(e) => e.preventDefault()}
              onCut={(e) => e.preventDefault()}
              error={
                formik.touched.pass && formik.errors.pass
                  ? formik.errors.pass
                  : null
              }
            />
            <button
              type="button"
              className="absolute right-4 top-[38px] text-white"
              onClick={() => setShowPass((prev) => !prev)}
            >
              {showPass ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          <div className="relative">
            <Input
              type={showCPassword ? "text" : "password"}
              name="cpass"
              id="cpass"
              label="Confirm password"
              placeholder="Re-enter your password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.cpass}
              onCopy={(e) => e.preventDefault()} // Disable cut, copy, paste
              onPaste={(e) => e.preventDefault()}
              onCut={(e) => e.preventDefault()}
              error={
                formik.touched.cpass && formik.errors.cpass
                  ? formik.errors.cpass
                  : null
              }
            />
            <button 
              type="button"
              className="absolute right-4  top-[38px] text-white"
              onClick={() => setShowCPassword((prev) => !prev)}
            >
              {showCPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </div>
    </>
  );
};

export default Signup;
