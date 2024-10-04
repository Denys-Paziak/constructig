import axios from "../../utils/axios/axios";

export const getUserSites = async (token: string) => {
  try {
    const { data } = await axios.get("sites", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getSite = async (siteName: string, company: string) => {
  try {
    const { data } = await axios.get(`site/${siteName}/${company}`);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getEditSite = async (id: number, token: string, lang) => {
  try {
    const { data } = await axios.get(`site/id/${id}/${lang}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    return {error: true};
  }
};

export const updateSite = async (
  id: number,
  formData: FormData,
  token: string
) => {
  try {
    const { data } = await axios.put(`/site/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
