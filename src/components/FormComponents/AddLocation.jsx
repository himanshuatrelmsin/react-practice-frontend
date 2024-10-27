import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import Select from "react-select"; // Import react-select
import {
    GetCountries,
    GetState,
    GetCity, // async functions
} from "react-country-state-city";

function LocationForm() {
    const [countriesList, setCountriesList] = useState([]);
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);

    // Fetch countries on component mount
    useEffect(() => {
        GetCountries().then((result) => setCountriesList(result));
    }, []);

    const formik = useFormik({
        initialValues: {
            countryId: { value: 0, label: "Select Country" }, // Adjust for react-select
            stateId: { value: 0, label: "Select State" }, // Adjust for react-select
            cityId: { value: 0, label: "Select City" }, // Adjust for react-select
            title: "",
            address: "", // Static address field
            image: null,
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Title is required"),
            address: Yup.string().required("Address is required"), // Validation for static address
            countryId: Yup.object().shape({
                value: Yup.number().min(1, "Country is required").required(),
            }),
            stateId: Yup.object().shape({
                value: Yup.number().min(1, "State is required").required(),
            }),
            cityId: Yup.object().shape({
                value: Yup.number().min(1, "City is required").required(),
            }),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                const formData = new FormData();
                formData.append("countryId", values.countryId.value);
                formData.append("stateId", values.stateId.value);
                formData.append("cityId", values.cityId.value);
                formData.append("address", values.address); // Add static address to form data

                const response = await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL}api_product/addProduct`,
                    formData
                );

                if (response.status === 200) {
                    resetForm();
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
            {/* Country Select using react-select */}
            <Select
                name="countryId"
                options={countriesList.map((country) => ({
                    value: country.id,
                    label: country.name,
                }))}
                value={formik.values.countryId}
                onChange={(option) => {
                    formik.setFieldValue("countryId", option);
                    GetState(option.value).then((result) => setStateList(result));
                }}
                placeholder="Select Country"
            />

            {/* State Select using react-select */}
            <Select
                name="stateId"
                options={stateList.map((state) => ({
                    value: state.id,
                    label: state.name,
                }))}
                value={formik.values.stateId}
                onChange={(option) => {
                    formik.setFieldValue("stateId", option);
                    GetCity(formik.values.countryId.value, option.value).then((result) => setCityList(result));
                }}
                placeholder="Select State"
                isDisabled={formik.values.countryId.value === 0}
            />

            {/* City Select using react-select */}
            <Select
                name="cityId"
                options={cityList.map((city) => ({
                    value: city.id,
                    label: city.name,
                }))}
                value={formik.values.cityId}
                onChange={(option) => formik.setFieldValue("cityId", option)}
                placeholder="Select City"
                isDisabled={formik.values.stateId.value === 0}
            />

            {/* Static Address Input */}
            <input
                type="text"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                placeholder="Enter Address"
            />
            {formik.errors.address && <div>{formik.errors.address}</div>}

            {/* Submit Button */}
            <button type="submit">Submit</button>
        </form>
    );
}

export default LocationForm;
