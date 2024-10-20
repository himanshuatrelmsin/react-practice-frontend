import React, { useContext } from 'react';
import Button from '../Button';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Input from '../Input';
import { UserContext } from '../../UserContext';


function LoginForm() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(4, 'Username must be at least 4 characters')
      .required('Username is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "http://localhost:3001/api_user/userLogin",
          values
        );
        if (response.status === 200) {
          const user = response.data.user;
          const loginTimestamp = new Date().getTime();
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('loginTimestamp', loginTimestamp);

          setUser(user);

          console.log("User login successfully!");
          navigate('/');
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
        error={formik.touched.username && formik.errors.username ? formik.errors.username : null}
      />
      <Input
        type="password"
        name="password"
        id="password"
        placeholder="Enter password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
        error={formik.touched.password && formik.errors.password ? formik.errors.password : null}
      />
      <Button type="submit" className="mt-2">Submit</Button>
    </form>
  );
}

export default LoginForm;
