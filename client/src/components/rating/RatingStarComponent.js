
import React, {useState, createContext} from "react";
import PropTypes from 'prop-types';

import StarRatingLabel from "./RatingLabelComponent.js";
import StarsList from "./StarsList.js";

export const StarRatingContext = createContext();

export default function StarRating({
  defaultState,
  emptyColor,
  fillColor,
  height,
  labelText,
  maxValue,
  onChangeHover,
  onChangeValue,
  readOnly,
  width,
}) {
  const [rating, setRating] = useState(defaultState);
  const [hover, setHover] = useState(null);

  const setRatingFunc = (e) => {
    if (readOnly) return;
	const value = e.currentTarget.dataset.star;
    setRating(value);
    onChangeValue(value);
	
  }

  const setHoverFunc = (e) => {
    if (readOnly) return;
	const value = e.type === 'mouseleave' ? null : e.currentTarget.dataset.star;
    setHover(value);
    onChangeHover(value);
  }

  return (
    <>
      <StarRatingContext.Provider
        value={{
          emptyColor,
          fillColor,
          height,
          hover,
          labelText,
          rating,
          setHover: setHoverFunc,
          setRating: setRatingFunc,
          width,
          maxValue,
        }}
      >
        <>
          <StarRatingLabel />
          <StarsList />
        </>
      </StarRatingContext.Provider>
    </>
  );
}

StarRating.propTypes = {
  defaultState: PropTypes.number,
  emptyColor: PropTypes.string,
  fillColor: PropTypes.string,
  height: PropTypes.number,
  labelText: PropTypes.func,
  maxValue: PropTypes.number,
  onChangeHover: PropTypes.func,
  onChangeValue: PropTypes.func,
  readOnly: PropTypes.bool,
  width: PropTypes.number,
};

StarRating.defaultProps = {
  defaultState: 0,
  emptyColor: "grey",
  fillColor: "#edaa10",
  height: 33,
  labelText: (value) => `Оценить товар: ${value}`,
  maxValue: 5,
  onChangeHover: () => {},
  onChangeValue: () => {},
  readOnly: false,
  width: 33,
};