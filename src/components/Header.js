// src/components/Header.js
import React from "react";
import styled from "styled-components";
import { colors } from "../theme";

const HeaderContainer = styled.header`
  background-color: ${colors.pastelGreen};
  padding: 20px;
`;

const Title = styled.h1`
  color: ${colors.gold};
  margin: 0;
`;

function Header() {
  return (
    <HeaderContainer>
      <Title>NoteShare</Title>
    </HeaderContainer>
  );
}

export default Header;
