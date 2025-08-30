import type { SearchIconProps } from "./SearchIcon.props";

const SearchIcon = ({ click }: SearchIconProps) => {
  return (
    <svg
      width="16"
      height="15"
      viewBox="0 0 16 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={click}
    >
      <path
        d="M7.25942 12.9446C10.5322 12.9446 13.1854 10.2915 13.1854 7.0187C13.1854 3.7459 10.5322 1.09277 7.25942 1.09277C3.98662 1.09277 1.3335 3.7459 1.3335 7.0187C1.3335 10.2915 3.98662 12.9446 7.25942 12.9446Z"
        stroke="#AEB9E1"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M14.6666 14.4263L11.4443 11.2041"
        stroke="#AEB9E1"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default SearchIcon;
