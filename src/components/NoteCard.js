// src/components/NoteCard.js
import React from "react";
import FollowButton from "./FollowButton";

function NoteCard({ note, currentUserId }) {
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
    </div>
  );
}

export default NoteCard;
