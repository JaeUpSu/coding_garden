import React from "react";
import { BsStarFill } from "react-icons/bs";
import { BsStarHalf } from "react-icons/bs";
import { BsStar } from "react-icons/bs";

interface Props {
  rating: number;
}

const StarRating: React.FC<Props> = ({ rating }) => {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating); // 정수 별점
    const hasHalfStar = rating % 1 >= 0.5; // 반 별점 여부

    // 정수 별점 채우기
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <BsStarFill
          key={`full_${i}`}
          style={{ display: "inline", color: "rgb(253 204 15)" }}
        />
      );
    }

    // 반 별점 채우기
    if (hasHalfStar) {
      stars.push(
        <BsStarHalf
          key="half"
          style={{ display: "inline", color: "rgb(253 204 15)" }}
        />
      );
    }

    // 빈 별점 채우기
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <BsStar
          key={`empty_${i}`}
          style={{ display: "inline", color: "rgb(253 204 15)" }}
        />
      );
    }

    return stars;
  };

  return <span className="stars">{renderStars()}</span>;
};

export default StarRating;
