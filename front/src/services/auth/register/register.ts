import axios from "../../../utils/axios/axios";

export const register = async (formData: FormData) => {
  try {
    const response = await axios.post("/auth/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
