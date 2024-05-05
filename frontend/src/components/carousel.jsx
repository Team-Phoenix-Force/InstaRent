"use client";
import i1 from "../assets/1.jpg";
import i2 from "../assets/2.png";
import i3 from "../assets/3.jpg";
import i4 from "../assets/4.jpeg";
import { Carousel } from "keep-react";

export const CarouselComponent = () => {
  return (
    <div className="h-56 w-full sm:h-64 xl:h-96 2xl:h-96">
      <Carousel slideInterval={5000} showControls={true} indicators={true}>
        <img src={i1} alt="slider-1" height={400} width={850} />
        <img src={i2} alt="slider-2" height={400} width={850} />
        <img src={i3} alt="slider-3" height={400} width={850} />
        <img src={i4} alt="slider-4" height={400} width={850} />
      </Carousel>
    </div>
  );
};
