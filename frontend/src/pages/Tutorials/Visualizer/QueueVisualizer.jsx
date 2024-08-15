import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import "./queuevisualizer.css";

import Lottie from "lottie-react";
import queueAnimation from "../../../assets/data/animationData/queue.json";

const MAX_QUEUE_SIZE = 10;

const QueueVisualizer = () => {
  const [queue, setQueue] = useState([]);
  const [element, setElement] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const svg = d3.select("#queue-container");
    svg.selectAll("*").remove();

    const width = 720;
    const height = 60;
    const boxWidth = 70;

    const g = svg
      .append("g")
      .attr("rx", 10)
      .attr("ry", 10)
      .attr("transform", `translate(10, 10)`);

    // Draw queue elements
    g.selectAll("rect.queue-element")
      .data(queue)
      .enter()
      .append("rect")
      .attr("class", "queue-element")
      .attr("x", (d, i) => i * boxWidth)
      .attr("y", height / 2 - 15)
      .attr("width", boxWidth - 5)
      .attr("height", 30)
      .attr("fill", "lightblue")
      .attr("stroke", "black");

    g.selectAll("text.queue-element")
      .data(queue)
      .enter()
      .append("text")
      .attr("class", "queue-element")
      .attr("x", (d, i) => i * boxWidth + (boxWidth - 5) / 2)
      .attr("y", height / 2)
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .attr("dy", ".35em")
      .text((d) => d);
  }, [queue]);

  const handleEnqueue = () => {
    if (queue.length >= MAX_QUEUE_SIZE) {
      setError("Queue is full");
      return;
    }
    if (element) {
      setQueue([...queue, element]);
      setElement("");
      setError(""); // Clear error message if enqueue is successful
    }
  };

  const handleDequeue = () => {
    setQueue(queue.slice(1));
    setError(""); // Clear error message when dequeuing
  };

  return (
    <div className="queuevisualizer">
      <div className="header">
        <h1>Queue Operations Visualizer</h1>
        <div className="desc">
          <div>
            <label>
              A queue is a linear data structure that follows the{" "}
              <span>First In First Out (FIFO) </span> principle.{" "}
            </label>
            <label>
              You can think of it like a line of people where you can only add to
              the end of the line or remove from the front!
            </label>
            <label>
              {" "}
              Explore the buttons below to visualize queue operations better!
            </label>
          </div>
          <Lottie className="animation" animationData={queueAnimation} />
        </div>
      </div>
      <p>Queue</p>
      <div className="content">
        <svg id="queue-container" width="720" height="80"></svg>
        
        <div className="controls">
          <input
            type="number"
            value={element}
            onChange={(e) => setElement(e.target.value)}
            placeholder="Enter element"
          />
          
          <button onClick={handleEnqueue}>Enqueue</button>
          <button onClick={handleDequeue}>Dequeue</button>
        </div>
      </div>
      
      {error && <label className="error">{error} !</label>}
      {error && <label className="errorLite">(For visualization purpose, the queue here can store only upto 10 elements)</label>}
      <div className="footer">
        <h3>Current State</h3>
        <label className="message">{queue.join(" -> ") || "Queue is empty"}</label>
      </div>
    </div>
  );
};

export default QueueVisualizer;
