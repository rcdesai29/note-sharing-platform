// src/components/Rating.js
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const Star = styled.span`
  cursor: pointer;
  color: ${props => (props.filled ? "#FFD700" : "#ddd")};
`;

function Rating({ noteId, initialRating, initialRatingCount }) {
  const [rating, setRating] = useState(initialRating);
  const [ratingCount, setRatingCount] = useState(initialRatingCount);

  const handleRating = async (newRating) => {
    setRating(newRating); // Update local state immediately
    try {
      const response = await axios.patch(`/api/notes/${noteId}/rate`, { rating: newRating });
      setRating(response.data.rating); // Update state with server response
      setRatingCount(response.data.ratingCount); // Update rating count
    } catch (error) {
      console.error("Error updating rating:", error);
    }
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          filled={star <= rating}
          onClick={() => handleRating(star)}
        >
          ★
        </Star>
      ))}
      <p>{ratingCount} {ratingCount === 1 ? "rating" : "ratings:"}</p>
    </div>
  );
}

export default Rating;