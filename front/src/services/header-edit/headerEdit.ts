import axios from "../../utils/axios/axios";

export const getAllDataHeader = async () => {
  try {
    const { data } = await axios.get("/blogs");
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getAllBlogsByLang = async (lang: string) => {
  try {
    const { data } = await axios.get(`/blogs/lang/${lang}`);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getBlogById = async (id: string) => {
  try {
    const { data } = await axios.get(`/blogs/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getBlogByIdLang = async (
  langID: string,
  blog_language: string
) => {
  try {
    const { data } = await axios.get(`/blogs/${langID}/${blog_language}`);
    return data;
  } catch (error) {
    return [];
  }
};

export const createBlog = async (formData: FormData, token: string) => {
  try {
    const response = await axios.post("/blogs", formData, {
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
