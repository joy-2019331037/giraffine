import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import "./visualizer.css";
import "animate.css";
import Lottie from "lottie-react";
import visualizer_success from "../../assets/data/animationData/visu_success.json";

const BinarySearchVisualizer = () => {
  const [data, setData] = useState([]);
  const [target, setTarget] = useState(null);
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [mid, setMid] = useState(null);
  const [midMsg, setMidMsg] = useState("");
  const [message, setMessage] = useState("");
  const [isAutoSearching, setIsAutoSearching] = useState(false);
  const [found, setFound] = useState(false);

  useEffect(() => {
    // Generate a sorted array of random numbers
    const generateData = () => {
      const array = Array.from({ length: 20 }, () =>
        Math.floor(Math.random() * 100)
      ).sort((a, b) => a - b);
      setData(array);
      setLeft(0);
      setRight(array.length - 1);
      setTarget(array[Math.floor(Math.random() * array.length)]);
    };

    generateData();
  }, []);

  useEffect(() => {
    drawChart();
  }, [data, left, right, mid]);

  useEffect(() => {
    let interval;
    if (isAutoSearching) {
      interval = setInterval(() => {
        binarySearchStep();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isAutoSearching, left, right, mid]);

  const binarySearchStep = () => {
    if (left > right) {
      setMessage(`Target ${target} not found in the array.`);
      setIsAutoSearching(false);
      return;
    }

    const midIndex = Math.floor((left + right) / 2);
    setMid(midIndex);
    setMidMsg(`New midpoint is ${data[midIndex]}`);

    if (data[midIndex] === target) {
      setMessage(`Target ${target} found at index ${midIndex}`);
      setIsAutoSearching(false);
      setFound(true);
    } else if (data[midIndex] < target) {
      setMessage(
        // `Target ${target} is greater than ${data[midIndex]} 🔵 Searching in the right half between ${data[midIndex + 1]} and ${data[right]}`
        `Target ${target} is greater than ${data[midIndex]} | Searching in the right half`
      );
      setLeft(midIndex + 1);
    } else {
      setMessage(
        // `Target ${target} is less than ${data[midIndex]}  🔵 Searching in the left half between ${data[left]} and ${data[midIndex - 1]}`
        `Target ${target} is less than ${data[midIndex]} | Searching in the left half`
      );
      setRight(midIndex - 1);
    }
  };

  const drawChart = () => {
    const width = 800;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };

    d3.select("#chart").selectAll("*").remove();
    const svg = d3
      .select("#chart")
      .attr("width", width)
      .attr("height", height)
      .style("background", "white")
      .style("margin", "50px auto") // Center the chart
      .style("display", "block"); // Center the chart

    const xScale = d3
      .scaleBand()
      .domain(d3.range(data.length))
      .range([margin.left, width - margin.right])
      .padding(0.2); // Increase the padding between bars

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data) + 10])
      .range([height - margin.bottom, margin.top]);

    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => xScale(i))
      .attr("y", (d) => yScale(d))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => yScale(0) - yScale(d))
      .attr("fill", (d, i) => {
        if (i === mid) return "red";
        if (i >= left && i <= right) return "#FFD6AC";
        return "lightgrey";
      })
      .attr("stroke", (d, i) => {
        // if (i === left || i === right) return "blue";
        if (i === mid) return "red";
        return "none";
      })
      .attr("stroke-width", (d, i) => {
        if (i === left || i === right || i === mid) return 2;
        return 0;
      });

    svg
      .selectAll("text.label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("x", (d, i) => xScale(i) + xScale.bandwidth() / 2)
      .attr("y", (d) => yScale(d) - 5)
      .attr("text-anchor", "middle")
      .text((d) => d);

    // Highlight target value
    if (target !== null) {
      const targetIndex = data.indexOf(target);
      if (targetIndex !== -1) {
        const xPos = xScale(targetIndex) + xScale.bandwidth() / 2;
        const yPos = yScale(0) + 20;

        svg
          .append("polygon")
          .attr(
            "points",
            `
            ${xPos},${yPos} 
            ${xPos - 10},${yPos + 10} 
            ${xPos + 10},${yPos + 10}
          `
          )
          .attr("fill", "green");
      }
    }
  };

  const handleNextStep = () => {
    binarySearchStep();
  };

  const handleAutoSearch = () => {
    setIsAutoSearching(true);
  };

  const handleStopSearch = () => {
    setIsAutoSearching(false);
  };

  return (
    <div className="visualizer">
      <div className="header">
        <h2>Binary Search Visualizer</h2>
        <label>
          Binary Search efficiently finds a target value within a sorted list
          by repeatedly dividing the search interval in half.
        </label>
        <label>
          We have a <span>sorted</span> list of 20 numbers from which one
          particular number is to be searched out.
        </label>
        <label>
          Let's say, the element pointed by the green arrow is our target:{" "}
          <span>{target}</span>
        </label>
        <label>
          Click on the buttons below to visualize the binary search!
        </label>
      </div>

      <div className="content">
        <div>
          {found && (
            <Lottie className="animation" animationData={visualizer_success} />
          )}
          <svg id="chart"></svg>
          {found && (
            <Lottie className="animation" animationData={visualizer_success} />
          )}
        </div>
        <div className="buttons">
          <button
            onClick={handleNextStep}
            disabled={isAutoSearching || left > right}
          >
            Next Step
          </button>
          <button
            onClick={handleAutoSearch}
            disabled={isAutoSearching || left > right}
          >
            Auto Simulate
          </button>
          <button onClick={handleStopSearch} disabled={!isAutoSearching}>
            Stop
          </button>
        </div>
      </div>

      <div className="footer">
        {left > right && <p>Target {target} not found in the array.</p>}
        {!found && (
          <p>
            <div>{midMsg}</div>
            {message}
          </p>
        )}
        {found && <p className="found">{message}</p>}
      </div>
    </div>
  );
};

export default BinarySearchVisualizer;
