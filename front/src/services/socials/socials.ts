import axios from "../../utils/axios/axios";

export const updateSocials = async (
  id: string,
  formData: FormData,
  token: string
) => {
  try {
    const { data } = await axios.put(`/site/social/${id}`, formData, {
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
