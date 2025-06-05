import { useState } from "react";
import style from "./../css/SheetUploadPopUpMenu.module.css";
import { faClose, faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SheetUploadPopUpMenu({ isOpen, setIsOpen }) {
  const form = {
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    projectName: "",
    monthlyGoal: "",
    birthday: "",
    iban: "",
    phone: "",
    street: "",
    creditInstitution: "",
    postalCode: "",
    location: "",
    profilePicture: null,
    accountHolder: "",
    signature: null,
    taxNumber: "",
    gender: "",
    twoParkSales: false,
    twoParkSalesPartner: false,
  };
  const [errorData, setErrorData] = useState({});
  const [formData, setFormData] = useState(form);

  // Handle input changes for text, number, select, and file inputs
  // const handleInputChange = (e) => {
  //   const { name, value, type, checked, files } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
  //   }));
  // };

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
  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const errors = validation(formData);
  //   setErrorData(errors);

  //   // validate error
  //   if (Object.keys(errors).length > 0) {
  //     console.log("Form validation errors:", errors);
  //     return;
  //   }

  //   console.log("Form Data Submitted:", formData); // Log form data for now
  //   setIsOpen(false); // Close the modal after submission
  //   setFormData(form);
  // };

  if (!isOpen) return null;
  return (
    <>
      <div className={style.backdrop}>
        <div className={style.modal}>
          {/* Header */}
          <div className={style.titleWrapper}>
            <h2>Upload sheet</h2>
            <FontAwesomeIcon icon={faClose} className={style.closedIcon} onClick={()=> setIsOpen(false)} />
          </div>
          <hr className={style.hrTag} />

          {/* Content */}
          <div className={style.contentWrapper}>
            <div className={style.firstContent}>No sheet uploaded</div>
            <div className={style.secondContent}>
              <FontAwesomeIcon icon={faArrowUpFromBracket} className={`${style.closedIcon} ${style.uploadIcon}`} />
              <h2>Upload sheet</h2>
            </div>
          </div>
          <hr className={style.hrTag} />

          {/* Footer */}
          <div>
            <button className={style.saveButton} onClick={()=> setIsOpen(false)}>Save</button>
          </div>
        </div>
      </div>
    </>
  );
}

// return (
//   <>
//     <div className={style.backdrop}>
//       <div className={style.modal}>
//         <h2>Add Sales Partner</h2>
//         <form className={style.form} onSubmit={handleSubmit}>
//           <div className={style.midDiv}>
//             <span>
//               <span>
//                 User name
//                 {<span style={{ color: errorData?.username ? "red" : "inherit" }}>{errorData?.username ? " *" : ""}</span>}
//               </span>
//               <input type="text" name="username" value={formData.username} onChange={handleInputChange} placeholder="Username" className={style.input} />
//             </span>
//             <span>
//               <span>First name</span>
//               <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="First name" className={style.input} />
//             </span>
//             <span>
//               <span>Last name</span>
//               <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last name" className={style.input} />
//             </span>
//             <span>
//               <span>
//                 Email
//                 {<span style={{ color: errorData?.email ? "red" : "inherit" }}>{errorData?.email ? " *" : ""}</span>}
//               </span>
//               <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" className={style.input} />
//             </span>
//             <span>
//               <span>
//                 Password
//                 {<span style={{ color: errorData?.password ? "red" : "inherit" }}>{errorData?.password ? " *" : ""}</span>}
//               </span>
//               <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="Password" className={style.input} />
//             </span>
//             <span>
//               <span>
//                 Project Name
//                 {<span style={{ color: errorData?.projectName ? "red" : "inherit" }}>{errorData?.projectName ? " *" : ""}</span>}
//               </span>
//               <select name="projectName" value={formData.projectName} onChange={handleInputChange} className={style.input}>
//                 <option value="" disabled>
//                   Select a project
//                 </option>
//                 <option value="2Park External">2Park External</option>
//                 <option value="2Park Internal">2Park Internal</option>
//               </select>
//             </span>
//             <span>
//               <span>Monthly Goal</span>
//               <input type="number" name="monthlyGoal" value={formData.monthlyGoal} onChange={handleInputChange} placeholder="Monthly Goal" className={style.input} />
//             </span>
//             <span>
//               <span>Birthday</span>
//               <input type="date" name="birthday" value={formData.birthday} onChange={handleInputChange} placeholder="Birthday" className={style.input} />
//             </span>
//             <span>
//               <span>IBAN</span>
//               <input type="text" name="iban" value={formData.iban} onChange={handleInputChange} placeholder="IBAN" className={style.input} />
//             </span>
//             <span>
//               <span>Phone</span>
//               <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} pattern="[0-9]{10}" placeholder="Phone" className={style.input} />
//             </span>
//             <span>
//               <span>Street and house number</span>
//               <input type="text" name="street" value={formData.street} onChange={handleInputChange} placeholder="Street and house number" className={style.input} />
//             </span>
//             <span>
//               <span>Credit institution</span>
//               <input type="text" name="creditInstitution" value={formData.creditInstitution} onChange={handleInputChange} placeholder="Credit institution" className={style.input} />
//             </span>
//             <span>
//               <span>Postal code</span>
//               <input type="number" name="postalCode" value={formData.postalCode} onChange={handleInputChange} placeholder="Postal code" className={style.input} />
//             </span>
//             <span>
//               <span>Location</span>
//               <input type="text" name="location" value={formData.location} onChange={handleInputChange} placeholder="Location" className={style.input} />
//             </span>
//             <span>
//               <span>Profile picture</span>
//               <input type="file" name="profilePicture" onChange={handleInputChange} className={style.input} />
//             </span>
//             <span>
//               <span>Account holder</span>
//               <input type="text" name="accountHolder" value={formData.accountHolder} onChange={handleInputChange} placeholder="Account holder" className={style.input} />
//             </span>
//             <span>
//               <span>Signature</span>
//               <input type="file" name="signature" onChange={handleInputChange} className={style.input} />
//             </span>
//             <span>
//               <span>Tax number</span>
//               <input type="text" name="taxNumber" value={formData.taxNumber} onChange={handleInputChange} placeholder="Tax number" className={style.input} />
//             </span>
//             <span>
//               <span>Gender</span>
//               <label className={style.genderLabel}>
//                 <input type="radio" name="gender" value="male" checked={formData.gender === "male"} onChange={handleInputChange} />
//                 Male
//               </label>
//               <label className={style.genderLabel}>
//                 <input type="radio" name="gender" value="female" checked={formData.gender === "female"} onChange={handleInputChange} />
//                 Female
//               </label>
//             </span>
//             <span>
//               <span>2Park Sales</span>
//               <input type="checkbox" name="twoParkSales" checked={formData.twoParkSales} onChange={handleInputChange} className={style.parkSalesInput} />
//             </span>
//             <span>
//               <span>2Park Sales Partner</span>
//               <input type="checkbox" name="twoParkSalesPartner" checked={formData.twoParkSalesPartner} onChange={handleInputChange} className={style.parkSalesInput} />
//             </span>
//           </div>

//           {/* Footer */}
//           <div className={style.footer}>
//             <button
//               type="button"
//               onClick={() => {
//                 setIsOpen(false);
//                 setErrorData({});
//                 setFormData(form);
//               }}
//               className={style.button}
//             >
//               Cancel
//             </button>
//             <button type="submit" className={`${style.button} ${style.primary}`}>
//               Save
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   </>
// );
