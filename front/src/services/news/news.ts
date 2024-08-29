import axios from "../../utils/axios/axios";

export const getAllNews = async () => {
  try {
    const { data } = await axios.get("/news");
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getNewById = async (id: string, token: string) => {
  try {
    const { data } = await axios.get(`/news/get/${id}`, {
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

export const createNew = async (
  siteId: string,
  formData: FormData,
  token: string
) => {
  try {
    const response = await axios.post(`/news/${siteId}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const updateNew = async (
  updatedNew: FormData,
  id: string,
  token: string
) => {
  try {
    const { data } = await axios.post(`/news/update/${id}`, updatedNew, {
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

export const deleteNew = async (id: number, token: string) => {
  try {
    const { data } = await axios.delete(`/deleteNews/${id}`, {
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
