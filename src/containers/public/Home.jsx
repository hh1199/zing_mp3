import React from "react";
import { Slider, Section, NewRelease } from "../../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const { friday, newEveryday, remix, top100, hotAlbum, weekChart } =
    useSelector((state) => state.app);
  return (
    <div className="overflow-y-auto ">
      <Slider />
      <Section data={friday} />
      <Section data={newEveryday} />
      <NewRelease />
      <Section data={remix} />
      <Section data={top100} />
      <Section data={hotAlbum} />
      <div className="flex items-center px-[43px] w-full mt-12">
        {weekChart?.map((item) => (
          <Link
            to={item?.link?.split(".")[0]}
            key={item.link}
            className="flex-1 px-4"
          >
            <img
              src={item.cover}
              alt="cover"
              className="w-full object-cover rounded-md"
            />
          </Link>
        ))}
      </div>
      <div className="w-full h-[500px]"></div>
    </div>
  );
};

export default Home;
