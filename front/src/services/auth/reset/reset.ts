import axios from "../../../utils/axios/axios";

export const reset = async (formData: FormData) => {
  try {
    const response = await axios.put("/auth/reset", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    return [];
  }
};
