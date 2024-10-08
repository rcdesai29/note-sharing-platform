// src/components/NoteCard.js
import React from "react";
import styled from "styled-components";
import { colors } from "../theme";

const Card = styled.div`
  border: 1px solid ${colors.pastelGreen};
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 15px;
`;

function NoteCard({ note }) {
  return (
    <Card>
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <a href={note.fileUrl} download>
        Download Note
      </a>
    </Card>
  );
}

export default NoteCard;
