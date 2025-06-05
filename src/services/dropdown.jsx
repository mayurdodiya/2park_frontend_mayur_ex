import React, { useState } from "react";
import Select from "react-select";

const customStyles = {
  control: (provided) => ({
    ...provided,
    border: "1px solid rgb(202, 204, 202)",
    borderRadius: "6px",
    boxShadow: "none",
    minHeight: "38px",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#777  ",
  }),
};

const StatusDropdown = ({ data, dropDownNo, state }) => {
  const { options, placeholder } = data || {};
  const { statusDropdown, setStatusDropdown } = state;

  return (
    <div style={{ minwidth: "70%" }}>
      <Select
        onChange={(selectedOption) => {
          setStatusDropdown((prev) => ({ ...prev, [dropDownNo]: { value: selectedOption?.value ?? null } }));
        }}
        options={options}
        placeholder={placeholder}
        isClearable
        styles={customStyles}
        menuPortalTarget={document.body}
      />
    </div>
  );
};
export default StatusDropdown;
