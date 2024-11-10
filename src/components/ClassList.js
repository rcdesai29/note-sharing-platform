// src/components/ClassList.js
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  margin: 10px 0;
`;

function ClassList({ classes }) {
  return (
    <List>
      {classes.map((cls) => (
        <ListItem key={cls._id}>
          <Link to={`/class/${cls._id}`}>{cls.name}</Link>
        </ListItem>
      ))}
    </List>
  );
}

export default ClassList;
