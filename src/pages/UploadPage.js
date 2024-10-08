// src/pages/UploadPage.js
// hello world
import React from "react";
import { useParams } from "react-router-dom";
import UploadForm from "../components/UploadForm";

function UploadPage() {
  const { id } = useParams();

  return (
    <div>
      <h2>Upload Notes for Class {id}</h2>
      <UploadForm />
    </div>
  );
}

export default UploadPage;
