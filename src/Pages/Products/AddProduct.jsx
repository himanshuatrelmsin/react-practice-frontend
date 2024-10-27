import { useState } from "react";
import RegisterForm from '../../components/AuthComponents/RegisterForm';
import Input from "../../components/Input";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import "./Product.scss";
import AddLocation from "../../components/FormComponents/AddLocation";

const AddProduct = () => {
  const [countryId, setCountryId] = useState(null); // initialize as null instead of 0
  const [stateId, setStateId] = useState(null); // initialize as null
  const [formData, setFormData] = useState({
    title: "",
    image: null,
    location: "",
    showroomPrice: 0,
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  return (
    <>
      <section className='py-10 authDesign'>
        <div className='container mx-auto'>
          <div className='overlay' style={{ background: "linear-gradient(45deg, black, transparent)" }}>
            <div className='row my-0 mx-auto p-5'>
              <AddLocation />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddProduct;
