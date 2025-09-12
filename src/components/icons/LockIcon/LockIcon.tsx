import type { LockIconProps } from "./LockIcon.props";

const LockIcon = ({ isActive, ...props }: LockIconProps) => {
  return (
    <>
      {!isActive ? (
        <svg
          width="20"
          height="20"
          viewBox="0 0 800 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <path
            d="M266.667 366.667V233.333C266.667 188.889 293.333 100 400 100C506.667 100 533.333 188.889 533.333 233.333V366.667M266.667 366.667H166.667V700H400M266.667 366.667H533.333M533.333 366.667H633.333V700H566.667"
            stroke="white"
            stroke-width="50"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ) : (
        <svg
          width="20"
          height="20"
          viewBox="0 0 800 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <path
            d="M266.667 366.667V233.333C266.667 188.889 293.333 100 400 100C463.677 100 498.843 131.677 516.847 166.667M266.667 366.667H166.667V700H400M266.667 366.667H633.333V700H566.667"
            stroke="white"
            stroke-width="50"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      )}
    </>
  );
};

export default LockIcon;
