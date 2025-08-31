import type { BurgerIconProps } from "./BurgerIcon.props";

const BurgerIcon = ({ click }: BurgerIconProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={() => click((prev) => !prev)}
    >
      <path
        d="M3 12H3.01M3 18H3.01M3 6H3.01M8 12H21M8 18H21M8 6H21"
        stroke="#AEB9E1"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default BurgerIcon;
