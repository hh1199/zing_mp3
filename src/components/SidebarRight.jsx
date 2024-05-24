import React, { useState } from "react";
import icons from "../ultis/icons";

const { MdDeleteOutline } = icons;

const SidebarRight = () => {
  const [isRecent, setIsRecent] = useState(false);

  return (
    <div className="flex flex-col text-xs w-full">
      <div className="h-[70px] w-full flex-none py-[14px] px-2 gap-8 flex justify-between items-center">
        <div className="flex flex-auto justify-center bg-main-200 rounded-l-full rounded-r-full py-[6px] px-[6px] cursor-pointer">
          <span
            className={`py-[5px] ${
              !isRecent && "bg-main-100"
            } flex-1 flex justify-center rounded-l-full rounded-r-full items-center`}
            onClick={() => setIsRecent((prev) => !prev)}
          >
            Danh sách phát
          </span>
          <span
            className={`py-[5px] ${
              isRecent && "bg-main-100"
            } flex-1 flex justify-center rounded-l-full rounded-r-full items-center`}
            onClick={() => setIsRecent((prev) => !prev)}
          >
            Nghe gần đây
          </span>
        </div>
        <span className="p=2 rounded-full cursor-pointer hover:bg-main-100">
          <MdDeleteOutline size={14} />
        </span>
      </div>
      <div>body</div>
    </div>
  );
};

export default SidebarRight;
