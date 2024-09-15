import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./basicprogrammingconcepts.css";

const ConceptCard = ({ id, title, funFact }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/tutorials/basicProgrammingConcepts/${id}/${title}`)}
      key={id}
      className="conceptCard"
    >
      <label>{title}</label>
      <p>
        {funFact.slice(0, 100)}
        {funFact.length > 100 && "..."}
      </p>
    </div>
  );
};

// Array of basic programming concepts

// Main component to render all concept cards
const BasicProgrammingConcepts = () => {
  const [concepts, setConcepts] = useState([]);

  useEffect(() => {
    const fetchConcepts = async () => {
      try {
        // Fetch the list of problems for the current level
        const response = await axios.get(
          `http://localhost:8080/concepts/getAllConcepts`
        );

        setConcepts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching concepts:", error);
      }
    };

    fetchConcepts();
  }, []);
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Basic Programming Concepts</h1>
      <div style={styles.cardContainer}>
        {concepts
          .sort((a, b) => a.id - b.id) // Sort by id in ascending order
          .map((concept) => (
            <ConceptCard
              key={concept.id}
              id={concept.id}
              title={concept.title}
              funFact={concept.funFact}
            />
          ))}
      </div>
    </div>
  );
};

// Simple inline styles for layout
const styles = {
  container: {
    textAlign: "center",
    padding: "0rem 10rem 2rem 10rem",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "20px",
  },
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "#f0f8ff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
};

export default BasicProgrammingConcepts;
