import { useEffect, useState, useRef, useCallback } from "react";
import { useQuery } from "@apollo/client";

import { GET_FEATURED_BOOKS } from "../../gql/queries";
import FeaturedBookCard from "../FeaturedBookCard";
import { IFeaturedBooks } from "../../interfaces";
import { HorizontalSkeletonLoader } from "../Loaders";
import CarouselPositionIndicator from "./CarouselPositionIndicator";
import "./index.scss";
import { useAppData } from "../../hooks/useAppData";

interface IBookPosition {
  active: boolean;
  id: number;
}

const BookCarousel = () => {
  const [state, setState] = useState({
    scrollValue: 0,
    clickValue: 0,
  });
  const { books } = useAppData();
  const [positions, setPositions] = useState<IBookPosition[]>([]);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const { loading, data } = useQuery(GET_FEATURED_BOOKS, {
    variables: {
      where: { featured: true },
    },
  });

  const resolvedFeaturedData = data?.books || books.filter(({ featured }) => featured)

  const getResolvedScreenValues = useCallback(() => {
    const numberOfFeaturedBooks = resolvedFeaturedData.length;
    const windowWidth = window.innerWidth;
    const bookWidth = windowWidth <= 768 ? 145 : 240;
    const scrollWidth = carouselRef.current?.scrollWidth;
    const visibleBooksOnscreen = Math.floor(windowWidth / bookWidth);
    const maxClickable = numberOfFeaturedBooks - visibleBooksOnscreen;

    return {
      numberOfFeaturedBooks,
      windowWidth,
      bookWidth,
      scrollWidth,
      visibleBooksOnscreen,
      maxClickable,
    };
  }, [resolvedFeaturedData.length]);

  const handleClick = (direction: number) => {
    const { scrollWidth, visibleBooksOnscreen, maxClickable, bookWidth } =
      getResolvedScreenValues();

    if (!scrollWidth) return;
    if (direction === -1 && state.clickValue === 0) return;
    if (direction === +1 && state.clickValue === maxClickable) return;

    setState((prevState) => {
      const newScroll = prevState.scrollValue + direction * bookWidth;
      const newClickValue = prevState.clickValue + direction;

      carouselRef.current?.scrollTo({
        behavior: "smooth",
        left: newScroll,
      });

      setPositions((prevPositions) =>
        prevPositions.map((position, index) => ({
          ...position,
          active:
            index + 1 === newClickValue + visibleBooksOnscreen ? true : false,
        }))
      );

      return {
        ...prevState,
        scrollValue: newScroll,
        clickValue: newClickValue,
      };
    });
  };

  const initialize = useCallback(() => {
    if (resolvedFeaturedData) {
      const { visibleBooksOnscreen } = getResolvedScreenValues();
      setPositions(
        resolvedFeaturedData.map((_: IFeaturedBooks, index: number) => ({
          id: index + 1,
          active: index + 1 === visibleBooksOnscreen ? true : false,
        }))
      );
    }
  }, [resolvedFeaturedData, getResolvedScreenValues]);

  useEffect(() => {
    initialize();

    window.addEventListener("resize", initialize);

    return () => window.removeEventListener("resize", initialize);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? (
    <HorizontalSkeletonLoader />
  ) : (
    <div className="carousel-container">
      <button type="button" onClick={() => handleClick(-1)}>
        <span className="prev" />
      </button>
      <button type="button" onClick={() => handleClick(1)}>
        <span className="next" />
      </button>

      <div className="carousel" ref={carouselRef}>
        {resolvedFeaturedData.map((book: IFeaturedBooks) => (
          <div key={book.id}>
            <FeaturedBookCard book={book} />
          </div>
        ))}
      </div>

      <CarouselPositionIndicator positions={positions} />
    </div>
  );
};

export default BookCarousel;
