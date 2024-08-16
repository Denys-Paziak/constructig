import axios from "../utils/axios/axios";

export interface LoginResponse {
  token: string;
  error?: string;
}

export interface RegisterResponse {
  message: string;
  error?: string;
}

export interface Site {
  id: number;
  name: string;
  url: string;
  // інші поля сайту
}

export interface GetUserSitesResponse {
  sites: Site[];
  error?: string;
}

export interface GetSiteResponse {
  site: Site;
  error?: string;
}

export interface UpdateSiteResponse {
  message: string;
  error?: string;
}

const API_URL = "http://localhost:3000";

export const login = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
};

export const register = async (
  username: string,
  email: string,
  password: string
) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password, company: "sad" }),
  });

  return response;
};

export const getUserSites = async (
  token: string
): Promise<GetUserSitesResponse> => {
  const response = await fetch(`${API_URL}/sites`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

export const getSite = async (
  id: number,
  token: string
): Promise<GetSiteResponse> => {
  const response = await fetch(`${API_URL}/site/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

// export const updateSite = async (id: number, data: any, token: string): Promise<UpdateSiteResponse> => {
//     const response = await fetch(`${API_URL}/site/${id}`, {
//         method: 'PUT',
//         headers: {
//             'Authorization': `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//         },
//         body: JSON.stringify(data),
//     });
//     return response.json();
// };

export const updateSite = async (
  id: number,
  formData: FormData,
  token: string
) => {
  try {
    const { data } = await axios.put(`/site/${id}`, formData, {
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

export const addSite = async (
  name: string,
  url: string,
  token: string
): Promise<any> => {
  const response = await fetch(`${API_URL}/site`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, url }),
  });
  return response;
};
