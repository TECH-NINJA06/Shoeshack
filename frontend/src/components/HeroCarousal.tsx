import * as React from "react";
import Autoplay from "embla-carousel-autoplay"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CAROUSEL } from "@/lib/carousalItem";

export function HeroCarousal() {
  return (
    <div className="sm:h-[70vh] h-[30vh] w-screen flex justify-center items-center">
      <Carousel plugins={[Autoplay({delay: 5000})]}>
        <CarouselContent className="w-[89vw]">
          {CAROUSEL.map((item, index) => (
            <CarouselItem key={index}>
              <div className="flex justify-center items-center bg-red-400 sm:h-[70vh] h-[30vh]">
                <img src={`/carousal${index+1}`} alt="carousal_images" className="size-full"/>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
