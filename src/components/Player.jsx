import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as apis from "../apis";
import * as actions from "../store/actions";
import icons from "../ultis/icons";
import moment from "moment";

import { toast } from "react-toastify";

const {
  MdFavorite,
  MdFavoriteBorder,
  MdMoreHoriz,
  MdRepeat,
  MdSkipNext,
  MdSkipPrevious,
  MdShuffle,
  MdPlayArrow,
  MdPause,
} = icons;

var intervalId;

const Player = () => {
  // const audioEl = useRef(new Audio());
  // console.log("audioEl", audioEl);

  const [audio, setAudio] = useState(new Audio());
  const { curSongId, isPlaying } = useSelector((state) => state.music);
  // console.log("curSongId:", curSongId);
  const [songInfo, setSongInfo] = useState(null);
  // const [source, setSource] = useState(null);
  const [curSeconds, setCurSeconds] = useState(0);
  const dispatch = useDispatch();
  const thumbRef = useRef();

  useEffect(() => {
    const fetchDetailSong = async () => {
      const [res1, res2] = await Promise.all([
        apis.apiGetDetailSong(curSongId),
        apis.apiGetSong(curSongId),
      ]);
      if (res1.data.err === 0) {
        setSongInfo(res1.data.data);
      }
      if (res2.data.err === 0) {
        audio.pause();
        setAudio(new Audio(res2.data.data["128"]));
      } else {
        setAudio(new Audio());
        dispatch(actions.play(false));
        toast.warn(res2.data.msg);
        // setCurSeconds(0);
        // thumbRef.current.style.cssText = `right: 100%`;
      }
    };
    fetchDetailSong();
  }, [curSongId]);

  useEffect(() => {
    intervalId && clearInterval(intervalId);
    audio.pause();
    audio.load();
    audio.currentTime = 0;
    if (isPlaying) {
      audio.play();
      intervalId = setInterval(() => {
        let percent =
          Math.round((audio.currentTime * 10000) / songInfo.duration) / 100;
        console.log(percent);
        thumbRef.current.style.cssText = `right: ${100 - percent}%`;
        setCurSeconds(Math.round(audio.currentTime));
      }, 200);
    }
  }, [audio, isPlaying]);

  // const play = async () => {
  //   await audio.play();
  // };

  const handleTogglePlay = async () => {
    if (isPlaying) {
      audio.pause();
      dispatch(actions.play(false));
    } else {
      audio.play();
      dispatch(actions.play(true));
    }
  };

  return (
    <div className="bg-main-400 px-5 h-full flex">
      <div className="w-[30%] flex-auto flex gap-3 items-center">
        <img
          src={songInfo?.thumbnail}
          alt="thumbnail"
          className="w-16 h-16 object-cover rounded-md"
        />
        <div className="flex flex-col">
          <span className="font-semibold text-gray-700 text-sm">
            {songInfo?.title}
          </span>
          <span className="text-xs text-gray-500">
            {songInfo?.artistsNames}
          </span>
        </div>
        <div className="flex gap-4 pl-2">
          <span>
            <MdFavoriteBorder size={16} />
          </span>
          <span>
            <MdMoreHoriz size={16} />
          </span>
        </div>
      </div>
      <div className="w-[40%] flex-auto border flex items-center justify-center flex-col gap-2 border-red-500 py-2">
        <div className="flex gap-8 justify-center items-center">
          <span className="cursor-pointer" title="Bật phát ngẫu nhiên">
            <MdShuffle size={24} />
          </span>
          <span className="cursor-pointer">
            <MdSkipPrevious size={24} />
          </span>
          <span
            className="p-1 border boder-gray-700 hover:text-main-500 rounded-full cursor-pointer"
            onClick={handleTogglePlay}
          >
            {isPlaying ? <MdPause size={30} /> : <MdPlayArrow size={30} />}
          </span>
          <span className="cursor-pointer">
            <MdSkipNext size={24} />
          </span>
          <span className="cursor-pointer" title="Bật phát lại tất cả">
            <MdRepeat size={24} />
          </span>
        </div>
        <div className="w-full flex items-center justify-center gap-3 text-sm">
          <span>{moment.utc(curSeconds * 1000).format("mm:ss")}</span>
          <div className="w-3/5 h-[3px] rounded-l-full rounded-r-full relative bg-[rgba(0,0,0,0.1)]">
            <div
              ref={thumbRef}
              className="absolute top-0 left-0  h-[3px] rounded-l-full rounded-r-full bg-[#0e8080]"
            ></div>
          </div>
          <span>{moment.utc(songInfo?.duration * 1000).format("mm:ss")}</span>
        </div>
      </div>
      <div className="w-[30%] flex-auto">Volume</div>
    </div>
  );
};

export default Player;

// import React, { useEffect, useState, useRef } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import * as apis from "../apis";
// import * as actions from "../store/actions";
// import icons from "../ultis/icons";
// import moment from "moment";
// import { toast } from "react-toastify";

