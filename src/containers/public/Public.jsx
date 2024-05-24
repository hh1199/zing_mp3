import React from "react";
import { Outlet } from "react-router-dom";
import { SidebarLeft, SidebarRight, Header } from "../../components";

const Public = () => {
  return (
    <div className="w-full flex bg-[#CED9D9]">
      <div className="w-[240px] flex-none border border-blue-500">
        <SidebarLeft />
      </div>
      <div className="flex-auto border border-red-500">
        <div className="h-[70px] px-[59px] flex items-center mb-5">
          <Header />
        </div>
        <Outlet />
      </div>
      <div className="w-[329px]  1600:flex flex-none animate-slide=left ">
        <SidebarRight />
      </div>
    </div>
  );
};

export default Public;
