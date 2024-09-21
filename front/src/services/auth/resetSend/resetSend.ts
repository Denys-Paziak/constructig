import axios from "../../../utils/axios/axios";

export const resetSend = async (formData: FormData) => {
  try {
    const response = await axios.post("/auth/resetsend", formData, {
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
