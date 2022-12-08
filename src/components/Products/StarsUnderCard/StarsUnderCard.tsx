import React from "react";
import { BsFillStarFill, BsStar, BsStarHalf } from "react-icons/bs";
import "./StarsUnderCard.scss";
type StarsUnderCartType = {
  rating: number;
  countRating?: number;
  isPadding?: boolean;
  type?: string;
};

export const StarsUnderCard: React.FC<StarsUnderCartType> = ({
  rating,
  countRating,
  isPadding,
  type,
}) => {
  return (
    <div className={isPadding ? "min-tp" : " mb-2"}>
      {/*    starts  */}
      <small>
        {rating === 5 ? (
          <>
            <BsFillStarFill className="me-1 ratingYellow" />
            <BsFillStarFill className="me-1 ratingYellow" />
            <BsFillStarFill className="me-1 ratingYellow" />
            <BsFillStarFill className="me-1 ratingYellow" />
            <BsFillStarFill className="me-1 ratingYellow" />
          </>
        ) : rating >= 4.1 && rating !== 5 ? (
          <>
       
            <BsFillStarFill className="me-1 ratingYellow" />
            <BsFillStarFill className="me-1 ratingYellow" />
            <BsFillStarFill className="me-1 ratingYellow" />
            <BsFillStarFill className="me-1 ratingYellow" />
            <BsStarHalf className="me-1 ratingYellow" />
          </>
        ) : rating === 4 ? (
          <>
            <BsFillStarFill className="me-1 ratingYellow" />
            <BsFillStarFill className="me-1 ratingYellow" />
            <BsFillStarFill className="me-1 ratingYellow" />
            <BsFillStarFill className="me-1 ratingYellow" />
            <BsStar className="me-1 ratingYellow" />
          </>
        ) : rating !== 4 && rating >= 3.1 ? (
          <>
            <BsFillStarFill className="me-1 ratingYellow" />
            <BsFillStarFill className="me-1 ratingYellow" />
            <BsFillStarFill className="me-1 ratingYellow" />
            <BsStarHalf className="me-1 ratingYellow" />
            <BsStar className="me-1 ratingYellow" />
          </>
        ) : rating === 3 ? (
          <>
         
            <BsFillStarFill className="me-1 ratingYellow" />
            <BsFillStarFill className="me-1 ratingYellow" />
            <BsFillStarFill className="me-1 ratingYellow" />
            <BsStar className="me-1 ratingYellow" />
            <BsStar className="me-1 ratingYellow" />
          </>
        ) : rating >= 2.1 && rating !== 3 ? (
          <>
         
            <BsFillStarFill className="me-1 ratingYellow" />
            <BsStarHalf className="me-1 ratingYellow" />
            <BsStar className="me-1 ratingYellow" />
            <BsStar className="me-1 ratingYellow" />
            <BsStar className="me-1 ratingYellow" />
          </>
        ) : rating === 2 ? (
          <>
            <BsFillStarFill className="me-1 ratingYellow" />
            <BsFillStarFill className="me-1 ratingYellow" />
            <BsStar className="me-1 ratingYellow" />
            <BsStar className="me-1 ratingYellow" />
            <BsStar className="me-1 ratingYellow" />
          </>
        ) : rating !== 2 && rating >= 1.1 ? (
          <>
            <BsFillStarFill className="me-1 ratingYellow" />
            <BsStarHalf className="me-1 ratingYellow" />
            <BsStar className="me-1 ratingYellow" />
            <BsStar className="me-1 ratingYellow" />
            <BsStar className="me-1 ratingYellow" />
          </>
        ) : rating === 1 ? (
          <>
            <BsFillStarFill className="me-1 ratingYellow" />
            <BsStar className="me-1 ratingYellow" />
            <BsStar className="me-1 ratingYellow" />
            <BsStar className="me-1 ratingYellow" />
            <BsStar className="me-1 ratingYellow" />
          </>
        ) : rating !== 1 && rating >= 0.1 ? (
          <>
            <BsStarHalf className="me-1 ratingYellow" />
            <BsStar className="me-1 ratingYellow" />
            <BsStar className="me-1 ratingYellow" />
            <BsStar className="me-1 ratingYellow" />
            <BsStar className="me-1 ratingYellow" />
          </>
        ) : (
          <>
            <BsStar className="me-1 " />
            <BsStar className="me-1 " />
            <BsStar className="me-1 " />
            <BsStar className="me-1 " />
            <BsStar className="me-1 " />
          </>
        )}

        {type !== "product" && (
          <span
            className={
              isPadding
                ? "text-muted   position-relative pt-1 prt-2"
                : "text-muted   position-absolute pt-1"
            }
          >
            {Math.round(rating * 10) / 10}
            {countRating && ` (${countRating})`}
          </span>
        )}
      </small>
      {type === "product" && (
        <span className="ms-2  position-absolute " /* href="9" */>
          (
          {`${
            countRating !== undefined && countRating === 1
              ? `${countRating}  review`
              : `${countRating} reviews`
          }`}
          )
        </span>
      )}
    </div>
  );
};
