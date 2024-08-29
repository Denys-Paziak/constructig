import axios from "../../utils/axios/axios";

export const getAllCategories = async () => {
  try {
    const { data } = await axios.get("/blogs");
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getCategoryById = async (id: string, token: string) => {
  try {
    const { data } = await axios.get(`/category/get/${id}`, {
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

export const createCategory = async (
  siteId: string,
  formData: FormData,
  token: string
) => {
  try {
    const response = await axios.post(`/category/${siteId}`, formData, {
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

export const updateCategory = async (
  updatedBlog: FormData,
  id: string,
  token: string
) => {
  try {
    const { data } = await axios.patch(`/blogs/${id}`, updatedBlog, {
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

export const deleteCategory = async (id: number, token: string) => {
  try {
    const { data } = await axios.delete(`/deleteCategory/${id}`, {
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