// const {
//   MdFavoriteBorder,
//   MdMoreHoriz,
//   MdRepeat,
//   MdSkipNext,
//   MdSkipPrevious,
//   MdShuffle,
//   MdPlayArrow,
//   MdPause,
// } = icons;

// const Player = () => {
//   const [audio, setAudio] = useState(new Audio());
//   const { curSongId, isPlaying } = useSelector((state) => state.music);
//   const [songInfo, setSongInfo] = useState(null);
//   const [curSeconds, setCurSeconds] = useState(0);
//   const thumbRef = useRef();
//   const intervalIdRef = useRef(null);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchDetailSong = async () => {
//       const [res1, res2] = await Promise.all([
//         apis.apiGetDetailSong(curSongId),
//         apis.apiGetSong(curSongId),
//       ]);
//       if (res1.data.err === 0) {
//         setSongInfo(res1.data.data);
//       }
//       if (res2.data.err === 0) {
//         const newAudio = new Audio(res2.data.data["128"]);
//         setAudio(newAudio);
//       } else {
//         dispatch(actions.play(false));
//         setAudio(new Audio());
//         toast.info(res2.data.msg);
//       }
//     };

//     fetchDetailSong();
//   }, [curSongId, dispatch]);

//   useEffect(() => {
//     audio.load();
//     if (isPlaying) {
//       audio.play().catch((error) => {
//         console.error("Error playing audio:", error);
//         toast.error("Failed to play audio.");
//       });
//     }

//     return () => {
//       if (intervalIdRef.current) {
//         clearInterval(intervalIdRef.current);
//       }
//     };
//   }, [audio, isPlaying]);

//   useEffect(() => {
//     if (isPlaying) {
//       intervalIdRef.current = setInterval(() => {
//         const percent =
//           Math.round((audio.currentTime * 10000) / songInfo.duration) / 100;
//         if (thumbRef.current) {
//           thumbRef.current.style.cssText = `right: ${100 - percent}%`;
//         }
//         setCurSeconds(Math.round(audio.currentTime));
//       }, 200);
//     } else {
//       if (intervalIdRef.current) {
//         clearInterval(intervalIdRef.current);
//       }
//     }

//     return () => {
//       if (intervalIdRef.current) {
//         clearInterval(intervalIdRef.current);
//       }
//     };
//   }, [isPlaying, audio, songInfo]);

//   const handleTogglePlay = async () => {
//     if (isPlaying) {
//       audio.pause();
//       dispatch(actions.play(false));
//     } else {
//       audio.play().catch((error) => {
//         console.error("Error resuming audio:", error);
//         toast.error("Failed to resume audio.");
//       });
//       dispatch(actions.play(true));
//     }
//   };

//   return (
//     <div className="bg-main-400 px-5 h-full flex">
//       <div className="w-[30%] flex-auto flex gap-3 items-center">
//         <img
//           src={songInfo?.thumbnail}
//           alt="thumbnail"
//           className="w-16 h-16 object-cover rounded-md"
//         />
//         <div className="flex flex-col">
//           <span className="font-semibold text-gray-700 text-sm">
//             {songInfo?.title}
//           </span>
//           <span className="text-xs text-gray-500">
//             {songInfo?.artistsNames}
//           </span>
//         </div>
//         <div className="flex gap-4 pl-2">
//           <span>
//             <MdFavoriteBorder size={16} />
//           </span>
//           <span>
//             <MdMoreHoriz size={16} />
//           </span>
//         </div>
//       </div>
//       <div className="w-[40%] flex-auto flex items-center justify-center flex-col gap-2 py-2">
//         <div className="flex gap-8 justify-center items-center">
//           <span className="cursor-pointer" title="Shuffle">
//             <MdShuffle size={24} />
//           </span>
//           <span className="cursor-pointer">
//             <MdSkipPrevious size={24} />
//           </span>
//           <span
//             className="p-1 border border-gray-700 hover:text-main-500 rounded-full cursor-pointer"
//             onClick={handleTogglePlay}
//           >
//             {isPlaying ? <MdPause size={30} /> : <MdPlayArrow size={30} />}
//           </span>
//           <span className="cursor-pointer">
//             <MdSkipNext size={24} />
//           </span>
//           <span className="cursor-pointer" title="Repeat">
//             <MdRepeat size={24} />
//           </span>
//         </div>
//         <div className="w-full flex items-center justify-center gap-3 text-sm">
//           <span>{moment.utc(curSeconds * 1000).format("mm:ss")}</span>
//           <div className="w-3/5 h-[3px] rounded-l-full rounded-r-full relative bg-[rgba(0,0,0,0.1)]">
//             <div
//               ref={thumbRef}
//               className="absolute top-0 left-0 h-[3px] rounded-l-full rounded-r-full bg-[#0e8080]"
//             ></div>
//           </div>
//           <span>{moment.utc(songInfo?.duration * 1000).format("mm:ss")}</span>
//         </div>
//       </div>
//       <div className="w-[30%] flex-auto">Volume</div>
//     </div>
//   );
// };

// export default Player;
