// import style from "./../css/Dummy.module.css";

// function TwoParkSale() {
//   return (
//     <div className={style.container}>
//       <h2>Hello TwoParkSale</h2>
//     </div>
//   );
// }

// export default TwoParkSale;


import style from "./../css/Dummy.module.css";

function TwoParkSale() {
  return (
    <div className={style.container}>
      <label htmlFor="twoParkDropdown">Select Park:</label>
      <select id="twoParkDropdown" className={style.inputStyle}>
        <option value="">-- Select --</option>
        <option value="park1">Park 1</option>
        <option value="park2">Park 2</option>
      </select>
    </div>
  );
}

export default TwoParkSale;
