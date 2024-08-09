import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import Lottie from "lottie-react";
import visualizer_success from "../../assets/data/animationData/visu_success.json";

const treeData = {
    name: "A",
    children: [
      {
        name: "B",
        children: [
          { name: "D" },
          { name: "E", children: [{ name: "H" }, { name: "I" }] },
        ],
      },
      {
        name: "C",
        children: [
          { name: "F" , children: [{ name: "J" }, { name: "K" }] },
          { name: "G"},
        ],
      },
    ],
  };

const inorderTraversalWithMessages = (tree) => {
  const visited = [];
  const messages = [];

  const traverse = (node) => {
    if (!node) return;

    if (node.children && node.children[0]) {
      messages.push(`Traversing to the left subtree of node ${node.name}.`);
      traverse(node.children[0]);
    }

    messages.push(`Visiting node ${node.name}.`);
    visited.push(node.name);

    if (node.children && node.children[1]) {
      messages.push(`Traversing to the right subtree of node ${node.name}.`);
      traverse(node.children[1]);
    }
  };

  traverse(tree);
  messages.push("Traversal is complete.");

  return { visited, messages };
};

const InorderVisualizer = () => {
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [step, setStep] = useState(0);
  const [messages, setMessages] = useState([]);
  const [currentNodeIndex, setCurrentNodeIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [isAutoSimulating, setIsAutoSimulating] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    const { visited, messages } = inorderTraversalWithMessages(treeData);
    setVisitedNodes(visited);
    setMessages(messages);
  }, []);

  useEffect(() => {
    const svg = d3.select("#tree-container");
    svg.selectAll("*").remove();

    const width = 600;
    const height = 300;
    const margin = { top: 40, right: 40, bottom: 40, left: 40 };

    const treeLayout = d3
      .tree()
      .size([width - margin.left - margin.right, height - margin.top - margin.bottom]);
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
      .attr("y", (d) => d.y + 5)
      .attr("text-anchor", "middle")
      .attr("fill", "white")
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
        <h1>Inorder Traversal Visualizer</h1>
        <label>Inorder Traversal recursively visits the left subtree, then the root node, and finally the right subtree</label>
        <label>Here is a simple tree with 11 nodes</label>
        <label>Click on the buttons below to visualize the Inorder traversal!</label>
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

export default InorderVisualizer;
