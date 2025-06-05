import style from "../css/DownArrowSvg.module.css";

export const DoubleLeftArrowIcon = () => {
  return (
    <svg width="1.5vw" height="1.5vw" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ cursor: "pointer" }}>
      <g fill="none" fillRule="evenodd">
        <rect width="24" height="24" fill="none" />
        <path
          d="M5.29,6.71 C4.90,6.32 4.90,5.68 5.29,5.29 C5.68,4.90 6.32,4.90 6.71,5.29 L12.71,11.29 
           C13.09,11.67 13.10,12.28 12.74,12.68 L7.24,18.68 
           C6.86,19.08 6.23,19.11 5.82,18.74 
           C5.42,18.36 5.39,17.73 5.76,17.32 
           L10.62,12.03 L5.29,6.71 Z"
          fill="#000000"
          transform="translate(9, 12) scale(-1, 1) translate(-9, -12)"
        />
        <path
          d="M10.71,15.71 C10.32,16.10 9.68,16.10 9.29,15.71 
           C8.90,15.32 8.90,14.68 9.29,14.29 
           L15.29,8.29 C15.67,7.91 16.28,7.90 16.68,8.26 
           L22.68,13.76 C23.08,14.14 23.11,14.77 22.74,15.18 
           C22.36,15.58 21.73,15.61 21.32,15.24 
           L16.03,10.38 L10.71,15.71 Z"
          fill="#000000"
          opacity="0.3"
          transform="translate(16, 12) scale(-1, 1) rotate(-270) translate(-16, -12)"
        />
      </g>
    </svg>
  );
};

export const DownArrowIcon = () => {
  return (
    <svg className={style.arrowIcon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="gray" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: "pointer" }}>
      <path d="M7 10l5 5 5-5" />
    </svg>
  );
};

export const LeftArrowIcon = () => {
  return (
    <svg width="1.5em" height="1.5em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="gray" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: "pointer" }}>
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
};

export const RightArrowIcon = () => (
  <svg width="1.5em" height="1.5em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="gray" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: "pointer" }}>
    <path d="M9 18l6-6-6-6" />
  </svg>
);

export const FirstPageIcon = () => {
  return (
    <svg width="1.5em" height="1.5em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="gray" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: "pointer" }}>
      <polyline points="11 17 6 12 11 7" />
      <line x1="18" y1="6" x2="18" y2="18" />
    </svg>
  );
};

export const LastPageIcon = () => (
  <svg width="1.5em" height="1.5em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="gray" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: "pointer" }}>
    <polyline points="13 7 18 12 13 17" />
    <line x1="6" y1="6" x2="6" y2="18" />
  </svg>
);
