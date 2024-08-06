import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import Lottie from "lottie-react";
import visualizer_success from "../../assets/data/animationData/visu_success.json";
import "./bfsvisualizer.css";

// Sample tree data
const treeData = {
  name: "A",
  children: [
    {
      name: "B",
      children: [
        { name: "E", children: [{ name: "I" }, { name: "J" }] },
        { name: "F" },
      ],
    },
    { name: "C" },
    {
      name: "D",
      children: [
        { name: "G", children: [{ name: "K" }, { name: "L" }] },
        { name: "H" },
      ],
    },
    
  ],
};

// BFS function that returns traversal and level info
const bfsWithLevels = (tree) => {
  const queue = [{ node: tree, level: 0 }];
  const visited = [];
  const levels = {};

  while (queue.length > 0) {
    const { node, level } = queue.shift();
    visited.push(node.name);
    if (!levels[level]) levels[level] = [];
    levels[level].push(node.name);

    if (node.children) {
      node.children.forEach((child) =>
        queue.push({ node: child, level: level + 1 })
      );
    }
  }

  return { visited, levels };
};

const BfsVisualizer = () => {
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [step, setStep] = useState(0);
  const [messages, setMessages] = useState([]);
  const [currentNodeIndex, setCurrentNodeIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [isAutoSimulating, setIsAutoSimulating] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    const { visited, levels } = bfsWithLevels(treeData);
    setVisitedNodes(visited);

    // Create messages for each level and node visit
    const msgs = [];
    Object.keys(levels).forEach((level) => {
      levels[level].forEach((node, index) => {
        if (index === 0) {
          msgs.push(`Now have to traverse all nodes at level ${level}`);
        }
        msgs.push(`Visiting node ${node}`);
      });
    });
    msgs.push("Traversal is complete.");
    setMessages(msgs);
  }, []);

  useEffect(() => {
    const svg = d3.select("#tree-container");
    svg.selectAll("*").remove(); // Clear previous drawings

    const width = 600;
    const height = 300;
    const margin = { top: 40, right: 40, bottom: 40, left: 40 };

    const treeLayout = d3
      .tree()
      .size([
        width - margin.left - margin.right,
        height - margin.top - margin.bottom,
      ]);
    const root = d3.hierarchy(treeData);
    treeLayout(root);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    g.selectAll("line")
      .data(root.links())
      .enter()
      .append("line")
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y)
      .attr("stroke", "black");

    g.selectAll("circle")
      .data(root.descendants())
      .enter()
      .append("circle")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("r", 15)
      .attr("fill", (d, i) =>
        visitedNodes.slice(0, currentNodeIndex).includes(d.data.name)
          ? "rgb(2, 182, 2)"
          : "lightgray"
      );

    g.selectAll("text")
      .data(root.descendants())
      .enter()
      .append("text")
      .attr("x", (d) => d.x)
      .attr("y", (d) => d.y + 5) // Adjusted to center text vertically
      .attr("text-anchor", "middle")
      .attr("fill", "white") // Text color inside the circle
      .text((d) => d.data.name);
  }, [visitedNodes, currentNodeIndex]);

  useEffect(() => {
    if (isAutoSimulating) {
      intervalRef.current = setInterval(() => {
        handleNextStep();
      }, 1500);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isAutoSimulating, step]);

  const handleNextStep = () => {
    if (step < messages.length) {
      const nextMessage = messages[step];
      setStep(step + 1);

      if (nextMessage.includes("Visiting node")) {
        setCurrentNodeIndex(currentNodeIndex + 1);
      }
    }
    if (step === messages.length - 2) setDone(true);
  };

  const handleRestart = () => {
    setStep(0);
    setCurrentNodeIndex(0);
    setDone(false);
    setIsAutoSimulating(false);
    clearInterval(intervalRef.current);
  };

  const handleAutoSimulate = () => {
    setIsAutoSimulating(true);
  };

  return (
    <div className="visualizer">
      <div className="header">
        <h1>BFS Visualizer</h1>
      </div>

      <div className="content">
        <div>
          {done && (
            <Lottie className="animation" animationData={visualizer_success} />
          )}
          <svg id="tree-container" width="600" height="350"></svg>
          {done && (
            <Lottie className="animation" animationData={visualizer_success} />
          )}
        </div>

        <div className="buttons">
          <button
            onClick={handleNextStep}
            disabled={step >= messages.length || isAutoSimulating}
          >
            Next Step
          </button>

          <button onClick={handleAutoSimulate} disabled={isAutoSimulating}>
            Auto Simulate
          </button>
          <button onClick={handleRestart}>Restart</button>
        </div>
      </div>

      <div className="footer">
        <div className="message-box">
          <p>{messages[step - 1]}</p>
        </div>
        {step > 1 && <h3>Traversal Order</h3>}
        <label>{visitedNodes.slice(0, currentNodeIndex).join(" -> ")}</label>
      </div>
    </div>
  );
};

export default BfsVisualizer;
