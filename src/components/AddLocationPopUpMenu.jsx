import { useState } from "react";
import style from "./../css/AddLocationPopUpMenu.module.css";
import { dayData, dayTime } from "../dummyData/dayData";

// http://localhost:5003/api/v1/straper/vattenfall

export default function AddLocationPopUpMenu({ isOpen, setIsOpen }) {
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
  const [daySelect, setDaySelection] = useState({
    Monday: true,
    Tuesday: true,
    Wednesday: true,
    Thursday: true,
    Friday: true,
    Saturday: true,
    Sunday: false,
  });

  // Handle input changes for text, number, select, and file inputs
  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
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

  // poup data
  const startTime = () => {
    return (
      <select className={style.dropDown}>
        {dayTime.map((data) => {
          return <option value={data}>{data}</option>;
        })}
      </select>
    );
  };

  if (!isOpen) return null;

  return (
    <>
      <div className={style.backdrop}>
        <div className={style.modal}>
          <h2>Add location</h2>
          <hr className={style.hrTag} />

          {/* Content */}
          <form className={style.form} onSubmit={handleSubmit}>
            <div className={style.firstDiv}>
            {/* left side div */}
            <div className={style.leftDiv}>
              <span>
                <span>
                  Parking space name
                  {
                    <span
                      style={{
                        color: errorData?.benutzername ? "red" : "inherit",
                      }}
                    >
                      {errorData?.benutzername ? " *" : ""}
                    </span>
                  }
                </span>
                <input
                  type="text"
                  name="benutzername"
                  value={formData.benutzername}
                  onChange={handleInputChange}
                  placeholder="Parking space name"
                  className={style.input}
                />
              </span>

              <span>
                <span>
                  Number of shelves
                  {
                    <span
                      style={{
                        color: errorData?.benutzername ? "red" : "inherit",
                      }}
                    >
                      {errorData?.benutzername ? " *" : ""}
                    </span>
                  }
                </span>
                <input
                  type="text"
                  name="benutzername"
                  value={formData.benutzername}
                  onChange={handleInputChange}
                  placeholder="Number of shelves"
                  className={style.input}
                />
              </span>

              <span>
                <span>
                  Parking PIN
                  {
                    <span
                      style={{
                        color: errorData?.benutzername ? "red" : "inherit",
                      }}
                    >
                      {errorData?.benutzername ? " *" : ""}
                    </span>
                  }
                </span>
                <input
                  type="text"
                  name="benutzername"
                  value={formData.benutzername}
                  onChange={handleInputChange}
                  placeholder="Parking PIN"
                  className={style.input}
                />
              </span>

              <span>
                <span>
                  Daily bus rate
                  {
                    <span
                      style={{
                        color: errorData?.benutzername ? "red" : "inherit",
                      }}
                    >
                      {errorData?.benutzername ? " *" : ""}
                    </span>
                  }
                </span>
                <input
                  type="text"
                  name="benutzername"
                  value={formData.benutzername}
                  onChange={handleInputChange}
                  placeholder="Daily bus rate"
                  className={style.input}
                />
              </span>

              <span>
                <span>
                  Duration of activations
                  {
                    <span
                      style={{
                        color: errorData?.benutzername ? "red" : "inherit",
                      }}
                    >
                      {errorData?.benutzername ? " *" : ""}
                    </span>
                  }
                </span>
                <input
                  type="text"
                  name="benutzername"
                  value={formData.benutzername}
                  onChange={handleInputChange}
                  placeholder="Duration of activations"
                  className={style.input}
                />
              </span>

              <span>
                <span>
                  Maximum parking time during business hours
                  {
                    <span
                      style={{
                        color: errorData?.benutzername ? "red" : "inherit",
                      }}
                    >
                      {errorData?.benutzername ? " *" : ""}
                    </span>
                  }
                </span>
                <input
                  type="text"
                  name="benutzername"
                  value={formData.benutzername}
                  onChange={handleInputChange}
                  placeholder="Maximum parking time during business hours (in minutes)"
                  className={style.input}
                />
              </span>

              <span>
                <span>
                  Maximum parking time outside business hours
                  {
                    <span
                      style={{
                        color: errorData?.benutzername ? "red" : "inherit",
                      }}
                    >
                      {errorData?.benutzername ? " *" : ""}
                    </span>
                  }
                </span>
                <input
                  type="text"
                  name="benutzername"
                  value={formData.benutzername}
                  onChange={handleInputChange}
                  placeholder="Maximum parking time outside business hours (in minutes)"
                  className={style.input}
                />
              </span>
            </div>

            {/* right side div */}
            <div className={style.rightDiv}>
              <h5 className={style.bussinessTitle}>Business hours</h5>
              {/* start, End header */}
              <div className={style.dayDataWrapper}>
                <span></span>
                <span>Start</span>
                <span>End</span>
              </div>
              {/* all days content */}
              {dayData.map((data) => {
                return (
                  <div className={style.dayDataWrapper}>
                    <span>
                      <input
                        type="checkbox"
                        checked={daySelect[data]}
                        onClick={() =>
                          setDaySelection((prev) => ({
                            ...prev,
                            [data]: !prev[data],
                          }))
                        }
                      />
                      {data}
                    </span>
                    <span className={style.dateSelection}>
                      <span
                        className={
                          daySelect[data] === false ? style.textRed : ""
                        }
                      >
                        {daySelect[data] === true ? startTime() : "Rest day"}
                      </span>
                      {daySelect[data] != false ? "-" : ""}
                      <span>
                        {daySelect[data] === true ? startTime() : " "}
                      </span>
                    </span>
                  </div>
                );
              })}
            </div>
            </div>

            {/* <div className={style.secondDiv}>adwodnw</div> */}
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
            <button
              type="submit"
              className={`${style.button} ${style.primary}`}
              onClick={() => setIsOpen(false)}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
