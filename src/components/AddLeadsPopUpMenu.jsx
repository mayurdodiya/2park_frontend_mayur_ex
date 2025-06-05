import { useState } from "react";
import style from "./../css/AddLeadsPopUpMenu.module.css";

// http://localhost:5003/api/v1/straper/vattenfall

export default function AddLeadsPopUpMenu({ isOpen, setIsOpen }) {
  const form = {
    benutzername: "", //Salutation
    name: "", //first name
    nachname: "", //last name
    firma: "", // company
    street: "", // address
    pLZ: "", //postal code
    location: "",
    telephon: "", //phone number
    email: "",
    notizen: "", //personal information
    comment: "",
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
          <h2>Add leads</h2>
          <hr className={style.hrTag} />

          {/* Content */}
          <form className={style.form} onSubmit={handleSubmit}>
            <div className={style.midDiv}>
              <span>
                <span>
                  Salutation
                  {<span style={{ color: errorData?.benutzername ? "red" : "inherit" }}>{errorData?.benutzername ? " *" : ""}</span>}
                </span>
                <input type="text" name="benutzername" value={formData.benutzername} onChange={handleInputChange} placeholder="Salutation" className={style.input} />
              </span>
              <span>
                <span>First name</span>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="First name" className={style.input} />
              </span>
              <span>
                <span>Last name</span>
                <input type="text" name="nachname" value={formData.nachname} onChange={handleInputChange} placeholder="Last name" className={style.input} />
              </span>
              <span>
                <span>
                  Company
                  {<span style={{ color: errorData?.firma ? "red" : "inherit" }}>{errorData?.firma ? " *" : ""}</span>}
                </span>
                <input type="email" name="firma" value={formData.firma} onChange={handleInputChange} placeholder="Company" className={style.input} />
              </span>
              <span>
                <span>
                  Address
                  {<span style={{ color: errorData?.street ? "red" : "inherit" }}>{errorData?.street ? " *" : ""}</span>}
                </span>
                <input type="text" name="street" value={formData.street} onChange={handleInputChange} placeholder="Address" className={style.input} />
              </span>
              <span>
                <span>Postal code</span>
                <input type="number" name="pLZ" value={formData.pLZ} onChange={handleInputChange} placeholder="Postal code" className={style.input} />
              </span>
              <span>
                <span>Location</span>
                <input type="text" name="location" value={formData.location} onChange={handleInputChange} placeholder="Location" className={style.input} />
              </span>

              <span>
                <span>Contact</span>
                <input type="text" name="telephon" value={formData.telephon} onChange={handleInputChange} placeholder="Contact" className={style.input} />
              </span>

              <span>
                <span>
                  Email
                  {<span style={{ color: errorData?.email ? "red" : "inherit" }}>{errorData?.email ? " *" : ""}</span>}
                </span>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" className={style.input} />
              </span>

              <span className={style.fullInputWidth}>
                <span>
                  important information
                  {<span style={{ color: errorData?.notizen ? "red" : "inherit" }}>{errorData?.notizen ? " *" : ""}</span>}
                </span>
                <input type="text" name="notizen" value={formData.notizen} onChange={handleInputChange} placeholder="important information" className={`${style.input} ${style.fullInput}`} />
              </span>

              <span className={style.fullInputWidth}>
                <span>
                  Comment
                  {<span style={{ color: errorData?.comment ? "red" : "inherit" }}>{errorData?.comment ? " *" : ""}</span>}
                </span>
                <input type="text" name="comment" value={formData.comment} onChange={handleInputChange} placeholder="Comment" className={`${style.input} ${style.fullInput}`} />
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
            <button type="submit" className={`${style.button} ${style.primary}`} onClick={()=> setIsOpen(false)}>
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
