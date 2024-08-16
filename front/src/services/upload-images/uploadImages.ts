import axios from "../../utils/axios/axios";

export const uploadImage = async (formData: FormData, token: string) => {
  try {
    const { data } = await axios.post("/site/upload", formData, {
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
