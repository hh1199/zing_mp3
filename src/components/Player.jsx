import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as apis from "../apis";
// import * as actions from "../store/actions";
import icons from "../ultis/icons";
// import { toast } from "react-toastify";

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

const Player = () => {
  const audioEl = new Audio();
  // console.log("audioEl", audioEl);
  const { curSongId, isPlaying } = useSelector((state) => state.music);
  // console.log("curSongId:", curSongId);
  const [songInfo, setSongInfo] = useState(null);
  const [source, setSource] = useState(null);

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
        setSource(res2.data.data["128"]);
      }
    };
    fetchDetailSong();
  }, [curSongId]);

  useEffect(() => {
    // audioEl.play();
  }, [curSongId]);

  const handleTogglePlay = () => {};

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
        <div>music bar</div>
      </div>
      <div className="w-[30%] flex-auto">Volume</div>
    </div>
  );
};

export default Player;
