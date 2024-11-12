import { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { CitySelect, CountrySelect, StateSelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { UserContext } from "../UserContext";
import axios from "axios";

const validationSchema = Yup.object({
    password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
    cpassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
    country: Yup.string().required("Country is required"),
    state: Yup.string().required("State is required"),
    city: Yup.string().required("City is required"),
    address: Yup.string().required("Address is required"),
});

export default function Profile() {
    const [countryId, setCountryId] = useState(0);
    const [stateId, setStateId] = useState(0);
    const { user, setUser } = useContext(UserContext);
    if (!user) {
      return <div>Loading...</div>;
    }
    console.log("user", user)

    return (
        <Formik
            initialValues={{
                userId: user.userId || "",
                name: user.name || "",
                number: user.number || "",
                email: user.email || "",
                dob: user.dob || "",
                username: user.username || "",
                role: user.role || "",
                password: user.password || "",
                cpassword: user.cpassword || "",
                country: user.country || "",
                state: user.state || "",
                city: user.city || "",
                address: user.address || "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                  const response = await axios.put('/api/updateProfile', values);
                  setUser(response.data.updatedUser); 
                  alert('Profile updated successfully');
              } catch (error) {
                  console.error('Error updating profile:', error);
                  alert('Failed to update profile');
              }
              setSubmitting(false);
          }}
        >
            {({ setFieldValue }) => (
                <Form>
                    {/* Non-editable fields */}
                    <h6>User ID</h6>
                    <Field name="userId" type="text" readOnly />

                    <h6>Name</h6>
                    <Field name="name" type="text" readOnly />

                    <h6>Number</h6>
                    <Field name="number" type="text" readOnly />

                    <h6>Email</h6>
                    <Field name="email" type="email" readOnly />

                    <h6>Date of Birth</h6>
                    <Field name="dob" type="date" readOnly />

                    <h6>Username</h6>
                    <Field name="username" type="text" readOnly />

                    <h6>Role</h6>
                    <Field name="role" type="text" readOnly />

                    {/* Editable fields */}
                    <h6>Password</h6>
                    <Field name="password" type="password" placeholder="Enter new password" />
                    <ErrorMessage name="password" component="div" />

                    <h6>Confirm Password</h6>
                    <Field name="cpassword" type="password" placeholder="Confirm new password" />
                    <ErrorMessage name="cpassword" component="div" />

                    <h6>Country</h6>
                    <CountrySelect
                        onChange={(e) => {
                            setCountryId(e.id);
                            setFieldValue("country", e.name);
                        }}
                        placeHolder="Select Country"
                    />
                    <ErrorMessage name="country" component="div" />

                    <h6>State</h6>
                    <StateSelect
                        countryid={countryId}
                        onChange={(e) => {
                            setStateId(e.id);
                            setFieldValue("state", e.name);
                        }}
                        placeHolder="Select State"
                    />
                    <ErrorMessage name="state" component="div" />

                    <h6>City</h6>
                    <CitySelect
                        countryid={countryId}
                        stateid={stateId}
                        onChange={(e) => {
                            setFieldValue("city", e.name);
                        }}
                        placeHolder="Select City"
                    />
                    <ErrorMessage name="city" component="div" />

                    <h6>Address</h6>
                    <Field name="address" type="text" placeholder="Enter your address" />
                    <ErrorMessage name="address" component="div" />

                    <button type="submit">Update Profile</button>
                </Form>
            )}
        </Formik>
    );
}
