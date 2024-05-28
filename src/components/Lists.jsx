import { memo } from "react";
import { List } from "./";
import PropTypes from "prop-types";

const Lists = ({ songs, totalDuration }) => {
  return (
    <div className="w-full flex flex-col text-xs text-gray-600 ">
      <div className="flex justify-between items-center p-[10px] font-semibold">
        <span>BÀI HÁT</span>
        <span>ALBUM</span>
        <span>THỜI GIAN</span>
      </div>
      <div className="flex flex-col">
        {songs?.length &&
          songs?.map((item) => <List key={item.encodeId} songData={item} />)}
      </div>
    </div>
  );
};

Lists.propTypes = {
  songs: PropTypes.array.isRequired,
  totalDuration: PropTypes.number,
};

export default memo(Lists);
