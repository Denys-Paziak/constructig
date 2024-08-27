import axios from "../../utils/axios/axios";

export const getAllNews = async () => {
  try {
    const { data } = await axios.get("/blogs");
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getAllNewsByLang = async (lang: string) => {
  try {
    const { data } = await axios.get(`/blogs/lang/${lang}`);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getNewById = async (id: string) => {
  try {
    const { data } = await axios.get(`/blogs/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getNewByIdLang = async (langID: string, blog_language: string) => {
  try {
    const { data } = await axios.get(`/blogs/${langID}/${blog_language}`);
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

export const createNewLang = async (
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

export const updateNew = async (
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

export const deleteNew = async (id: number, token: string) => {
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
