import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as apis from "../apis";
import * as actions from "../store/actions";
import icons from "../ultis/icons";
import moment from "moment";
import { LoadingSong } from "./";

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
  MdOutlineRepeatOne,
  MdList,
  MdOutlineVolumeUp,
  MdOutlineVolumeOff,
  MdOutlineVolumeDown,
} = icons;

var intervalId;

const Player = ({ setIsShowRightSidebar }) => {
  // const audioEl = useRef(new Audio());
  // console.log("audioEl", audioEl);

  const [audio, setAudio] = useState(new Audio());
  const { curSongId, isPlaying, songs } = useSelector((state) => state.music);
  // console.log("curSongId:", curSongId);
  const [songInfo, setSongInfo] = useState(null);
  // const [source, setSource] = useState(null);
  const [curSeconds, setCurSeconds] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0);
  const [isLoadedSource, setIsLoadedSource] = useState(false);
  const [volume, setVolume] = useState(100);
  const dispatch = useDispatch();
  const thumbRef = useRef();
  const trackRef = useRef();

  useEffect(() => {
    const fetchDetailSong = async () => {
      setIsLoadedSource(false);
      const [res1, res2] = await Promise.all([
        apis.apiGetDetailSong(curSongId),
        apis.apiGetSong(curSongId),
      ]);
      setIsLoadedSource(true);
      if (res1.data.err === 0) {
        setSongInfo(res1.data.data);
      }
      if (res2.data.err === 0) {
        audio.pause();
        setAudio(new Audio(res2.data.data["128"]));
      } else {
        audio.pause();
        setAudio(new Audio());
        dispatch(actions.play(false));
        toast.warn(res2.data.msg);
        setCurSeconds(0);
        thumbRef.current.style.cssText = `right: 100%`;
      }
    };
    fetchDetailSong();
  }, [curSongId]);

  useEffect(() => {
    intervalId && clearInterval(intervalId);
    audio.pause();
    audio.load();

    if (isPlaying) {
      audio.play();
      intervalId = setInterval(() => {
        let percent =
          Math.round((audio.currentTime * 10000) / songInfo.duration) / 100;
        // console.log(percent);
        thumbRef.current.style.cssText = `right: ${100 - percent}%`;
        setCurSeconds(Math.round(audio.currentTime));
      }, 200);
    }
  }, [audio]);

  useEffect(() => {
    const handleEnded = () => {
      // console.log("end");
      if (isShuffle) {
        handleShuffle();
      } else if (repeatMode) {
        repeatMode === 1 ? handleRepeatOne() : handleNextSong();
      } else {
        audio.pause();
        dispatch(actions.play(false));
      }
    };
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audio, isShuffle, repeatMode]);

  useEffect(() => {
    audio.volume = volume / 100;
  }, [volume]);

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

  const handleClickProgressBar = (e) => {
    // console.log(trackRef.current.getBoundingClientRect());
    const trackRect = trackRef.current.getBoundingClientRect();
    const percent =
      Math.round(((e.clientX - trackRect.left) * 10000) / trackRect.width) /
      100;
    thumbRef.current.style.cssText = `right: ${100 - percent}%`;
    audio.currentTime = (percent * songInfo.duration) / 100;
    setCurSeconds(Math.round((percent * songInfo.duration) / 100));
  };

  const handleNextSong = () => {
    if (songs) {
      let currentSongIndex;
      songs?.forEach((item, index) => {
        if (item.encodeId === curSongId) currentSongIndex = index;
      });
      dispatch(actions.setCurSongId(songs[currentSongIndex + 1].encodeId));
      dispatch(actions.play(true));
    }
  };

  const handlePrevSong = () => {
    if (songs) {
      let currentSongIndex;
      songs?.forEach((item, index) => {
        if (item.encodeId === curSongId) currentSongIndex = index;
      });
      dispatch(actions.setCurSongId(songs[currentSongIndex - 1].encodeId));
      dispatch(actions.play(true));
    }
  };

  const handleRepeatOne = () => {
    // console.log("repeat one");
    audio.play();
  };

  const handleShuffle = () => {
    const randomIndex = Math.round(Math.random() * songs?.length) - 1;
    dispatch(actions.setCurSongId(songs[randomIndex].encodeId));
    dispatch(actions.play(true));
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
      <div className="w-[40%] flex-auto  flex items-center justify-center flex-col gap-2 py-2">
        <div className="flex gap-8 justify-center items-center">
          <span
            className={`cursor-pointer ${isShuffle && "text-purple-600"}`}
            title="Bật phát ngẫu nhiên"
            onClick={() => setIsShuffle((prev) => !prev)}
          >
            <MdShuffle size={24} />
          </span>
          <span
            className={`${!songs ? "text-gray-400" : "cursor-pointer"}`}
            onClick={handlePrevSong}
          >
            <MdSkipPrevious size={24} />
          </span>
          <span
            className="p-1 border boder-gray-700 hover:text-main-500 rounded-full cursor-pointer"
            onClick={handleTogglePlay}
          >
            {!isLoadedSource ? (
              <LoadingSong />
            ) : isPlaying ? (
              <MdPause size={30} />
            ) : (
              <MdPlayArrow size={30} />
            )}
          </span>
          <span
            className={`${!songs ? "text-gray-400" : "cursor-pointer"}`}
            onClick={handleNextSong}
          >
            <MdSkipNext size={24} />
          </span>
          <span
            className={`cursor-pointer ${repeatMode && "text-purple-600"}`}
            title="Bật phát lại tất cả"
            onClick={() => setRepeatMode((prev) => (prev === 2 ? 0 : prev + 1))}
          >
            {repeatMode === 1 ? (
              <MdOutlineRepeatOne size={24} />
            ) : (
              <MdRepeat size={24} />
            )}
          </span>
        </div>
        <div className="w-full flex items-center justify-center gap-3 text-sm">
          <span>{moment.utc(curSeconds * 1000).format("mm:ss")}</span>
          <div
            className="w-3/5 h-[3px] hover:h-[8px] rounded-l-full rounded-r-full cursor-pointer relative bg-[rgba(0,0,0,0.1)]"
            onClick={handleClickProgressBar}
            ref={trackRef}
          >
            <div
              ref={thumbRef}
              className="absolute top-0 left-0 bottom-0  rounded-l-full rounded-r-full bg-[#0e8080]"
            ></div>
          </div>
          <span>{moment.utc(songInfo?.duration * 1000).format("mm:ss")}</span>
        </div>
      </div>
      <div className="w-[30%] flex-auto flex items-center justify-end gap-4">
        <div className="flex gap-2 items-center">
          <span onClick={() => setVolume((prev) => (+prev === 0 ? 70 : 0))}>
            {+volume >= 50 ? (
              <MdOutlineVolumeUp />
            ) : +volume === 0 ? (
              <MdOutlineVolumeOff />
            ) : (
              <MdOutlineVolumeDown />
            )}
          </span>
          <input
            type="range"
            step={1}
            min={0}
            max={100}
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
          />
        </div>
        <span
          onClick={() => {
            setIsShowRightSidebar((prev) => !prev);
          }}
          className="p-1 rounded-sm cursor-pointer bg-main-500 opacity-90 hover:opacity-100"
        >
          <MdList size={20} />
        </span>
      </div>
    </div>
  );
};

export default Player;
