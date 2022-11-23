import React, { useState } from "react";

export const Stars = () => {
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState<null | number>(null);
  let maxValue = 5;
  /* css:
.rating-color{
  color:#fbc634 !important;
} */
  return (
    <div className="ratings">
      <div>{rating}</div>
      <div className="row">
        {[...Array(maxValue)].map((star, index) => {
          const value = index + 1;

          return (
            <div
              className="star"
              onClick={() => setRating(value)}
              onMouseEnter={() => setHover(value)}
              onMouseLeave={() => setHover(null)}
            >
              <svg
                fill={value <= (hover || rating) ? "yellow" : "black"}
                height={20}
                viewBox="0 0 25 25"
                width={200}
              >
                <polygon
                  strokeWidth="0"
                  points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78"
                />
              </svg>
            </div>
          );
        })}
      </div>
    </div>
  );
};
