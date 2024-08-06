import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import "./visualizer.css";
import Lottie from "lottie-react";
import visualizer_success from "../../assets/data/animationData/visu_success.json";

const BubbleSortVisualizer = () => {
  const [data, setData] = useState([]);
  const [colors, setColors] = useState([]);
  const [index, setIndex] = useState(0);
  const [sorted, setSorted] = useState(false);
  const [message, setMessage] = useState("");
  const [isComparing, setIsComparing] = useState(false);
  const [isAutoSorting, setIsAutoSorting] = useState(false);

  useEffect(() => {
    // Generate an array of random numbers and their colors
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
  }, [data, colors, index]);

  useEffect(() => {
    let interval;
    if (isAutoSorting && !sorted) {
      interval = setInterval(() => {
        bubbleSortStep();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isAutoSorting, data, index, sorted]);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const bubbleSortStep = () => {
    const array = [...data];
    const colorArray = [...colors];
    if (index < array.length - 1) {
      setIsComparing(true);
      if (array[index] > array[index + 1]) {
        [array[index], array[index + 1]] = [array[index + 1], array[index]];
        [colorArray[index], colorArray[index + 1]] = [
          colorArray[index + 1],
          colorArray[index],
        ];
        setData(array);
        setColors(colorArray);
        setMessage(
          `Swapping ${array[index + 1]} and ${array[index]} because ${
            array[index + 1]
          } is greater than ${array[index]}`
        );
      } else {
        setMessage(
          `No swap needed because ${array[index]} is less than or equal to ${
            array[index + 1]
          }`
        );
      }
      setIndex(index + 1);
    } else {
      setIndex(0);
      if (isSorted(array)) {
        setSorted(true);
        setMessage("Array is sorted!");
        setIsComparing(false);
        setIsAutoSorting(false);
      } else {
        setMessage("Starting next pass through the array.");
      }
    }
    setIsComparing(false); // Reset isComparing state
  };

  const isSorted = (array) => {
    for (let i = 0; i < array.length - 1; i++) {
      if (array[i] > array[i + 1]) {
        return false;
      }
    }
    return true;
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
      .style("margin", "50px auto") // Center the chart
      .style("display", "block"); // Center the chart
  
    const xScale = d3
      .scaleBand()
      .domain(d3.range(data.length))
      .range([margin.left, width - margin.right])
      .padding(0.1); // Increase the padding between bars
  
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
      .attr("fill", (d, i) => colors[i])
      .transition()
      .duration(500)
      .attr("x", (d, i) => xScale(i))
      .attr("y", (d) => yScale(d))
      .attr("height", (d) => yScale(0) - yScale(d));
  
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
      .text((d) => d)
      .transition()
      .duration(500)
      .attr("x", (d, i) => xScale(i) + xScale.bandwidth() / 2)
      .attr("y", (d) => yScale(d) - 5);
  
    // Remove any existing pointers
    svg.selectAll("polygon").remove();
  
    // Add pointer (triangle) to the current element
    if (!sorted && data.length > 0) {
      const pointerSize = 10;
      const xPos = xScale(index) + xScale.bandwidth() / 2;
      const yPos = yScale(0) + 10; // Position at the bottom
  
      svg
        .append("polygon")
        .attr(
          "points",
          `
          ${xPos},${yPos} 
          ${xPos - pointerSize},${yPos + pointerSize} 
          ${xPos + pointerSize},${yPos + pointerSize}
        `
        )
        .attr("fill", "red");
    }
  };
  
  
  
  

  const handleNextStep = () => {
    bubbleSortStep();
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
        <h2>Bubble Sort Visualizer</h2>
        <label>
          We have a <span>unsorted</span> list of 10 numbers from which we want
          to sort in ascending order
        </label>

        <label>Click on the buttons below to visualize the Bubble Sort!</label>
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

export default BubbleSortVisualizer;
