import axios from "../../../utils/axios/axios";

// export const login = async (email: string, password: string) => {
//   const response = await fetch(`${API_URL}/auth/login`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ email, password }),
//   });
//   return response.json();
// };

export const login = async (formData: FormData) => {
  try {
    const { data } = await axios.post("/auth/login", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
