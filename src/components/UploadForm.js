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
  background-color: ${colors.gold};
  color: ${colors.text};
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

function UploadForm() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    file: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
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
        onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })}
      />
      <Button type="submit">Upload Note</Button>
    </Form>
  );
}

export default UploadForm;
