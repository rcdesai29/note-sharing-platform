// src/pages/HomePage.js
import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import ClassList from "../components/ClassList";

function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [classes, setClasses] = useState([]); // Initialize state for classes

  // useEffect to fetch classes from backend when component mounts
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/classes'); // Updated URL
        const data = await response.json();
        setClasses(data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };    

    fetchClasses(); // Call the function to fetch classes
  }, []); // Empty dependency array ensures this only runs once on mount

  // Filter the fetched classes based on the search term
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
