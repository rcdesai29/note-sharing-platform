// src/pages/UploadPage.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UploadForm from "../components/UploadForm";

function UploadPage() {
  const { id } = useParams(); // Class ID from URL
  console.log("Class ID in UploadPage:", id);
  const [className, setClassName] = useState("");

  useEffect(() => {
    const fetchClass = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/classes/${id}`);
        const data = await response.json();
        if (response.ok) {
          setClassName(data.name);
        } else {
          console.error("Error fetching class:", data.message);
        }
      } catch (error) {
        console.error("An error occurred while fetching class:", error);
      }
    };

    fetchClass();
  }, [id]);

  return (
    <div>
      <h2>Upload Notes for {className}</h2>
      <UploadForm classId={id} />
    </div>
  );
}

export default UploadPage;
