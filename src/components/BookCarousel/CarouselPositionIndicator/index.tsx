
interface IBookPositionProps {
  positions: {
    active: boolean;
    id: number;
  }[];
}

const CarouselPositionIndicator = ({ positions }: IBookPositionProps) => {
  return (
    <div className="carousel-position-container">
      {positions.map((position, index) => (
        <span className={position.active ? "active" : ""} key={index} />
      ))}
    </div>
  );
};

export default CarouselPositionIndicator;
