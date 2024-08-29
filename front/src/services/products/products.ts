import axios from "../../utils/axios/axios";

export const getAllProducts = async () => {
  try {
    const { data } = await axios.get("/item");
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getProductById = async (id: string, token: string) => {
  try {
    const { data } = await axios.get(`/item/get/${id}`, {
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

export const createProduct = async (
  siteId: string,
  formData: FormData,
  token: string
) => {
  try {
    const response = await axios.post(`/item/${siteId}`, formData, {
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

export const updateProduct = async (
  updatedProduct: FormData,
  id: number,
  token: string
) => {
  try {
    const { data } = await axios.post(`/item/update/${id}`, updatedProduct, {
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

export const deleteProduct = async (id: number, token: string) => {
  try {
    const { data } = await axios.delete(`/deleteItem/${id}`, {
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
