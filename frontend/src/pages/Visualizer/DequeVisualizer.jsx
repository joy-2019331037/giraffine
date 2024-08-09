import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import "./dequevisualizer.css";

import Lottie from "lottie-react";
import dequeAnimation from "../../assets/data/animationData/queue.json";

const MAX_DEQUE_SIZE = 10;

const DequeVisualizer = () => {
  const [deque, setDeque] = useState([]);
  const [element, setElement] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const svg = d3.select("#deque-container");
    svg.selectAll("*").remove();

    const width = 720;
    const height = 60;
    const boxWidth = 70;

    const g = svg
      .append("g")
      .attr("rx", 10)
      .attr("ry", 10)
      .attr("transform", `translate(10, 10)`);

    // Draw deque elements
    g.selectAll("rect.deque-element")
      .data(deque)
      .enter()
      .append("rect")
      .attr("class", "deque-element")
      .attr("x", (d, i) => i * boxWidth)
      .attr("y", height / 2 - 15)
      .attr("width", boxWidth - 5)
      .attr("height", 30)
      .attr("fill", "lightblue")
      .attr("stroke", "black");

    g.selectAll("text.deque-element")
      .data(deque)
      .enter()
      .append("text")
      .attr("class", "deque-element")
      .attr("x", (d, i) => i * boxWidth + (boxWidth - 5) / 2 )
      .attr("y", height / 2)
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .attr("dy", ".35em")
      .text((d) => d);
  }, [deque]);

  const handlePushFront = () => {
    if (deque.length >= MAX_DEQUE_SIZE) {
      setError("Deque is full");
      return;
    }
    if (element) {
      setDeque([element, ...deque]);
      setElement("");
      setError(""); // Clear error message if push front is successful
    }
  };

  const handlePushBack = () => {
    if (deque.length >= MAX_DEQUE_SIZE) {
      setError("Deque is full");
      return;
    }
    if (element) {
      setDeque([...deque, element]);
      setElement("");
      setError(""); // Clear error message if push back is successful
    }
  };

  const handlePopFront = () => {
    setDeque(deque.slice(1));
    setError(""); // Clear error message when popping front
  };

  const handlePopBack = () => {
    setDeque(deque.slice(0, -1));
    setError(""); // Clear error message when popping back
  };

  return (
    <div className="dequevisualizer">
      <div className="header">
        <h1>Deque Operations Visualizer</h1>
        <div className="desc">
          <div>
            <label>
              A deque is a double-ended queue that allows insertion and deletion
              at both ends.{" "}
            </label>
            <label>
              You can think of it like a double-ended stack where you can add or
              remove elements from both the front and the back!
            </label>
            <label>
              {" "}
              Explore the buttons below to visualize deque operations better!
            </label>
          </div>
          {/* <Lottie className="animation" animationData={dequeAnimation} /> */}
        </div>
      </div>
      <p>Deque</p>
      <div className="content">
        <svg id="deque-container" width="720" height="80"></svg>

        <div className="controls">
          <input
            type="number"
            value={element}
            onChange={(e) => setElement(e.target.value)}
            placeholder="Enter element"
          />
          <div className="buttons">
            <button onClick={handlePushFront}>Push Front</button>
            <button onClick={handlePopFront}>Pop Front</button>
            <button onClick={handlePushBack}>Push Back</button>
            <button onClick={handlePopBack}>Pop Back</button>
          </div>
        </div>
      </div>

      {error && <label className="error">{error} !</label>}
      {error && (
        <label className="errorLite">
          (For visualization purpose, the deque here can store only up to 10
          elements)
        </label>
      )}
      <div className="footer">
        <h3>Current State</h3>
        <label className="message">
          {deque.join(" <-> ") || "Deque is empty"}
        </label>
      </div>
    </div>
  );
};

export default DequeVisualizer;
