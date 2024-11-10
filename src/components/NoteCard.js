// src/components/NoteCard.js
import React from "react";

function NoteCard({ note }) {
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
    </div>
  );
}

export default NoteCard;
