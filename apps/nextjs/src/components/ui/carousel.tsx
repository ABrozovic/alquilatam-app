import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";

import { DotButton, NextButton, PrevButton } from "./carousel-buttons";

type AutoCarouselProps = {
  minHeight?: string;
  maxHeight?: string;
  timeInSecs?: number;
  slides: {
    src: string;
    alt: string;
    blur: string;
    id: string;
    link?: string;
  }[];
};
const AutoCarousel: React.FC<AutoCarouselProps> = ({
  slides,
  minHeight,
  maxHeight,
  timeInSecs,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      breakpoints: {
        "(min-width: 768px)": { slidesToScroll: 2 },
        "(min-width: 1024px)": { slidesToScroll: 3 },
      },
    },
    [Autoplay({ delay: timeInSecs ? timeInSecs * 1000 : 8000 })],
  );
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  );
  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, setScrollSnaps, onSelect]);

  slides.length > 0 &&
    slides.length % 2 !== 0 &&
    slides.push(slides[0] as AutoCarouselProps["slides"][number]);
  return (
    <div className="relative">
      <div className="embla__dots absolute bottom-0 left-1/2 z-10 hidden w-96  -translate-x-1/2 items-center justify-center md:flex">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            selected={index === selectedIndex}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
      <div className="embla flex flex-1 items-center justify-center">
        <PrevButton
          onClick={scrollPrev}
          enabled={prevBtnEnabled}
          className="absolute left-0 z-10 -translate-y-1/2"
        />

        <div
          className="embla__viewport flex flex-1 overflow-hidden"
          ref={emblaRef}
        >
          <div className="embla__container flex h-auto flex-1 flex-row">
            {slides.map((slide) => (
              <div
                className="embla__slide relative shrink-0 grow-0 basis-full overflow-hidden px-4 md:basis-1/2 lg:basis-1/3"
                key={slide.id}
              >
                <Link href={slide.link ? `${slide.link}` : "#"}>
                  <div
                    className="relative w-full"
                    style={{
                      height: maxHeight,
                    }}
                  >
                    <Image
                      className="object-contain"
                      style={{ minWidth: "200px" }}
                      placeholder="blur"
                      blurDataURL={slide.blur}
                      alt={slide.alt}
                      src={slide.src}
                      fill
                      sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
                    />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <NextButton
          onClick={scrollNext}
          enabled={nextBtnEnabled}
          className="absolute right-0 z-10 -translate-y-1/2"
        />
      </div>
    </div>
  );
};

export default AutoCarousel;
