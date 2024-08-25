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

export const deleteImage = async (name: string, token: string) => {
  try {
    const formData = new FormData();

    const regex = /amazonaws\.com\/(.*)$/;
    const match = name.match(regex);

    if (match && match[1]) {
      formData.append("image", match[1]);
    }

    const { data } = await axios.post("/site/delete", formData, {
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
