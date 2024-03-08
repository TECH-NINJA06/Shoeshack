import * as React from "react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { CAROUSEL } from "@/lib/carousalItem"

export function HeroCarousal() {
  return (
    <div className="h-[70vh] w-screen flex justify-center items-center">
        <Carousel>
      <CarouselContent className="w-[89vw]">
        {CAROUSEL.map((item, index) => (
          <CarouselItem key={index}>
            <div className="flex justify-center items-center bg-red-400 h-[70vh]">
              <span>{item.title}</span>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
    </div>
    
  )
}
