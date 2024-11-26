import React from "react";
import styled from "styled-components";

const NavbarContainer = styled.nav`
  background-color: #085434; /* Updated color */
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between; /* Space between logo/title and nav items */
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: flex-end; /* Align items to the right */
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  a {
    color: #ffffff; /* Updated color to white */
    text-decoration: none;
    margin-left: 20px; /* Add some space between the items */
  }
`;

const Logo = styled.img`
  height: 40px; /* Adjust the height as needed */
  width: auto;
`;

const Title = styled.h1`
  color: #ffffff; /* Updated color to white */
  margin: 0;
  margin-left: 20px; /* Add some space between the image and the title */
  font-family: sans-serif; /* Change font to sans-serif */
`;

const SlimBar = styled.div`
  width: 100%;
  height: 5px; /* Adjust the height as needed */
  background-color: #a89464; /* Slim bar color */
`;

const Navbar = () => {
  return (
    <>
      <NavbarContainer>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Logo src="/Screenshot_19-11-2024_15010_selfservice.uncc.edu.jpeg" alt="Logo" /> {/* Update the src with the path to your image */}
          <Title>NoteShare</Title>
        </div>
        <NavList>
          <NavItem><a href="../">Home</a></NavItem>
          <NavItem><a href="./SignUp">Sign Up</a></NavItem>
          <NavItem><a href="./Login">Login</a></NavItem>
          <NavItem><a href="./Feedback">Feedback</a></NavItem>
        </NavList>
      </NavbarContainer>
      <SlimBar />
    </>
  );
}

export default Navbar;