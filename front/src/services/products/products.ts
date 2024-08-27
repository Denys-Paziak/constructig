import axios from "../../utils/axios/axios";

export const getAllProducts = async () => {
  try {
    const { data } = await axios.get("/blogs");
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getAllProductsByLang = async (lang: string) => {
  try {
    const { data } = await axios.get(`/blogs/lang/${lang}`);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getProductById = async (id: string) => {
  try {
    const { data } = await axios.get(`/blogs/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getProductByIdLang = async (
  langID: string,
  blog_language: string
) => {
  try {
    const { data } = await axios.get(`/blogs/${langID}/${blog_language}`);
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

export const createProductLang = async (
  formData: FormData,
  token: string,
  langID: string
) => {
  try {
    const response = await axios.post(`/blogs/${langID}`, formData, {
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
  updatedBlog: FormData,
  id: number,
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
