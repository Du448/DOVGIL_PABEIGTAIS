"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/lib/utils";

export function Carousel({ className, options, children, ...props }) {
  const [emblaRef] = useEmblaCarousel(options);
  return (
    <div className={cn("relative", className)} {...props}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="-ml-4 flex touch-pan-x">
          {React.Children.map(children, (child) => (
            <div className="min-w-0 pl-4">
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CarouselItem({ className, children, ...props }) {
  return (
    <div className={cn("shrink-0", className)} {...props}>
      {children}
    </div>
  );
}
