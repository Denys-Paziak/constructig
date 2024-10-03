import React, { useState } from "react";

import Button from "../../UI/button/Button";
import { useParams } from "react-router-dom";
import { notify } from "../../../helpers/helper";
import Loader from "../../loader/Loader";
import {updateBanner} from "../../../services/banner/banner.ts";

interface Props {
  data: any;
  sectionName: string;
  handlerInput: (section: string, field: string, value: string | null) => void;
}

const Banner: React.FC<Props> = ({ data, sectionName }) => {
  const id = data.site.id;
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("data", JSON.stringify(data.banner));

      if (token) {
        const response = await updateBanner(id!, formData, token);
        notify(response.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {sectionName === "banner" && (
        <div className="w-full bg-white rounded-md shadow-md p-3 flex items-start gap-4 flex-col">
          <Button handleButtonClick={handleSaveChanges} />
        </div>
      )}
    </>
  );
};

export default Banner;
