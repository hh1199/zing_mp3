import axios from "../axios";

export const getSong = async (sid) => {
  try {
    const response = await axios({
      url: "/song",
      method: "get",
      params: { id: sid },
    });
    console.log("getSong: ", response);
  } catch (error) {
    console.error("getSong: ", error);
  }
};

// export const getDetailSong = (sid) =>
//   new Promise(async (resolve, reject) => {
//     try {
//       const response = await axios({
//         url: "/infosong",
//         method: "get",
//         params: { id: sid },
//       });
//       resolve(response);
//     } catch (error) {
//       reject(error);
//     }
//   });

export const getDetailSong = async (sid) => {
  try {
    const response = await axios({
      url: "/infosong",
      method: "get",
      params: { id: sid },
    });
    console.log("getDetailSong: ", response);
  } catch (error) {
    console.error("getDetailSong: ", error);
  }
};
