import axios from "../../../utils/axios/axios";

export const updateUserData = async (formData: FormData, token: string) => {
  try {
    const response = await axios.put("auth/update", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response);
    return { data: response.data, status: response.status };
  } catch (error) {
    console.log(error);
    return { data: {}, status: error };
  }
};
