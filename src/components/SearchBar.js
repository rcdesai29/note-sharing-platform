// src/components/SearchBar.js
import React from "react";
import styled from "styled-components";
import { colors } from "../theme";

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid ${colors.pastelGreen};
  border-radius: 5px;
  margin-bottom: 20px;
`;

function SearchBar({ onSearch }) {
  return (
    <Input
      type="text"
      placeholder="Search for classes..."
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}

export default SearchBar;
