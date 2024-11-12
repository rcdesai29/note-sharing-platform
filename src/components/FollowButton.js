// src/components/FollowButton.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FollowButton({ userId, noteUserId }) {
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    // Fetch the follow status when the component mounts
    const checkFollowingStatus = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}/isFollowing/${noteUserId}`);
        setIsFollowing(response.data.isFollowing);
      } catch (error) {
        console.error("Error checking following status:", error);
      }
    };

    checkFollowingStatus();
  }, [userId, noteUserId]);

  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        await axios.post(`/api/users/${userId}/unfollow`, { targetUserId: noteUserId });
      } else {
        await axios.post(`/api/users/${userId}/follow`, { targetUserId: noteUserId });
      }
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error("Error toggling follow status:", error);
    }
  };

  return (
    <button onClick={handleFollowToggle}>
      {isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  );
}

export default FollowButton;
