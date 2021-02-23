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

  const handlePrevSlide = () => {
    if (swiper) swiper.slidePrev();
  };

  const handleNextSlide = () => {
    if (swiper) swiper.slideNext();
  };

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

      <div
        role="button"
        tabIndex={0}
        className="cursor-pointer absolute z-10"
        onClick={handlePrevSlide}
        onKeyDown={handlePrevSlide}
      >
        <ChevronLeft aria-label="Previous slide" />
      </div>

      <div
        role="button"
        tabIndex={0}
        className="cursor-pointer absolute right-0 z-10"
        onClick={handleNextSlide}
        onKeyDown={handleNextSlide}
      >
        <ChevronRight className="float-right" aria-label="Next slide" />
      </div>
    </div>
  );
};

export default HomeHighlightsSlider;
