import { useEffect, useState } from "react";
import "./index.scss";

interface IStyle {
  backgroundColor?: string;
}

interface IStarProps {
  ratio: number;
  parentProps?: IStyle;
  childProps?: IStyle;
}

const Star = ({ ratio, parentProps, childProps }: IStarProps) => {
  return (
    <div className="star-container" style={parentProps}>
      <div
        className="star-glider"
        style={{
          ...childProps,
          transform: `translateX(${(1 - ratio) * -16.78}px)`,
        }}
      />
    </div>
  );
};

interface IStarsProps {
  backgroundColor?: string;
  color?: string;
  rating?: number;
}

const Stars = ({ rating, color, backgroundColor }: IStarsProps) => {
  const [state, setState] = useState<number[] | []>([]);

  const parentProps = { backgroundColor };
  const childProps = { backgroundColor: color };

  if(backgroundColor) parentProps.backgroundColor = backgroundColor;
  if(color) childProps.backgroundColor = color;

  useEffect(() => {
    const whole = Math.floor(Number(rating));
    const fraction = Number(rating) - whole;

    const stars = [];
    for (let i = 0; i < whole; i++) {
      stars.push(1);
    }
    if (fraction) {
      stars.push(fraction);
    }
    while (stars.length < 5) {
      stars.push(0);
    }
    setState(stars);
  }, [rating]);

  return (
    <div className="star-wrapper">
      {state.map((ratio, i) => (
        <Star key={i + 1} ratio={ratio} childProps={childProps} parentProps={parentProps} />
      ))}
    </div>
  );
};

export default Stars;
