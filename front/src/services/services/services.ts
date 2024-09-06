import axios from "../../utils/axios/axios";

export const updateServices = async (
  id: string,
  formData: FormData,
  token: string
) => {
  try {
    const res = await axios.put(`/site/services/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return res;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const createItem = async (itemData: any, token: string) => {
  try {
    const response = await axios.post("/api/items", itemData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating item:", error);
    throw error;
  }
};
