import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckoutStyled, NavlinkHome } from "./CheckoutStyled";
import { Asidecards } from "./Aside/Asidecards";
import Addressform from "./Step1/Addressform";
import Step2 from "./Step2/Step2";
import PayPalCheckout from "./PayPalCheckout/PayPalCheckout";
import { IoIosArrowBack } from "react-icons/io";
import { BsCheck } from "react-icons/bs";

import axios from "axios";
import Success from "./Step4/Success.jsx";
import swal from "sweetalert";

const apiUrl = process.env.REACT_APP_BACKEND;

const instance = axios.create();

instance.interceptors.request.use(
  (config) => {
    const { origin } = new URL(config.url);
    const allowedOrigins = [apiUrl];
    const token = localStorage.getItem("jwt");

    if (allowedOrigins.includes(origin)) {
      config.headers.authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

function Checkout() {
  const search = useLocation().search;
  const shippingAmount = new URLSearchParams(search).get("shipping");
  const cart = useSelector((store) => store.cart);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    id: "",
    email: "",
  });

  const [formData, setFormData] = useState({
    fullname: "",
    address: "",
    addresscontinue: "",
    city: "",
    country: "",
    postalcode: "",
    email: "",
  });

  const getUser = async () => {
    try {
      const { data } = await instance.get(`${apiUrl}/users/login/myid`);
      setUserData(data);
      setFormData({ ...formData, email: data.email });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      getUser();
    } else {
      swal({
        title: `Please login to continue`,
        icon: "info",
        button: "Accept",
      }).then((res) => navigate("/login"));
    }
    //eslint-disable-next-line
  }, []);

  const validate = () => {
    let validate = false;

    if (
      formData.fullname.length > 0 &&
      formData.address.length > 0 &&
      formData.addresscontinue.length > 0 &&
      formData.city.length > 0 &&
      formData.country.length > 0 &&
      formData.postalcode.length > 0 &&
      formData.email.length > 0
    ) {
      validate = true;
    }
    return validate;
  };

  const result = validate();

  return (
    <CheckoutStyled>
      <div className="header-container">
        <NavlinkHome to="/">
          <IoIosArrowBack />
          <span>e-kommerce</span>
        </NavlinkHome>
      </div>
      {step !== 4 ? (
        <div className="main-container">
          <div className="app-container">
            <div className="steps">
              <div
                className={`step ${
                  step === 2 || step === 3 || step === 4 ? "active" : ""
                }`}
                onClick={() => setStep(1)}
              >
                {step === 2 || step === 3 || step === 4 ? (
                  <BsCheck className="check" />
                ) : (
                  "1"
                )}
              </div>
              <div
                className={`step ${step === 3 ? "active" : ""}`}
                onClick={result ? () => setStep(2) : null}
              >
                {step === 3 ? <BsCheck className="check" /> : "2"}
              </div>
              <div className="step" onClick={result ? () => setStep(3) : null}>
                {step === 4 ? <BsCheck className="check" /> : "3"}
              </div>
            </div>
            {step === 1 ? (
              <Addressform
                setFormData={setFormData}
                formData={formData}
                setStep={setStep}
              />
            ) : step === 2 ? (
              <Step2 formData={formData} setStep={setStep} />
            ) : (
              <PayPalCheckout
                cart={cart}
                formData={formData}
                shippingAmount={shippingAmount}
                setStep={setStep}
                userData={userData}
              />
            )}
          </div>
          <Asidecards cart={cart} shippingAmount={shippingAmount} />
        </div>
      ) : (
        <Success></Success>
      )}
    </CheckoutStyled>
  );
}

export default Checkout;
