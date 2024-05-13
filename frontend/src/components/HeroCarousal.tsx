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
    <div className="h-[70vh] w-screen flex justify-center items-center">
      <Carousel plugins={[Autoplay({delay: 2000})]}>
        <CarouselContent className="w-[89vw]">
          {CAROUSEL.map((item, index) => (
            <CarouselItem key={index}>
              <div className="flex justify-center items-center bg-red-400 h-[70vh]">
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
