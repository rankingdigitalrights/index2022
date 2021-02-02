import slugify from "@sindresorhus/slugify";
import React, {useState} from "react";
import {Swiper as SwiperType} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";

import ChevronLeft from "../images/icons/chevron-left.svg";
import ChevronRight from "../images/icons/chevron-right.svg";
import {CompanyHighlight} from "../types";
import HighlightsSlide from "./highlights-slide";

interface HomeHighlightsSliderProps {
  highlights: CompanyHighlight[];
}

const HomeHighlightsSlider = ({highlights}: HomeHighlightsSliderProps) => {
  const [swiper, setSwiper] = useState<SwiperType>();

  return (
    <div className="relative w-full flex items-center">
      <div className="w-full">
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          onSwiper={(s) => setSwiper(s)}
          pagination={{clickable: true}}
          loop
        >
          {highlights.map((highlight) => {
            const key = slugify(highlight.title);
            return (
              <SwiperSlide key={key}>
                <HighlightsSlide key={key} highlight={highlight} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      <div className="cursor-pointer absolute z-10">
        <ChevronLeft
          onClick={() => {
            if (swiper) swiper.slidePrev();
          }}
        />
      </div>

      <div className="cursor-pointer absolute right-0 z-10">
        <ChevronRight
          className="float-right"
          onClick={() => {
            if (swiper) swiper.slideNext();
          }}
        />
      </div>
    </div>
  );
};

export default HomeHighlightsSlider;
