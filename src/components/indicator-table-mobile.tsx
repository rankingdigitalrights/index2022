import c from "clsx";
import React, {useState} from "react";
import {Swiper as SwiperType} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";

import ChevronLeft from "../images/icons/chevron-left.svg";
import ChevronRight from "../images/icons/chevron-right.svg";
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

  const templateService = services[0] && companyElements[services[0]];

  if (!templateService) return <div />;

  return (
    <div className="flex flex-col font-circular">
      <div className="w-full pl-1 pr-1 border border-disabled-dark">
        <span>{indicatorLabel}</span>
      </div>

      <div className="w-full">
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          onSwiper={(s) => setSwiper(s)}
        >
          {services.map((service, idx) => {
            const elements = companyElements[service];
            const average = averages[service] || "NA";
            if (!elements) return <div key={service} />;

            const isFirstService = idx === 0;
            const isLastService = idx + 1 === services.length;

            return (
              <SwiperSlide key={`slide-${service}`}>
                {elements.map((element, eIdx) => {
                  const isFirstElement = eIdx === 0;

                  const elementDescription =
                    elementDescriptions.find((e) => e.id === element.name)
                      ?.description || "";

                  const elementClassName = {
                    "border-l border-b border-r border-disabled-dark": isFirstElement,
                    "border border-disabled-dark": !isFirstElement,
                  };

                  return (
                    <div
                      key={`slide-${service}-${element.id}`}
                      className="flex flex-col"
                    >
                      <div className={c("pl-1 pr-1", elementClassName)}>
                        {elementDescription}
                      </div>

                      <div className="flex items-center justify-between mt-3 mb-3">
                        <div className="cursor-pointer w-1/12">
                          {!isFirstService && (
                            <ChevronLeft
                              onClick={() => {
                                if (swiper) swiper.slidePrev();
                              }}
                            />
                          )}
                        </div>

                        <div className="flex justify-around items-center w-10/12">
                          <span className="text-center w-5/12">{service}</span>

                          <div className="w-5/12">
                            <IndicatorElementTag
                              score={element.score}
                              value={element.value}
                              activeTag={literalValues ? "score" : "value"}
                            />
                          </div>
                        </div>

                        <div className="cursor-pointer w-1/12">
                          {!isLastService && (
                            <ChevronRight
                              className="float-right"
                              onClick={() => {
                                if (swiper) swiper.slideNext();
                              }}
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
                    <span className="font-bold text-center p-2 w-5/12">
                      Average
                    </span>
                    <span className="pl-10 p-2 w-5/12">{average}</span>
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
