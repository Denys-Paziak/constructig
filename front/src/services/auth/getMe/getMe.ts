import axios from "../../../utils/axios/axios";

export const getMe = async (token: string) => {
  try {
    const { data } = await axios.get("/auth/getUser", {
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
