import { useState } from "react";
import style from "./../css/PopupMenu.module.css";

export default function AddParkingApacePopUpMenu({ isOpen, setIsOpen }) {
  const form = {
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    twoParkSales: false,
    twoParkSalesPartner: false,
  };
  const [errorData, setErrorData] = useState({});
  const [formData, setFormData] = useState(form);

  // Handle input changes for text, number, select, and file inputs
  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  // handle error
  const validation = (data) => {
    const error = {};
    if (!data.username) error.username = "User name is required!";
    if (!data.email) error.email = "Email is required!";
    if (!data.password) error.password = "Password is required!";
    if (!data.projectName) error.projectName = "Project name is required!";
    return error;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validation(formData);
    setErrorData(errors);

    // validate error
    if (Object.keys(errors).length > 0) {
      console.log("Form validation errors:", errors);
      return;
    }

    console.log("Form Data Submitted:", formData); // Log form data for now
    setIsOpen(false); // Close the modal after submission
    setFormData(form);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className={style.backdrop}>
        <div className={style.modal}>
          <h2>Add parking space owner</h2>
          <form onSubmit={handleSubmit}>

            {/* main content */}
            <div className={`${style.midDiv} ${style.main_content}`}>
              <span>
                <span>
                  User name
                  {<span style={{ color: errorData?.username ? "red" : "inherit" }}>{errorData?.username ? " *" : ""}</span>}
                </span>
                <input type="text" name="username" value={formData.username} onChange={handleInputChange} placeholder="Username" className={style.input} />
              </span>
              <span>
                <span>First name</span>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="First name" className={style.input} />
              </span>
              <span>
                <span>Last name</span>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last name" className={style.input} />
              </span>
              <span>
                <span>
                  Email
                  {<span style={{ color: errorData?.email ? "red" : "inherit" }}>{errorData?.email ? " *" : ""}</span>}
                </span>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" className={style.input} />
              </span>
              <span>
                <span>
                  Password
                  {<span style={{ color: errorData?.password ? "red" : "inherit" }}>{errorData?.password ? " *" : ""}</span>}
                </span>
                <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="Password" className={style.input} />
              </span>
              <span>
                <span>Phone</span>
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} pattern="[0-9]{10}" placeholder="Phone" className={style.input} />
              </span>
        
              <span>
                <span>2Park Sales</span>
                <input type="checkbox" name="twoParkSales" checked={formData.twoParkSales} onChange={handleInputChange} className={style.parkSalesInput} />
              </span>
              <span>
                <span>2Park Sales Partner</span>
                <input type="checkbox" name="twoParkSalesPartner" checked={formData.twoParkSalesPartner} onChange={handleInputChange} className={style.parkSalesInput} />
              </span>
            </div>

          </form>
            {/* Footer */}
            <div className={style.footer}>
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setErrorData({});
                  setFormData(form);
                }}
                className={style.button}
              >
                Cancel
              </button>
              <button type="submit" className={`${style.button} ${style.primary}`}>
                Save
              </button>
            </div>
        </div>
      </div>
    </>
  );
}
