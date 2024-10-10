import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  handleButtonClick: any;
}

const Button: React.FC<Props> = ({ handleButtonClick }) => {
  const { t } = useTranslation();

  return (
    <button
      onClick={handleButtonClick}
      className="w-full bg-blue-500 text-white py-2 rounded-md"
      type="button"
    >
      {t("adminChange.adminChangeHeader.adminChangeHeaderButton")}
    </button>
  );
};

export default Button;
