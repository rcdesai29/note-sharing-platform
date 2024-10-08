// src/pages/ClassPage.js
import React from "react";
import { useParams } from "react-router-dom";
import NoteCard from "../components/NoteCard";
import { Link } from "react-router-dom";

function ClassPage() {
  const { id } = useParams();
  const notes = [
    // Fetch notes based on class ID
    {
      id: 1,
      title: "Lecture 1 Notes",
      content: "Introduction to...",
      fileUrl: "#",
    },
    // ... more notes
  ];

  return (
    <div>
      <h2>Class Name</h2>
      <Link to={`/upload/${id}`}>Upload Notes</Link>
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  );
}

export default ClassPage;
