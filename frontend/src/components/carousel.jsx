// import Swiper core and required modules
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { EffectCoverflow } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export const Carousel = ({ slides = [] }) => {
  return (
    <Swiper
      loop={slides.length > 1}
      autoplay={{
        delay: 6000,
        disableOnInteraction: false,
      }}
      className="swiper_container w-full"
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      pagination={{ clickable: false }}
      navigation
      style={{
        "--swiper-pagination-color": "#ffffff",
        "--swiper-navigation-color": "#ffffff",
      }}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="bg-white/10 p-4 rounded-xl h-180 w-200 mx-auto">
            <h1 className="text-2xl font-semibold mb-2 uppercase">
              {slide.titulo}
            </h1>
            <p className="text-offwhite text-lg">{slide.subtitulo}</p>
            {slide.src && (
              <img
                src={slide.src}
                alt={slide.titulo}
                className="mt-5 rounded-lg w-full h-140 object-cover" // Ajustando o tamanho da imagem
              />
            )}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
