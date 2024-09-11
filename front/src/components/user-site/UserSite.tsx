import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSite } from "../../services/getSite/getSite";
import Preview from "../Preview";

const UserSite: React.FC = () => {
  const [data, setData] = useState<any>();
  const { siteName } = useParams();

  const getUserSite = async () => {
    try {
      const response = await getSite(siteName!);
      setData(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserSite();
  }, []);

  return <Preview data={data!} />;
};

export default UserSite;
