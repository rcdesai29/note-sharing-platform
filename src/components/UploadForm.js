// src/components/UploadForm.js
import React, { useState } from "react";
import styled from "styled-components";
import { colors } from "../theme";

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid ${colors.pastelGreen};
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid ${colors.pastelGreen};
  border-radius: 5px;
`;

const Button = styled.button`
  background-color: #085434; /* Updated color */
  color: #ffffff; /* Updated text color to white */
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

function UploadForm({ classId }) {
  // Accept classId as a prop
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    file: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.content || !formData.file) {
      alert("Please fill in all fields and select a file.");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("content", formData.content);
    data.append("file", formData.file);
    data.append("classId", classId);

    // Log form data entries for debugging
    console.log("FormData entries:");
    for (let pair of data.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    try {
      const response = await fetch("http://localhost:5001/api/notes", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Note uploaded successfully:", result);
        setFormData({ title: "", content: "", file: null });
        alert("Note uploaded successfully!");
      } else {
        console.error("Upload failed:", result.message);
        alert(`Upload failed: ${result.message}`);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred during the upload.");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Note Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />
      <TextArea
        placeholder="Note Description"
        value={formData.content}
        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
      />
      <Input
        type="file"
        accept=".pdf, .doc, .docx, .txt"
        onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })}
      />
      {formData.file && <p>Selected file: {formData.file.name}</p>}
      <Button type="submit">Upload Note</Button>
    </Form>
  );
}

export default UploadForm;
