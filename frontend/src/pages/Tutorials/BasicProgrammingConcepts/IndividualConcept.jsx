import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Collapse } from "@chakra-ui/react";
import axios from "axios";
import Lottie from "lottie-react";
import CircularProgress from "@mui/material/CircularProgress";
import learning from "../../../assets/data/animationData/learning.json";
import wrong from "../../../assets/data/animationData/wrong.json";
import arrow from "../../../assets/images/arrowDown.png";
const IndividualConcept = () => {
  const { id } = useParams();
  const [concept, setConcept] = useState([]);

  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  useEffect(() => {
    const fetchConcept = async () => {
      try {
        // Fetch the list of problems for the current level
        const response = await axios.get(
          `http://localhost:8080/concepts/getConceptById/${id}`
        );

        setConcept(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching concepts:", error);
      }
    };

    fetchConcept();
  }, []);
  console.log(id);

  if (!concept) {
    return (
      <center>
        <CircularProgress color="inherit" />
      </center>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "2rem 10rem 2rem 10rem",
        gap: "2rem",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <label style={{ fontSize: "2rem", color: "green" }}>
          {concept.title}
        </label>
        <div style={{ fontSize: "1.1rem" }}>{concept.description}</div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <label
              style={{
                fontSize: "1.1rem",
                fontWeight: "bold",
                color: "chocolate",
              }}
            >
              Example
            </label>
            <p style={{ fontSize: "1.1rem" }}>{concept.example}</p>
            <pre
              style={{
                backgroundColor: "#dedcdc",
                padding: "10px",
                width: "50%",
                borderRadius: "5px",
                whiteSpace: "pre-wrap",
              }}
            >
              {concept.codeExample}
            </pre>
            <p style={{ fontSize: "1.1rem" }}>{concept.explanation}</p>
          </div>
        </div>
        <Lottie
          style={{ width: "50vw", height: "50vh" }}
          animationData={learning}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <label
          style={{ fontSize: "1.1rem", fontWeight: "bold", color: "chocolate" }}
        >
          Real World Use
        </label>
        <p style={{ fontSize: "1.1rem" }}>{concept.realWorldUsage}</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <label
          style={{ fontSize: "1.1rem", fontWeight: "bold", color: "chocolate" }}
        >
          Fun Fact
        </label>
        <p style={{ fontSize: "1.1rem" }}>{concept.funFact}</p>
      </div>

      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <label
            style={{
              fontSize: "1.1rem",
              fontWeight: "bold",
              color: "chocolate",
            }}
          >
            Potential Mistake
          </label>
          <p style={{ fontSize: "1.1rem" }}>{concept.potentialMistakes}</p>
        </div>
        <Lottie style={{ width: "20%" }} animationData={wrong} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <label
          style={{ fontSize: "1.1rem", fontWeight: "bold", color: "chocolate" }}
        >
          Learning Objective
        </label>
        <p style={{ fontSize: "1.1rem" }}>{concept.learningObjective}</p>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          alignItems: "center",
          marginTop:"1rem"
        }}
      >
        <div
          onClick={toggleDropdown}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap:"5px"
          }}
        >
          <label style={{ fontSize: "1rem", fontWeight: "bold" }}>
            Related Concepts
          </label>
          <img style={{ width: "2%", marginTop:"2px" }} src={arrow} />
        </div>
        <Collapse in={showDropdown} animateOpacity>
          <Box
            p="0.5rem 1rem 0.5rem 1rem"
            bg="gray.100"
            rounded="md"
            shadow="md"
            className="solution-box"
            backgroundColor="aliceblue"
          >
            {Array.isArray(concept.relatedConcepts) &&
              concept.relatedConcepts.map((rc, index) => (
                <pre key={index} style={{ whiteSpace: "pre-wrap" }}>
                  {rc}
                </pre>
              ))}
          </Box>
        </Collapse>
      </div>
    </div>
  );
};

export default IndividualConcept;
