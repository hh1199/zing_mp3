import axios from "../axios";

export const getHome = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/home",
        method: "get",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

// export const getHome = async () => {
//   try {
//     const response = await axios.get("/home", {});
//     return { data: response.data, error: null };
//   } catch (error) {
//     return { data: null, error: error };
//   }
// };
