import style from "./../css/VerifyOtp.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import twoParkLogo from "./../images/2park.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import BaseUrl from "../config/apiConfig";

function VerifyOtp() {
  const [formData, setFormData] = useState({ otp: "" });
  const [errorData, setErrorata] = useState({ otp: "" });
  const location = useLocation();
  const navigate = useNavigate();
  let isValid = true;

  const validation = (formData) => {
    if (!formData.otp) {
      isValid = false;
      setErrorata((prev) => ({ ...prev, otp: "Otp is required!" }));
      console.log("Otp is required!");
    }
    return errorData;
  };

  async function HandleSubmit(formData) {
    // setLoading(true);
    console.log(location?.state?.email, "------------- location");
    try {
      let response = await fetch(`${BaseUrl}/user/verifyOtp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: location?.state?.email,
          otp: formData?.otp,
        }),
      });

      response = await response.json();
      console.log(response, "response-------------------------");
      if (response?.success) {
        // setLoading(false);
        toast.success(response?.messages, {
          onClose: () => {
            localStorage.setItem('token', response?.payload?.token)
            navigate("/dashboard/dashboard-data");
          },
          autoClose: 1500,
        });
      } else {
        toast.error(response?.message);
        // setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <ToastContainer />
      <div className={style.mainDiv}>
        <div className={style.container}>
          <img className={style.img} src={twoParkLogo} alt="logo" />
          <br />
          <br />
          <p className={style.factor}>Two Factor Authentication</p>
          <p className={style.enterOtp}>Enter your OTP Sent to Email</p>
          <br />
          <br />
          <p className={style.errorLog}>{errorData?.otp ?? ""}</p>
          <input
            className={style.input}
            type="text"
            placeholder="OTP"
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, otp: e.target.value }));
              setErrorata((prev) => ({ ...prev, otp: "" }));
            }}
          />
          <br />
          <button
            className={style.loginBtn}
            type="submit"
            /* disabled={loading} */ onClick={() => {
              validation(formData);
              if (!isValid) return;
              HandleSubmit(formData);
            }}
          >
            Verify Otp
          </button>
          <br />
          <Link className={style.link} to="/login">
            Want to go back?
          </Link>
        </div>
      </div>
    </>
  );
}

export default VerifyOtp;
