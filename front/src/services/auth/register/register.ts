import axios from "../../../utils/axios/axios";

// export const register = async (
//   username: string,
//   email: string,
//   password: string,
//   company: string
// ) => {
//   const response = await fetch(`${API_URL}/auth/register`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//     body: JSON.stringify({ username, email, password, company }),
//   });

//   return response;
// };

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
    return [];
  }
};
