interface Props {
  rotated: boolean;
}

export const TriangleIcon = ({ rotated }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="14"
      viewBox="0 0 26 14"
      fill="none"
      className={`transition-all duration-500 ${rotated && "rotate-180"}`}
    >
      <path
        d="M25.4558 0.727936L12.7279 13.4559L-3.31402e-05 0.727936H12.7279H25.4558Z"
        fill={rotated ? "#FFF" : "#333333"}
      />
    </svg>
  );
};
