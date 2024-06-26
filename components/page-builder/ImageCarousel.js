import React, { useState, useEffect, useCallback, useRef } from "react";
import { CarouselLeft } from "../icons/CarouselLeft";
import { CarouselRight } from "../icons/CarouselRight";
import { CarouselDot } from "../icons/CarouselDot";
import useEmblaCarousel from "embla-carousel-react";
import parse from "html-react-parser";
import Image from "next/image";
import styles from "../../styles/page-builder/ImageCarousel.module.scss";
import AutoHeight from "embla-carousel-auto-height";
 
export default function ImageCarousel({ data }) {
  const [viewportRef, embla] = useEmblaCarousel(
    { loop: true, skipSnaps: false },
    [AutoHeight({ destroyHeight: "auto" })]
  );

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
  const scrollTo = useCallback(
    (index) => embla && embla.scrollTo(index),
    [embla]
  );

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap());
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla, setSelectedIndex]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    setScrollSnaps(embla.scrollSnapList());
    embla.on("select", onSelect);
  }, [embla, setScrollSnaps, onSelect]);

  return (
    <>
      <div className={styles.carousel}>
        <div className={styles.carouselViewport} ref={viewportRef}>
          <div className={styles.carouselContainer}>
            {Object.keys(data).map((index) => {
              return (
                <div className={styles.slide} key={index}>
                  <div className={styles.slideInner}>
                    <Image
                      src={parse(data[index].image["url"])}
                      alt={parse(data[index].image["alt"])}
                      title={parse(data[index].image["title"])}
                      width={data[index].image["sizes"]["large-width"]}
                      height={data[index].image["sizes"]["large-height"]}
                      layout="responsive"
                      placeholder="blur"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN88x8AAt0B7bEE+qwAAAAASUVORK5CYII="
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <CarouselLeft
          onClick={scrollPrev}
          enabled={prevBtnEnabled}
          className={styles.prev}
        />
        <CarouselRight
          onClick={scrollNext}
          enabled={nextBtnEnabled}
          className={styles.next}
        />
      </div>
      <div className={styles.info}>
        {Object.keys(data).map((index) => {
          return (
            <div
              key={index}
              className={index == selectedIndex ? styles.selected : ""}
            >
              <span>{parse(data[index].image["caption"])}</span>
              <span>{parseInt(index) + 1 + "/" + data.length}</span>
            </div>
          );
        })}
      </div>
      <div className={styles.carouselDots}>
        {scrollSnaps.map((_, index) => (
          <CarouselDot
            key={index}
            selected={index === selectedIndex}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
    </>
  );
}
