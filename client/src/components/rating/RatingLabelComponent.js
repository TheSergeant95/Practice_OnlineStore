import React, { useContext } from "react";

import { StarRatingContext } from "./RatingStarComponent.js";

function StarRatingLabel() {
  const { rating, labelText } = useContext(StarRatingContext);

  return (
    <div style={{fontSize: '25px'}}>{labelText(rating)}</div>
  );
}

export default StarRatingLabel;