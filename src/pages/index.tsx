import React, {useState} from "react";
import {Swiper as SwiperType} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";

import Layout from "../components/layout";
import ChevronLeft from "../images/icons/chevron-left.svg";
import ChevronRight from "../images/icons/chevron-right.svg";

const Home = () => {
  const [swiper, setSwiper] = useState<SwiperType>();

  return (
    <Layout>
      <div className="relative">
        <div className="absolute flex flex-row w-full h-full top-0">
          <div className="md:w-1/2 w-full md:bg-accent-pink" />
          <div className="md:w-1/2 w-full md:bg-rdr" />
        </div>

        <div className="md:container md:mx-auto flex flex-col md:flex-row md:justify-between">
          <div className="md:w-1/3 h-64 bg-accent-pink z-10 border">AAA</div>
          <div className="md:w-1/3 h-64 bg-diff-add z-10 border">AAA</div>
          <div className="md:w-1/3 h-64 bg-rdr z-10 border">AAA</div>
        </div>
      </div>

      <div className="md:container md:mx-auto flex flex-col md:flex-row md:justify-between my-6">
        <div className="md:w-1/3 h-64 border">AAA</div>
        <div className="md:w-2/3 h-64 border">AAA</div>
      </div>

      <div className="md:container md:mx-auto flex flex-col md:flex-row md:justify-between">
        <div className="md:w-1/3 h-64 border">AAA</div>
        <div className="md:w-1/3 h-64 border">AAA</div>
        <div className="md:w-1/3 h-64 border">AAA</div>
      </div>

      <div className="md:container md:mx-auto flex flex-row md:justify-between items-center my-6">
        <div className="relative w-full flex items-center">
          <div className="w-full">
            <Swiper
              spaceBetween={50}
              slidesPerView={3}
              onSwiper={(s) => setSwiper(s)}
              pagination={{clickable: true}}
              loop
            >
              <SwiperSlide>
                <div className="h-64 border">A</div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="h-64 border">B</div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="h-64 border">C</div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="h-64 border">D</div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="h-64 border">E</div>
              </SwiperSlide>
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
      </div>
    </Layout>
  );
};

export default Home;
