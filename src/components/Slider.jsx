import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getArrSlider } from "../ultis/fn";
import * as actions from "../store/actions";
import { useNavigate } from "react-router-dom";

const Slider = () => {
  const { banner } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const sliderEls = document.getElementsByClassName("slider-item");
  //   let min = 0;
  //   let max = 2;
  //   const intervalId = setInterval(() => {
  //     const list = getArrSlider(min, max, sliderEls.length - 1);
  //     for (let i = 0; i < sliderEls.length; i++) {
  //       if (list.some((item) => item === i)) {
  //         sliderEls[i].style.cssText = "display: none";
  //       } else {
  //         sliderEls[i].style.cssText = "display: block";
  //       }
  //     }
  //     if (min === sliderEls.length - 1) {
  //       min = 0;
  //     } else {
  //       min += 1;
  //     }
  //     if (max === sliderEls.length - 1) {
  //       max = 0;
  //     } else {
  //       max += 1;
  //     }
  //     console.log(list);
  //   }, 1000);

  //   return () => {
  //     intervalId && clearInterval(intervalId);
  //   };
  // }, []);

  const handleClickBanner = (item) => {
    // console.log("item: ", item);
    if (item?.type === 1) {
      dispatch(actions.setCurSongId(item.encodeId));
      dispatch(actions.play(true));
      dispatch(actions.setPlaylist(null));
    } else if (item?.type === 4) {
      // console.log(item);
      const albumPath = item?.link?.split(".")[0];
      // console.log("albumPath", albumPath);
      navigate(albumPath);
    } else {
      dispatch(actions.setPlaylist(null));
    }
  };

  return (
    <div className="flex gap-4 w-full overflow-hidden px-[59px] pt-8 ">
      {banner?.map((item) => (
        <img
          key={item.encodeId}
          src={item.banner}
          onClick={() => handleClickBanner(item)}
          className="slider-item flex-1 object-contain w-1/3 rounded-lg"
        />
      ))}
    </div>
  );
};

export default Slider;
