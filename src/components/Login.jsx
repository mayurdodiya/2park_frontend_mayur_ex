import { useEffect, useState } from "react";
import style from "./../css/Login.module.css";
import twoParkLogo from "./../images/2park.svg";
import { useNavigate } from "react-router-dom";
import BaseUrl from "../config/apiConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Protected } from "./ProtectedRoute";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorData, setErrorata] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  let isValid = true;

  const validation = (formData) => {
    if (!formData.email) {
      isValid = false;
      setErrorata((prev) => ({ ...prev, email: "Email is required!" }));
      console.log("Email is required!");
    }
    if (!formData.password) {
      isValid = false;
      setErrorata((prev) => ({ ...prev, password: "Password is required!" }));
      console.log("Password is required!");
    }
    return errorData;
  };

  async function HandleSubmit(formData) {
    setLoading(true);
    try {
      let response = await fetch(`${BaseUrl}/user/adminSignin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": true,
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      response = await response.json();
      if (response?.success) {
        setLoading(false);
        toast.success(response?.messages, {
          onClose: () => {
            navigate("/verifyOtp", { state: { email: formData.email } });
          },
          autoClose: 1500,
        });
      } else {
        toast.error(response?.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
     <Protected />
      <ToastContainer />
      <div className={style.mainDiv}>
        <img className={style.img} src={twoParkLogo} alt="logo" />
        <form
          className={style.loginForm}
          onSubmit={(e) => {
            e.preventDefault();
            validation(formData);
            if (!isValid) return;
            HandleSubmit(formData);
          }}
        >
          <h2 className={[style.fontSize, style.fontWight].join(" ")}>
            Register
          </h2>
          <p className={style.text}>2Park</p>
          <br />
          <br />
          <p className={style.errorLog}>{errorData?.email ?? ""}</p>
          <input
            className={style.input}
            type="email"
            placeholder="E-mail"
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, email: e.target.value }));
              setErrorata((prev) => ({ ...prev, email: "" }));
            }}
          />
          <p className={style.errorLog}>{errorData?.password}</p>
          <input
            className={style.input}
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, password: e.target.value }));
              setErrorata((prev) => ({ ...prev, password: "" }));
            }}
          />
          <br />
          <br />
          <button className={style.loginBtn} type="submit" disabled={loading}>
            {loading ? "Please wait..." : "Login"}
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
