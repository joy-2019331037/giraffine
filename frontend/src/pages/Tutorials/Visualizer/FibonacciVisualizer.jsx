import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import "./visualizer.css";

const FibonacciVisualizer = () => {
  const [sequence, setSequence] = useState([0, 1]);
  const [currentIndex, setCurrentIndex] = useState(2);
  const [actionMessage, setActionMessage] = useState("");

  useEffect(() => {
    const width = 640;
    const height = 200;
    const padding = 20;
    const rectWidth = 60;

    const svg = d3
      .select("#fibonacci-visualizer")
      .attr("width", width)
      .attr("height", height);

    svg
      .selectAll("rect")
      .data(sequence)
      .enter()
      .append("rect")
      .attr("x", (d, i) => padding + i * rectWidth)
      .attr("y", height / 2 - 20)
      .attr("width", rectWidth - 1)
      .attr("height", 40)
      .attr("fill", "lightblue")
      .attr("id", (d, i) => `rect-${i}`);

    svg
      .selectAll("text")
      .data(sequence)
      .enter()
      .append("text")
      .attr("x", (d, i) => padding + i * rectWidth + rectWidth / 2)
      .attr("y", height / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .text((d) => d);
  }, [sequence]);

  const nextStep = async () => {
    if (currentIndex >= 10) {
      setActionMessage("Completed");
      return;
    }

    const previousIndex1 = currentIndex - 1;
    const previousIndex2 = currentIndex - 2;

    // Highlight the two elements being added
    d3.select(`#rect-${previousIndex1}`).attr("fill", "orange");
    d3.select(`#rect-${previousIndex2}`).attr("fill", "orange");

    await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for a second to highlight

    const newNumber = sequence[previousIndex1] + sequence[previousIndex2];
    const newSequence = [...sequence, newNumber];

    setSequence(newSequence);
    setActionMessage(
      `Calculating next Fibonacci -> ${sequence[previousIndex2]} + ${sequence[previousIndex1]} = ${newNumber}`
    );

    d3.select("#fibonacci-visualizer")
      .selectAll("rect")
      .data(newSequence)
      .enter()
      .append("rect")
      .attr("x", (d, i) => 20 + i * 60)
      .attr("y", 80)
      .attr("width", 59)
      .attr("height", 40)
      .attr("fill", "lightgreen")
      .attr("id", (d, i) => `rect-${i}`);

    d3.select("#fibonacci-visualizer")
      .selectAll("text")
      .data(newSequence)
      .enter()
      .append("text")
      .attr("x", (d, i) => 50 + i * 60)
      .attr("y", 100)
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .text((d) => d);

    // Revert the color of the added elements back to lightblue
    d3.select(`#rect-${previousIndex1}`).attr("fill", "lightblue");
    d3.select(`#rect-${previousIndex2}`).attr("fill", "lightblue");

    setCurrentIndex(currentIndex + 1);
  };

  const reset = () => {
    d3.selectAll("rect").remove();
    d3.selectAll("text").remove();
    setSequence([0, 1]);
    setCurrentIndex(2);
    setActionMessage("");
  };

  return (
    <div className="visualizer">
      <div className="header">
        <h2>Fibonacci Sequence Visualization</h2>
        <label>
          This visualization demonstrates how the Fibonacci sequence is
          calculated, where each number is the sum of the previous two numbers.
        </label>
        <label>
          For simplicity, this visualization will only generate the first 10
          Fibonacci numbers.
        </label>
      </div>

      <div className="content">
        <svg id="fibonacci-visualizer"></svg>
        <div className="buttons">
          <button onClick={nextStep}>Next Step</button>
          <button onClick={reset}>Reset</button>
        </div>
      </div>

      <div className="footer">
        <p>{actionMessage}</p>
      </div>
    </div>
  );
};

export default FibonacciVisualizer;
