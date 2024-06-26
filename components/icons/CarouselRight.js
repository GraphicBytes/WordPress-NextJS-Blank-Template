export const CarouselRight = ({ enabled, onClick, className }) => (
  <button
    onClick={onClick}
    disabled={!enabled}
    className={className}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      transform="scale(-1 1)"
      viewBox="0 0 16 16"
    >
      <path 
        fill="#FFF" 
        fillRule="evenodd"
        stroke="#FFF"
        strokeWidth="1"
        d="M11.354 1.646a.5.5 0 010 .708L5.707 8l5.647 5.646a.5.5 0 01-.708.708l-6-6a.5.5 0 010-.708l6-6a.5.5 0 01.708 0z"
      ></path>
    </svg>
  </button>
);
