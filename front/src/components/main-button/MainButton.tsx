import React from "react";

interface Props {
  text: string;
  type: any;
}

const MainButton: React.FC<Props> = ({ text, type }) => {
  return (
    <button
      className="w-fit py-[10px] px-[24px] text-white cursor-pointer uppercase outline-none border-none rounded-md"
      type={type}
      style={{ backgroundColor: "#3649AD" }}
    >
      {text}
    </button>
  );
};

export default MainButton;
