import React, { useState, useRef, useEffect } from "react";
import { Button, Text } from "@chakra-ui/react";
import { problems } from "../../../assets/data/webdevData/problems";
import WebDevPreview from "./WebDevPreview";

const WebdevPractice = () => {
  const [selectedProblem, setSelectedProblem] = useState(0);
  const [seeSolution, setSeeSolution] = useState(false);

  const handleProblemClick = (idx) => {
    setSelectedProblem(idx);
    setSeeSolution(false); // Reset seeSolution when switching problems
  };

  const iframeRef = useRef(null);

  useEffect(() => {
    const iframeDocument = iframeRef.current.contentDocument;
    iframeDocument.open();
    iframeDocument.write(`
      <html>
        <head>
          <style>${problems[selectedProblem].cssContent}</style>
        </head>
        <body>
          ${problems[selectedProblem].htmlContent}
        </body>
      </html>
    `);
    iframeDocument.close();
  }, [
    problems[selectedProblem].cssContent,
    problems[selectedProblem].htmlContent,
  ]);

  return (
    <>
      <h1 style={{ textAlign: "center", color: "chocolate" }}>
        Web Development Practice Problems
      </h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: "20px",
          marginTop: "2rem",
        }}
      >
        <div
          style={{
            width: "20%",
            height: "5vh",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <h3>Problem List</h3>
          <div
            style={{
              flex: 1,
              marginRight: "16px",
              maxHeight: "500px",
              overflowY: "auto",
            }}
          >
            {problems.map((problem, index) => (
              <div
                key={index}
                onClick={() => handleProblemClick(index)}
                style={{
                  padding: "12px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  marginBottom: "8px",
                  backgroundColor:
                    selectedProblem === index ? "#f0f8ff" : "#fff",
                  cursor: "pointer",
                }}
              >
                <p style={{ color: "#2c7a7b", fontWeight: "bold", margin: 0 }}>
                  {problem.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            width: "70%",
            backgroundColor: "#ffffff",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <>
            <h2>{problems[selectedProblem].title}</h2>
            <hr style={{ margin: "16px 0" }} />
            <p>{problems[selectedProblem].description}</p>
            <h3>Expected Output</h3>
            <iframe
              ref={iframeRef}
              title="Web Development Preview"
              style={{
                width: "100%",
                height: "50vh",
                border: "1px solid #ddd",
                background: "white",
                borderRadius: "5px",
                margin: "0rem 0rem 2rem 0rem",
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "2rem",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <input
                type="button"
                value="See Solution"
                onClick={() => setSeeSolution(true)}
                style={{
                  padding: "5px 10px",
                  border: "1px solid gray",
                  borderRadius: "10px",
                  fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
                  backgroundColor: "rgb(195, 239, 106)",
                  marginBottom: "2rem",
                  cursor: "pointer",
                }}
              />

              <input
                type="button"
                value="Reset Content"
                onClick={() => setSeeSolution(false)}
                style={{
                  padding: "5px 10px",
                  border: "1px solid gray",
                  borderRadius: "10px",
                  fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
                  backgroundColor: "rgb(195, 239, 106)",
                  marginBottom: "2rem",
                  cursor: "pointer",
                }}
              />
            </div>
            <WebDevPreview
              key={`${selectedProblem}-${seeSolution}`} // Ensure re-render on seeSolution toggle
              initialHtmlContent={
                seeSolution ? problems[selectedProblem].htmlContent : ""
              }
              initialCssContent={
                seeSolution ? problems[selectedProblem].cssContent : ""
              }
              initialJsContent={""}
            />
          </>
        </div>
      </div>
    </>
  );
};

export default WebdevPractice;
