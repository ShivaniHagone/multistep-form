import React, { useState } from "react";
import "./Form1.css";

function Form1() {
  const [data, setData] = useState({
    name: "",
    email: "",
    address: "",
    payment: "",
  });

  const statesWithCities = [
    {
      state: "Maharashtra",
      cities: ["Wardha", "Nashik", "Pune","Nagpur", "Aurangabad"],
    },
    {
      state: "karnataka",
      cities: ["Bangalore", "Mysore", "Bidar", "Bijapur"],
    },
    {
      state: "Gujarat",
      cities: ["Ahmedabad", "Surat", "Bhavnagar", "Jamnagar"]
    }
  ];

  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const [step, setStep] = useState(1);

  const [errors, setError] = useState({});

  const validStep = () => {
    const { name, email, address, payment } = data;
    
    let error = {};

    switch (step) {
      case 1:
        if (!name) {
          error.name = "Name is required";
        }
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
          error.email = "Valid email is required";
        }
        break;
      case 2:
        if (!address) {
          error.address = "Address is required";
        }
        if (!selectedState) {
          error.state = 'State is required';
        }
        if (!selectedCity) {
          error.city = 'City is required';
        }
        

        break;
      case 3:
        if (!payment) {
          error.payment = "Payment details are required";
        }
        break;
      default:
        break;
    }

    setError(error);
    return Object.keys(error).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    console.log(state);
    setSelectedCity("");
  };

  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
  };

  const handleNext = () => {
    if (validStep()) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    if (validStep()) {
      console.log("Form submitted:", data);
      setStep(step + 1);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <label>Name :</label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              className="input"
            />
            <p>{errors.name}</p>

            <label>Email :</label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              className="input"
            />
            <p>{errors.email}</p>
          </div>
        );
      case 2:
        return (
          <div>
            <label>Address :</label>
            <input
              type="text"
              name="address"
              value={data.address}
              onChange={handleChange}
              className="input"
            />
            <p>{errors.address}</p>

            <label>State : </label>
            <select
              name="state"
              value={selectedState}
              onChange={handleStateChange}
              className="select"
            >
              <option>Select State</option>
              {statesWithCities.map((stateObj) => (
                <option>{stateObj.state}</option>
              ))}
            </select><br></br>
            <p>{errors.state}</p>

            <label>City  :</label>
            <select
              name="city"
              value={selectedCity}
              onChange={handleCityChange}
              className="select"
            >
              <option>Select City</option>
              {selectedState &&
                statesWithCities
                  .find((stateObj) => stateObj.state === selectedState)
                  ?.cities.map((city) => (<option>{city}</option>))}
            </select>
            <p>{errors.city}</p>
          </div>
        );
      case 3:
        return (
          <div>
            <label>Payment details:</label>
            <input
              type="text"
              name="payment"
              value={data.payment}
              onChange={handleChange}
              className="input"
            />
            <p>{errors.payment}</p>
          </div>
        );
      case 4:
        return (
          <div>
            <h2>Summary</h2>
            <p>Name: {data.name}</p>
            <p>Email: {data.email}</p>
            <p>Address: {data.address}</p>
            <p>State: {selectedState}</p>
            <p>City: {selectedCity}</p>
            <p>Payment details: {data.payment}</p>
          </div>
        );

      case 5:
        return (
          <div>
            <h4 className="h4">You have Successfully submitted the form.</h4>
            <h4 className="h4">Thank You!</h4>
          </div>
        );
    }
  };

  return (
    <>
      <div>
        <fieldset className="fieldset">
          <form className="form">
            <div className="form-block">
              {renderStep()}
              <button
                type="button"
                onClick={handlePrev}
                disabled={step === 1}
                hidden={step === 5}
                className="button"
              >
                Previous
              </button>
              {step < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  hidden={step === 5}
                  className="button"
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  hidden={step === 5}
                  className="button"
                >
                  Submit
                </button>
              )}
            </div>
          </form>
        </fieldset>
      </div>
    </>
  );
}

export default Form1;
