import axios from "../axios";

export const apiGetSong = (sid) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/song",
        method: "get",
        params: { id: sid },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

// export const apiGetSong = async (sid) => {
//   try {
//     const response = await axios({
//       url: "/song",
//       method: "get",
//       params: { id: sid },
//     });
//     console.log("apiGetSong: ", response);
//   } catch (error) {
//     console.error("apiGetSong: ", error);
//   }
// };

export const apiGetDetailSong = (sid) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/infosong",
        method: "get",
        params: { id: sid },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

// export const apiGetDetailSong = async (sid) => {
//   try {
//     const response = await axios({
//       url: "/infosong",
//       method: "get",
//       params: { id: sid },
//     });
//     console.log("apiGetDetailSong: ", response);
//   } catch (error) {
//     console.error("apiGetDetailSong: ", error);
//   }
// };

export const apiGetDetailPlaylist = (pid) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/detailplaylist",
        method: "get",
        params: { id: pid },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
