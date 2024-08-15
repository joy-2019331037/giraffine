import React, { useState, useEffect } from "react";
import * as d3 from "d3";

const KMPSearchVisualizer = () => {
  const [text, setText] = useState("");
  const [pattern, setPattern] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matchIndex, setMatchIndex] = useState(0);
  const [lps, setLps] = useState([]);
  const [lpsStep, setLpsStep] = useState(0);
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [visualStep, setVisualStep] = useState(0);

  useEffect(() => {
    if (pattern) {
      setLps(Array(pattern.length).fill(0));
      setLpsStep(1);
      setMessage("Starting LPS array formation.");
    }
  }, [pattern]);

  useEffect(() => {
    const svg = d3.select("#kmp-container");
    svg.selectAll("*").remove();

    const width = 800;
    const height = 250;
    const boxWidth = 30;

    const g = svg.append("g").attr("transform", "translate(20, 50)");

    // Draw text
    g.selectAll("rect.text-element")
      .data(text.split(""))
      .enter()
      .append("rect")
      .attr("class", "text-element")
      .attr("x", (d, i) => i * boxWidth)
      .attr("y", 0)
      .attr("width", boxWidth)
      .attr("height", 30)
      .attr("fill", (d, i) => {
        if (visualStep === 0) return "lightblue";
        if (i === currentIndex && text[i] === pattern[matchIndex]) return "lightgreen";
        if (i === currentIndex && text[i] !== pattern[matchIndex]) return "lightcoral";
        return "lightblue";
      })
      .attr("stroke", "black");

    g.selectAll("text.text-element")
      .data(text.split(""))
      .enter()
      .append("text")
      .attr("class", "text-element")
      .attr("x", (d, i) => i * boxWidth + boxWidth / 2)
      .attr("y", 15)
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .attr("dy", ".35em")
      .text((d) => d);

    // Draw pattern
    g.selectAll("rect.pattern-element")
      .data(pattern.split(""))
      .enter()
      .append("rect")
      .attr("class", "pattern-element")
      .attr("x", (d, i) => (i + currentIndex - matchIndex) * boxWidth)
      .attr("y", 40)
      .attr("width", boxWidth)
      .attr("height", 30)
      .attr("fill", (d, i) => {
        if (visualStep === 0) return "orange";
        if (i === matchIndex && text[currentIndex] === pattern[i]) return "lightgreen";
        if (i === matchIndex && text[currentIndex] !== pattern[i]) return "lightcoral";
        return "orange";
      })
      .attr("stroke", "black");

    g.selectAll("text.pattern-element")
      .data(pattern.split(""))
      .enter()
      .append("text")
      .attr("class", "pattern-element")
      .attr("x", (d, i) => (i + currentIndex - matchIndex) * boxWidth + boxWidth / 2)
      .attr("y", 55)
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .attr("dy", ".35em")
      .text((d) => d);

    // Draw LPS array
    g.selectAll("rect.lps-element")
      .data(lps)
      .enter()
      .append("rect")
      .attr("class", "lps-element")
      .attr("x", (d, i) => i * boxWidth)
      .attr("y", 90)
      .attr("width", boxWidth)
      .attr("height", 30)
      .attr("fill", "lightyellow")
      .attr("stroke", "black");

    g.selectAll("text.lps-element")
      .data(lps)
      .enter()
      .append("text")
      .attr("class", "lps-element")
      .attr("x", (d, i) => i * boxWidth + boxWidth / 2)
      .attr("y", 105)
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .attr("dy", ".35em")
      .text((d) => d);
  }, [text, pattern, currentIndex, matchIndex, lps, lpsStep, visualStep]);

  const computeLPSArray = (pattern) => {
    const lps = Array(pattern.length).fill(0);
    let length = 0;
    let i = 1;

    while (i < pattern.length) {
      if (pattern[i] === pattern[length]) {
        length++;
        lps[i] = length;
        setMessage(`Pattern[${i}] == Pattern[${length - 1}]; LPS[${i}] = ${length}`);
        i++;
      } else {
        if (length !== 0) {
          length = lps[length - 1];
          setMessage(`Pattern[${i}] != Pattern[${length}]; Length = LPS[${length}] = ${length}`);
        } else {
          lps[i] = 0;
          setMessage(`Pattern[${i}] != Pattern[0]; LPS[${i}] = 0`);
          i++;
        }
      }
    }

    return lps;
  };

  const handleNextStepLPS = () => {
    if (lpsStep < pattern.length) {
      const newLps = [...lps];
      let length = lps[lpsStep - 1];

      if (pattern[lpsStep] === pattern[length]) {
        length++;
        newLps[lpsStep] = length;
        setMessage(`Pattern[${lpsStep}] == Pattern[${length - 1}]; LPS[${lpsStep}] = ${length}`);
      } else {
        if (length !== 0) {
          length = newLps[length - 1];
          setMessage(`Pattern[${lpsStep}] != Pattern[${length}]; Length = LPS[${length}] = ${length}`);
        } else {
          newLps[lpsStep] = 0;
          setMessage(`Pattern[${lpsStep}] != Pattern[0]; LPS[${lpsStep}] = 0`);
        }
      }

      setLps(newLps);
      setLpsStep(lpsStep + 1);
      setVisualStep(visualStep + 1);
    } else {
      setMessage("LPS array formation complete.");
      setVisualStep(visualStep + 1);
    }
  };

  const handleNextStep = () => {
    if (lpsStep < pattern.length) {
      handleNextStepLPS();
      return;
    }

    if (matchIndex === pattern.length) {
      setMatches([...matches, currentIndex - matchIndex]);
      setMatchIndex(lps[matchIndex - 1]);
      setMessage(`Pattern found at index ${currentIndex - matchIndex}. Moving to the next position.`);
      setVisualStep(visualStep + 1);
    } else if (currentIndex < text.length) {
      if (text[currentIndex] === pattern[matchIndex]) {
        setMatchIndex(matchIndex + 1);
        setCurrentIndex(currentIndex + 1);
        setMessage(`Text[${currentIndex}] == Pattern[${matchIndex}]; advancing both indices.`);
      } else {
        if (matchIndex !== 0) {
          setMatchIndex(lps[matchIndex - 1]);
          setMessage(`Text[${currentIndex}] != Pattern[${matchIndex}]; updating match index to LPS[${matchIndex - 1}] = ${lps[matchIndex - 1]}.`);
        } else {
          setCurrentIndex(currentIndex + 1);
          setMessage(`Text[${currentIndex}] != Pattern[${matchIndex}]; advancing text index.`);
        }
      }
      setVisualStep(visualStep + 1);
    } else {
      setError("Pattern not found in text.");
      setVisualStep(visualStep + 1);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setMatchIndex(0);
    setLps([]);
    setLpsStep(0);
    setMatches([]);
    setError("");
    setMessage("");
    setVisualStep(0);
  };

  return (
    <div className="kmp-visualizer">
      <h1>KMP String Matching Algorithm Visualizer</h1>
      <div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text"
        />
        <input
          type="text"
          value={pattern}
          onChange={(e) => setPattern(e.target.value)}
          placeholder="Enter pattern"
        />
        <button onClick={handleReset}>Reset</button>
        <button onClick={handleNextStep}>Next Step</button>
      </div>
      <svg id="kmp-container" width="800" height="250"></svg>
      <div className="message">{message}</div>
      {matches.length > 0 && (
        <div>
          <h3>Matches found at indices:</h3>
          <p>{matches.join(", ")}</p>
        </div>
      )}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default KMPSearchVisualizer;
