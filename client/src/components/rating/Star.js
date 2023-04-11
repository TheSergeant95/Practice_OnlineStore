import React, { useContext } from "react";

import { StarRatingContext } from './RatingStarComponent.js';

function Star({ value }) {
  const {
    emptyColor,
    fillColor,
    height,
    hover,
    rating,
    setHover,
    setRating,
    width,
  } = useContext(StarRatingContext);

  return (
    <div
      className="star"
      data-star={value}
      onClick={setRating}
      onMouseEnter={setHover}
      onMouseLeave={setHover}
    >
      <svg className="star-symbol"
        fill={value <= (hover || rating) ? fillColor : emptyColor}
        height={height}
        viewBox="0 0 21 21"
        width={width}
      >
        <polygon
          strokeWidth="0"
          points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78"
        />
      </svg>
    </div>
  );
}

export default Star;