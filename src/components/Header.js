// src/components/Header.js
import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.header`
  background-color: #085434; 
  padding: 5px;
`;

function Header() {
  return (
    <HeaderContainer>
      {/* You can add any other content here if needed */}
    </HeaderContainer>
  );
}

export default Header;