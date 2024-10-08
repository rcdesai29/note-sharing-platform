// src/pages/HomePage.js
import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import ClassList from "../components/ClassList";

function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const classes = [
    { id: 1, name: "Calculus I" },
    { id: 2, name: "Physics II" },
    //Add more latter
  ];

  const filteredClasses = classes.filter((cls) =>
    cls.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <SearchBar onSearch={setSearchTerm} />
      <ClassList classes={filteredClasses} />
    </div>
  );
}

export default HomePage;
