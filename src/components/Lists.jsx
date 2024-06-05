import React, { memo } from "react";
import { List } from "./";
import icons from "../ultis/icons";
import moment from "moment";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const { MdAdjust } = icons;

const Lists = ({ totalDuration }) => {
  const { songs } = useSelector((state) => state.music);
  return (
    <div className="w-full flex flex-col text-xs text-gray-600 ">
      <div className="flex justify-between items-center p-[10px] font-semibold">
        <span>BÀI HÁT</span>
        <span>ALBUM</span>
        <span>THỜI GIAN</span>
      </div>
      <div className="flex flex-col">
        {songs?.map((item) => (
          <List key={item.encodeId} songData={item} />
        ))}
      </div>
      <span className="flex items-center gap-1 py-[10px] border-t border-[rgba(0,0,0,0.05)]">
        <span>{`${songs?.length} bài hát`}</span>
        <MdAdjust size={24} />
        <span>{moment.utc(totalDuration * 1000).format("HH:mm:ss")}m</span>
      </span>
    </div>
  );
};

Lists.propTypes = {
  songs: PropTypes.array.isRequired,
  totalDuration: PropTypes.number,
};

export default memo(Lists);
