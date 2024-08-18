import axios from "../../utils/axios/axios";

export const getSite = async (siteName: string) => {
  try {
    const { data } = await axios.get(`site/${siteName}`);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getEditSite = async (id: number, token: string) => {
  try {
    const { data } = await axios.get(`site/id/${id}`, {
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

// export const getEditSite = async (
// id: number,
// token: string
//   ): Promise<GetSiteResponse> => {
//     const response = await fetch(`${API_URL}/site/${id}`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });
//     return response.json();
//   };

// export const getSite = async (
//     id: number,
//     token: string
//   ): Promise<GetSiteResponse> => {
//     const response = await fetch(`${API_URL}/site/${id}`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });
//     return response.json();
//   };
