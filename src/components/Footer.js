// src/components/Footer.js
import React from "react";
import styled from "styled-components";
import { colors } from "../theme";

const FooterContainer = styled.footer`
  background-color: #085434; 
  padding: 10px;
  text-align: center;
`;

const Text = styled.p`
  color: ${colors.text};
  margin: 0;
`;

function Footer() {
  return (
    <FooterContainer>
      <Text>&copy; 2024 NoteShare</Text>
    </FooterContainer>
  );
}

export default Footer;
