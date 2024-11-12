import { Formik, useFormik } from "formik";
import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import Typography from "../components/Typography";
import Input from "../components/Input/Input";
import Button from "../components/Button";
import * as Yup from "yup";
import { UserContext } from "../UserContext";
import axios from "axios";
import { VITE_BACKEND_URL, VITE_UPLOADS_URL } from "../../env";
import UploadIcon from "../assets/images/upload.svg";
import { useNavigate } from "react-router-dom";
import { Country, State, City } from 'country-state-city';
import "./profile.scss";

// Validation schema for the profile form
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  number: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be exactly 10 digits")
    .max(10, "Must be exactly 10 digits")
    .required("Mobile Number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  sponserID: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be exactly 10 digits")
    .max(10, "Must be exactly 10 digits"),
  referID: Yup.string().required("Refer ID is required"),
  country: Yup.string().required('Country is required'),
  state: Yup.string().required('State is required'),
  city: Yup.string().required('City is required'),
  address: Yup.string(),
  newPassword: Yup.string().min(
    8,
    "Password must be at least 6 characters long"
  ),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("newPassword"), null],
    "Passwords must match"
  ),
  profilePicture: Yup.mixed(),

});

function Profile() {
  const { userProfile, setUserProfile, user, setUser } =
    useContext(UserContext);
  const [isEditMode, setIsEditMode] = useState(false);
  const [userProfileImage, setUserProfileImage] = useState("");

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const { values, handleChange, setFieldValue, touched, errors, handleSubmit, isSubmitting, resetForm, isValid, dirty } = useFormik({
    initialValues: {
      name: user?.name || '',
      number: user?.number || '',
      email: user?.email || '',
      country: '',
      state: '',
      city: '',
      address: '',
      profilePicture: '',
    },
    validationSchema,
    
    onSubmit: async (values) => {
      alert()
      console.log(values)
      try {
        const response = await axios.post(
          `${VITE_BACKEND_URL}api_user/updateProfile`,
          values
        );
        if (response.status === 200) {
          setSuccessMessage("profile updated successful!");
          setIsFormSubmitted(true);         
        } else {
          console.error("Error submitting form data:", response.data);
        }
      } catch (error) {
        console.error("Error submitting form data:", error);
      }
    },
    
  });

  useEffect(() => {
    const countries = Country.getAllCountries();
    setCountryList(countries);
  }, []);
  
  useEffect(() => {
    if (selectedCountry) {
      const states = State.getStatesOfCountry(selectedCountry);
      setStateList(states);
      setSelectedState(''); 
      setSelectedCity(''); 
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      const cities = City.getCitiesOfState(selectedCountry, selectedState);
      setCityList(cities);
      setSelectedCity('');
    }
  }, [selectedState, selectedCountry]);

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const toggleEditMode = (resetForm) => {
    if (isEditMode) {
      resetForm({
        values: {
          name: user?.name || '',
          number: user?.number || '',
          email: user?.email || '',
          state: '',
          city: '',
          country: '',
          address: '',
          profilePicture: '',
        }
      });
    }
    setIsEditMode((prev) => !prev);
  };

  useEffect(() => {
    if (isFormSubmitted) {
      setUserProfile({ ...userProfile, profilePicture: userProfileImage });
    }
  }, [isFormSubmitted]);

  const uploadProfilePic = useCallback(async (event, setFieldValue) => {
    if (event.currentTarget.files[0]) {
      
      const file = event.currentTarget.files[0];
      const formData = new FormData();
      formData.append("profilePicture", file);

      const response = await axios.post(
        `${VITE_BACKEND_URL}api_upload/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setFieldValue("profilePicture", response.data.filePath);
      setUserProfileImage(response.data.filePath);
      
    }
  }, []);

  useEffect(() => {
    if (values.profilePicture) {
      setUserProfileImage(values.profilePicture);
    }
  }, [values.profilePicture]);

  return (
    <div className="mt-[100px]">
      <div className="md:container mt-6 mx-auto">
        <div className="flex justify-center items-center flex-wrap gap-4 mb-4">
          <Typography
            tag="h1"
            size="text-2xl"
            weight="font-semibold"
            color="text-base-content"
            className="text-center"
          >
            Profile
          </Typography>
        </div>

        <form onSubmit={handleSubmit}>
          
            <div className="mx-auto md:w-[800px] pb-8">
              
                <div className="grid grid-cols-1 xl:grid-cols-1 border-profile p-6 radius-5 gap-y-2 mt-5">
                  {/* Name Input */}
                  <div className="relative">
                    <label className="block pb-1 font-bold text-base text-black">
                      Full Name
                    </label>
                    <Input
                      type="text"
                      id="name"
                      label="Name"
                      placeholder={user.name || "Enter your name"}
                      value={values.name || user.name}
                      onChange={handleChange}
                      error={touched.name && errors.name}
                      readOnly
                    />
                  </div>
                  {/* Phone Number Input */}
                  <div className="relative">
                    <label className="block pb-1 font-bold text-base text-black">
                      Phone Number
                    </label>
                    <Input
                      type="text"
                      id="number"
                      label="Mobile Number"
                      placeholder={user.number || "Enter your mobile number"}
                      value={values.number || user.number}
                      onChange={handleChange}
                      error={touched.number && errors.number}
                      readOnly
                    />
                  </div>
                  {/* Email Input */}
                  <div className="relative">
                    <label className="block pb-1 font-bold text-base text-black">
                      Email
                    </label>
                    <Input
                      type="email"
                      id="email"
                      label="Email"
                      placeholder={user.email || "Enter your email"}
                      value={values.email || user.email}
                      onChange={handleChange}
                      
                      error={touched.email && errors.email}
                      readOnly
                    />
                  </div>
                  {/* Sponsor ID Input */}
                  <div className="relative">
                    <label className="block pb-1 font-bold text-base text-black">
                      Sponser ID
                    </label>
                    <Input
                      type="text"
                      id="sponserID"
                      label="Sponser ID"
                      placeholder={user.sponserID || "Enter your sponser ID"}
                      value={values.sponserID || user.sponserID}
                      onChange={handleChange}
                      
                      error={touched.sponserID && errors.sponserID}
                      readOnly
                    />
                  </div>
                  {/* Refer ID Input */}
                  <div className="relative">
                    <label className="block pb-1 font-bold text-base text-black">
                      Refer ID
                    </label>
                    <Input
                      type="text"
                      id="referID"
                      label="Refer ID"
                      placeholder={user.referID || "Enter your refer ID"}
                      value={values.referID || user.referID}
                      onChange={handleChange}
                      
                      error={touched.referID && errors.referID}
                      readOnly
                    />
                  </div>
                  <div className="relative">
                    <label className="block pb-1 font-bold text-base text-black">Country</label>
                    <select
                      id="country"
                      value={selectedCountry}
                      onChange={handleCountryChange}
                      readOnly={!isEditMode}
                    >
                      <option value="">Select a country</option>
                      {countryList.map((country) => (
                        <option key={country.isoCode} value={country.isoCode}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {selectedCountry && (
                      <div className="relative">
                        <label className="block pb-1 font-bold text-base text-black">State</label>
                        <select
                          id="state"
                          value={selectedState}
                          onChange={handleStateChange}
                          readOnly={!isEditMode}
                        >
                          <option value="">Select a state</option>
                          {stateList.map((state) => (
                            <option key={state.isoCode} value={state.isoCode}>
                              {state.name}
                            </option>
                          ))}
                        </select>
                      </div>
                  )}
                  {selectedState && (
                  <div className="relative">
                    <label className="block pb-1 font-bold text-base text-black">City</label>
                    <select
                      id="city"
                      value={selectedCity}
                      onChange={handleCityChange}
                      readOnly={!isEditMode}
                    >
                      <option value="">Select a city</option>
                      {cityList.map((city) => (
                        <option key={city.id} value={city.id}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  )}
                  {/* Address Input */}
                  <div className="relative">
                    <label className="block pb-1 font-bold text-base text-black">
                      Address
                    </label>
                    <Input
                      type="text"
                      id="address"
                      label="Address"
                      placeholder={user.address || "Enter your address"}
                      value={values.address || user.address}
                      onChange={handleChange}
                      
                      error={touched.address && errors.address}
                      readOnly={!isEditMode}
                    />
                  </div>

                  {/* New Password Input */}
                  <div className="relative">
                    <label className="block pb-1 font-bold text-base text-black">
                      New Password
                    </label>
                    <Input
                      type="password"
                      id="newPassword"
                      label="New Password"
                      placeholder="Enter your new password"
                      value={values.newPassword}
                      onChange={handleChange}
                      
                      error={touched.newPassword && errors.newPassword}
                      readOnly={!isEditMode}
                    />
                  </div>
                  {/* Confirm Password Input */}
                  <div className="relative">
                    <label className="block pb-1 font-bold text-base text-black">
                      Confirm Password
                    </label>
                    <Input
                      type="password"
                      id="confirmPassword"
                      label="Confirm Password"
                      placeholder="Confirm your new password"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      
                      error={touched.confirmPassword && errors.confirmPassword}
                      readOnly={!isEditMode}
                    />
                  </div>

                  {/* Profile Picture Upload */}
                  <div className="relative">
                    <label className="block pb-1 font-bold text-base text-black">
                      Profile Picture
                    </label>
                    <div className="fileInput custom-file-input">
                      <span className="upload-icons border-gray-300">
                        <img
                          src={UploadIcon}
                          alt="Upload"
                          className="img-fluid w-[40px]"
                        />
                      </span>
                      <input
                        className="inputFileProfile"
                        type="file"
                        id="profilePicture"
                        onChange={(event) =>
                          uploadProfilePic(event, setFieldValue)
                        }
                        readOnly={!isEditMode}
                      />
                      <div className="fileInputName my-2">
                        <p className="text-sm">
                          {values.profilePicture
                            ? `${VITE_UPLOADS_URL}profile/${userProfileImage}`
                            : "Upload Your Profile Picture"}
                        </p>
                      </div>
                    </div>
                    <div className="profile-img-box">
                      {userProfileImage && (
                        <img
                          src={`${VITE_UPLOADS_URL}profile/${userProfileImage}`}
                          alt="Profile Preview"
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex gap-4">
                  <Button
                    className={`${isEditMode
                        ? "btn-base-300 bg-red-600 hover:bg-red-600 text-white"
                        : "btn-primary"
                      } btn-sm px-5 min-w-[150px]`}
                    onClick={() => toggleEditMode(resetForm)}
                  >
                    {isEditMode ? "Cancel" : "Edit"}
                  </Button>
                  {isEditMode && (
                    <Button
                      type="submit"
                      className="btn-primary btn-sm px-5 min-w-[150px]"
                      disabled={isSubmitting }
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </Button>
                  )}
                </div>
              
            </div>
          
        </form>
      </div>
    </div>
  );
}

export default Profile;
