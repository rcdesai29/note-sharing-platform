// src/pages/ClassPage.js
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import NoteCard from "../components/NoteCard";

function ClassPage() {
  const { id } = useParams(); // Class ID from URL
  const [notes, setNotes] = useState([]);
  const [className, setClassName] = useState("");
  const [loading, setLoading] = useState(true); // New state for loading
  const [error, setError] = useState(null); // New state for error

  useEffect(() => {
    const fetchClassAndNotes = async () => {
      try {
        setLoading(true); // Start loading

        // Fetch class details
        const classResponse = await fetch(
          `http://localhost:5001/api/classes/${id}`
        );
        const classData = await classResponse.json();
        if (classResponse.ok) {
          setClassName(classData.name);
        } else {
          console.error("Error fetching class:", classData.message);
          setError("Error fetching class details");
          return; // Exit early if there's an error
        }

        // Fetch notes for the class
        const notesResponse = await fetch(
          `http://localhost:5001/api/notes/class/${id}`
        );
        const notesData = await notesResponse.json();
        if (notesResponse.ok) {
          setNotes(notesData);
        } else {
          console.error("Error fetching notes:", notesData.message);
          setError("Error fetching notes");
        }
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
        setError("An error occurred while fetching data");
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchClassAndNotes();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>; // Display a loading message
  }

  if (error) {
    return <p>{error}</p>; // Display an error message
  }

  return (
    <div>
      <h2>{className}</h2>
      <Link to={`/upload/${id}`}>Upload Notes</Link>
      {notes.length > 0 ? (
        notes.map((note) => <NoteCard key={note._id} note={note} />)
      ) : (
        <p>No notes available for this class.</p>
      )}
    </div>
  );
}

export default ClassPage;
