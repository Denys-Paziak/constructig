import axios from "../../utils/axios/axios";

export const updateHeaderEdit = async (
  id: string,
  formData: FormData,
  token: string
) => {
  try {
    const { data } = await axios.put(`/site/header/${id}`, formData, {
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

export const deleteHeader = async (id: string, token: string) => {
  try {
    const { data } = await axios.delete(`/blogs/${id}`, {
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
