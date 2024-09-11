import React from "react";

interface Props {
  handleButtonClick: any;
}

const Button: React.FC<Props> = ({ handleButtonClick }) => {
  return (
    <button
      onClick={handleButtonClick}
      className="w-full bg-blue-500 text-white py-2 rounded-md"
      type="button"
    >
      Save
    </button>
  );
};

export default Button;
