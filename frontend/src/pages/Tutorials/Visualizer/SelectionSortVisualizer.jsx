import React, { useState, useEffect } from "react";
import * as d3 from "d3";

import "./visualizer.css";
import Lottie from "lottie-react";
import visualizer_success from "../../../assets/data/animationData/visu_success.json";

const SelectionSortVisualizer = () => {
  const [data, setData] = useState([]);
  const [colors, setColors] = useState([]);
  const [i, setI] = useState(0);
  const [j, setJ] = useState(0);
  const [sorted, setSorted] = useState(false);
  const [message, setMessage] = useState("");
  const [isAutoSorting, setIsAutoSorting] = useState(false);

  useEffect(() => {
    // Generate an array of random numbers
    const generateData = () => {
      const array = Array.from({ length: 10 }, () =>
        Math.floor(Math.random() * 100)
      );
      setData(array);
      setColors(array.map(() => getRandomColor()));
    };

    generateData();
  }, []);

  useEffect(() => {
    drawChart();
  }, [data, i, j, colors]);

  useEffect(() => {
    let interval;
    if (isAutoSorting && !sorted) {
      interval = setInterval(() => {
        selectionSortStep();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isAutoSorting, data, i, j, sorted]);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const selectionSortStep = () => {
    const array = [...data];
    const colorArray = [...colors];
    if (i < array.length - 1) {
      if (j < array.length) {
        if (array[j] < array[i]) {
          [array[i], array[j]] = [array[j], array[i]];
          [colorArray[i], colorArray[j]] = [colorArray[j], colorArray[i]];
          setColors(colorArray);
          setMessage(
            `Swapping ${array[i]} and ${array[j]} because ${array[i]} is less than ${array[j]}`
          );
        }
        setJ(j + 1);
      } else {
        setJ(i + 1);
        setI(i + 1);
      }
    } else {
      setSorted(true);
      setMessage("Array is sorted!");
      setIsAutoSorting(false);
    }
    setData(array);
  };

  const drawChart = () => {
    const width = 600;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };

    const svg = d3
      .select("#chart")
      .attr("width", width)
      .attr("height", height)
      .style("background", "white")
      .style("margin-top", "50px");

    const xScale = d3
      .scaleBand()
      .domain(d3.range(data.length))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data) + 10])
      .range([height - margin.bottom, margin.top]);

    const bars = svg.selectAll("rect").data(data);

    // Exit old elements not present in new data
    bars.exit().remove();

    // Update existing elements
    bars
      .transition()
      .duration(500)
      .attr("x", (d, i) => xScale(i))
      .attr("y", (d) => yScale(d))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => yScale(0) - yScale(d))
      .attr("fill", (d, i) => colors[i]);

    // Enter new elements
    bars
      .enter()
      .append("rect")
      .attr("x", (d, i) => xScale(i))
      .attr("y", (d) => yScale(d))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => yScale(0) - yScale(d))
      .attr("fill", (d, i) => colors[i]);

    const labels = svg.selectAll("text.label").data(data);

    // Exit old elements not present in new data
    labels.exit().remove();

    // Update existing elements
    labels
      .transition()
      .duration(500)
      .attr("x", (d, i) => xScale(i) + xScale.bandwidth() / 2)
      .attr("y", (d) => yScale(d) - 5)
      .attr("text-anchor", "middle")
      .text((d) => d);

    // Enter new elements
    labels
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("x", (d, i) => xScale(i) + xScale.bandwidth() / 2)
      .attr("y", (d) => yScale(d) - 5)
      .attr("text-anchor", "middle")
      .text((d) => d);

    // Remove any existing pointers
    svg.selectAll("polygon").remove();

    // Add pointer (triangle) to the current element
    if (!sorted && data.length > 0) {
      const pointerSize = 10;
      const xPosI = xScale(i) + xScale.bandwidth() / 2;
      const xPosJ = xScale(j) + xScale.bandwidth() / 2;
      const yPos = yScale(0) + 10; // Position at the bottom

      svg
        .append("polygon")
        .attr(
          "points",
          `
          ${xPosI},${yPos} 
          ${xPosI - pointerSize},${yPos + pointerSize} 
          ${xPosI + pointerSize},${yPos + pointerSize}
        `
        )
        .attr("fill", "red");

      svg
        .append("polygon")
        .attr(
          "points",
          `
          ${xPosJ},${yPos} 
          ${xPosJ - pointerSize},${yPos + pointerSize} 
          ${xPosJ + pointerSize},${yPos + pointerSize}
        `
        )
        .attr("fill", "blue");
    }
  };

  const handleNextStep = () => {
    selectionSortStep();
  };

  const handleAutoSort = () => {
    setIsAutoSorting(true);
    setSorted(false);
  };

  const handleStopSort = () => {
    setIsAutoSorting(false);
  };

  return (
    <div className="visualizer">
      <div className="header">
        <h2>Selection Sort Visualizer</h2>
        <label>
          We have a <span>unsorted</span> list of 10 numbers from which we want
          to sort in ascending order
        </label>

        <label>Click on the buttons below to visualize the Selection Sort!</label>
      </div>

      <div className="content">
        <div>
          {sorted && (
            <Lottie className="animation" animationData={visualizer_success} />
          )}
          <svg id="chart"></svg>
          {sorted && (
            <Lottie className="animation" animationData={visualizer_success} />
          )}
        </div>
        <div className="buttons">
          <button onClick={handleNextStep} disabled={sorted || isAutoSorting}>
            Next Step
          </button>
          <button onClick={handleAutoSort} disabled={sorted || isAutoSorting}>
            Auto Simulate
          </button>
          <button onClick={handleStopSort} disabled={!isAutoSorting}>
            Stop
          </button>
        </div>
      </div>

      <div className="footer">
        {!sorted && <p>{message}</p>}
        {sorted && <p className="found">{message}</p>}
      </div>
    </div>
  );
};

export default SelectionSortVisualizer;
