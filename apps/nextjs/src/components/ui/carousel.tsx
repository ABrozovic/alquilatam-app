import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";

import { NextButton, PrevButton } from "./carousel-buttons";

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
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: timeInSecs ? timeInSecs * 1000 : 2000 }),
  ]);
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
    <div className="flex flex-1">
      <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
      <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
      <div
        className="embla__viewport flex h-96 flex-1 overflow-hidden"
        ref={emblaRef}
        style={{
          minHeight: minHeight,
          maxHeight: maxHeight,
        }}
      >
        <div className="embla__container flex flex-1 flex-row">
          {slides.map((slide) => (
            <div
              className="embla__slide relative w-1/3 flex-shrink-0 flex-grow-0"
              key={slide.id}
            >
              <Link href={slide.link ? `${slide.link}` : "#"}>
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: maxHeight,
                  }}
                >
                  <Image
                    placeholder="blur"
                    blurDataURL={slide.blur}
                    style={{ objectFit: "contain" }}
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
    </div>
  );
};

export default AutoCarousel;
