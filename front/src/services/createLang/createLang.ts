import axios from "../../utils/axios/axios.js";

export const createLang = async (formData: FormData, token: string) => {
    try {
        const { data } = await axios.post("/site/createLang", formData, {
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