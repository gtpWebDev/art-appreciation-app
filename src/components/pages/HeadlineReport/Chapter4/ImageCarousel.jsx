import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// material UI
import Box from "@mui/material/Box";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function ImageCarousel({ images }) {
  return (
    <Box
      sx={{
        // width: "100%",
        height: "100%",
        maxWidth: "800px",
        margin: "0 auto",
        padding: 2,
        "& .swiper-pagination-bullet": {
          backgroundColor: "primary.main",
        },
        "& .swiper-button-next, & .swiper-button-prev": {
          color: "primary.main",
        },
      }}
    >
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: false,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 8,
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Box
              component="img"
              src={image}
              alt={`Slide ${index + 1}`}
              sx={{
                // width: "100%",
                height: "100%",
                // objectFit: "cover",
                borderRadius: 1,
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
