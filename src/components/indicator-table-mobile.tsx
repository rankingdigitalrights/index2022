import c from "clsx";
import React, {useState} from "react";
import {Swiper as SwiperType} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";

import ChevronLeft from "../images/icons/chevron-left.svg";
import ChevronRight from "../images/icons/chevron-right.svg";
import ElementDescription from "./element-description";
import IndicatorElementTag from "./indicator-element-tag";
import {IndicatorTableProps} from "./indicator-table-desktop";

const IndicatorTableMobile = ({
  indicatorLabel,
  averages,
  companyElements,
  literalValues,
  elementDescriptions,
  services,
}: IndicatorTableProps) => {
  const [swiper, setSwiper] = useState<SwiperType>();

  const templateService = services[0] && companyElements[services[0].id];

  const handlePrevSlide = () => {
    if (swiper) swiper.slidePrev();
  };

  const handleNextSlide = () => {
    if (swiper) swiper.slideNext();
  };

  if (!templateService) return <div />;

  return (
    <div className="flex flex-col">
      <div className="w-full px-1 py-4 bg-white border border-disabled-dark leading-tight font-sans">
        <span>{indicatorLabel}</span>
      </div>

      <div className="w-full">
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          onSwiper={(s) => setSwiper(s)}
        >
          {services.map((service, idx) => {
            const elements = companyElements[service.id];
            const average = averages[service.id] || "NA";
            if (!elements) return <div key={service.id} />;

            const isFirstService = idx === 0;
            const isLastService = idx + 1 === services.length;

            return (
              <SwiperSlide key={`slide-${service.id}`}>
                {elements.map((element, eIdx) => {
                  const isFirstElement = eIdx === 0;

                  const elementDescription = elementDescriptions.find(
                    (e) => e.id === element.name,
                  )?.description;

                  const elementClassName = {
                    "border-l border-b border-r border-disabled-dark": isFirstElement,
                    "border border-disabled-dark": !isFirstElement,
                  };

                  return (
                    <div
                      key={`slide-${service.id}-${element.id}`}
                      className="flex flex-col text-sm"
                    >
                      <div className={c("px-1 py-2", elementClassName)}>
                        {elementDescription && (
                          <span className="element">
                            {eIdx + 1}.{" "}
                            <ElementDescription
                              description={elementDescription}
                            />
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-3 mb-3">
                        <div
                          role="button"
                          tabIndex={0}
                          className="slider-button cursor-pointer w-1/12"
                          onClick={handlePrevSlide}
                          onKeyDown={handlePrevSlide}
                          aria-label="Previous slide"
                        >
                          {!isFirstService && (
                            <ChevronLeft aria-label="Previous slide icon" />
                          )}
                        </div>

                        <div className="flex justify-around items-center w-10/12">
                          <span className="text-center font-sans w-5/12">
                            {service.name}
                          </span>

                          <div className="w-5/12">
                            <IndicatorElementTag
                              score={element.score}
                              value={element.value}
                              activeTag={literalValues ? "score" : "value"}
                            />
                          </div>
                        </div>

                        <div
                          role="button"
                          tabIndex={0}
                          className="slider-button cursor-pointer w-1/12"
                          onClick={handleNextSlide}
                          onKeyDown={handleNextSlide}
                          aria-label="Next slide"
                        >
                          {!isLastService && (
                            <ChevronRight
                              className="float-right"
                              aria-label="Next slide icon"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div className="flex justify-between items-center pl-1 pr-1 border-t border-b border-disabled-dark">
                  <div className="w-1/12" />
                  <div className="flex justify-around items-center w-10/12">
                    <span className="font-bold font-sans text-center p-2 w-5/12">
                      Average
                    </span>
                    <span className="pl-10 p-2 w-5/12 font-sans">
                      {average}
                    </span>
                  </div>
                  <div className="w-1/12" />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default IndicatorTableMobile;
