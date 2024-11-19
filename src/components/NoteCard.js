// src/components/NoteCard.js
import React from "react";
import FollowButton from "./FollowButton";
import Rating from "./Rating";

function NoteCard({ note, currentUserId, isSignedIn, token }) {
  return (
    <div>
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      
      {note.filePath && (
        <a
          href={`http://localhost:5001/${note.filePath}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Download File
        </a>
      )}
      
      <FollowButton userId={currentUserId} noteUserId={note.userId} />
      <Rating noteId={note._id} initialRating={note.rating} initialRatingCount={note.ratingCount} isSignedIn={isSignedIn} token={token} />
    </div>
  );
}

export default NoteCard;