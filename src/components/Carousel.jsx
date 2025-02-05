import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Carousel = ({ images }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={10}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      className="w-full max-w-xl rounded shadow-lg"
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          {/* ✅ Contenedor para aplicar el efecto de zoom con hover */}
          <div className="group relative overflow-hidden rounded-lg">
            <img
              className="rounded shadow-lg transition-transform duration-300 ease-in-out group-hover:scale-110 "
              src={image}
              alt={`Captura ${index}`}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
