import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import "./stackvisualizer.css";

import Lottie from "lottie-react";
import stackAnimation from "../../../assets/data/animationData/stack.json";

const MAX_STACK_SIZE = 10;

const StackVisualizer = () => {
  const [stack, setStack] = useState([]);
  const [element, setElement] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const svg = d3.select("#stack-container");
    svg.selectAll("*").remove();

    const width = 200;
    const height = 320;
    const margin = { bottom: 5 };
    const boxHeight = 30;

    const g = svg
      .append("g")
      .attr("rx", 10) // X-axis radius for rounded corners
      .attr("ry", 10) // Y-axis radius for rounded corners;
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Draw stack elements
    g.selectAll("rect.stack-element")
      .data(stack)
      .enter()
      .append("rect")
      .attr("class", "stack-element")
      .attr("x", width / 2 - 70)
      .attr("y", (d, i) => height - margin.bottom - (i + 1) * boxHeight)
      .attr("width", 150)
      .attr("height", boxHeight - 5)
      .attr("fill", "lightblue")
      .attr("stroke", "black");

    g.selectAll("text.stack-element")
      .data(stack)
      .enter()
      .append("text")
      .attr("class", "stack-element")
      .attr("x", width / 2)
      .attr("y", (d, i) => height - margin.bottom - (i + 1) * boxHeight + 15)
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .text((d) => d);
  }, [stack]);

  const handlePush = () => {
    if (stack.length >= MAX_STACK_SIZE) {
      setError("Stack is full");
      return;
    }
    if (element) {
      setStack([...stack, element]);
      setElement("");
      setError(""); // Clear error message if push is successful
    }
  };

  const handlePop = () => {
    setStack(stack.slice(0, -1));
    setError(""); // Clear error message when popping
  };

  return (
    <div className="stackvisualizer">
      <div className="header">
        <h1 style={{fontSize:"1.5rem"}}>Stack Operations Visualizer</h1>
        <div className="desc">
          <div>
            <label>
              A stack is a linear data structure that follows the{" "}
              <span>Last In First Out (LIFO) </span> principle.{" "}
            </label>
            <label>
              You can think of it like a pile of books where you can only add to
              the top or remove the top book!
            </label>
            <label>
              {" "}
              Explore the buttons below to visualize stack operations better!
            </label>
          </div>
          <Lottie className="animation" animationData={stackAnimation} />
        </div>
      </div>

      <div className="content">
        <svg id="stack-container" width="200" height="320"></svg>

        <div className="controls">
          <input
            type="number"
            value={element}
            onChange={(e) => setElement(e.target.value)}
            placeholder="Enter element"
          />
          <button onClick={handlePush}>Push</button>
          <button onClick={handlePop}>Pop</button>
        </div>
        
      </div>
      <p>Stack</p>
      {error && <label className="error">{error}  !</label>}
      {error && <label className="errorLite">(For visualization purpose, the stack here can store only upto 10 elements)</label>}
      <div className="footer">
        <h3>Current State</h3>
        <label className="message">{stack.join(" -> ") || "Stack is empty"}</label>
      </div>
    </div>
  );
};

export default StackVisualizer;
