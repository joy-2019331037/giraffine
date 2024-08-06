import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import "./visualizer.css";
import Lottie from "lottie-react";
import visualizer_success from "../../assets/data/animationData/visu_success.json";

const InsertionSortVisualizer = () => {
  const [data, setData] = useState([]);
  const [colors, setColors] = useState([]);
  const [current, setCurrent] = useState(1);
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
  }, [data, colors, current]);

  useEffect(() => {
    let interval;
    if (isAutoSorting && !sorted) {
      interval = setInterval(() => {
        insertionSortStep();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isAutoSorting, data, current, sorted]);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const insertionSortStep = () => {
    const array = [...data];
    const colorArray = [...colors];
    let i = current;
    let j = i - 1;
    let key = array[i];

    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      colorArray[j + 1] = colorArray[j];
      j--;
    }
    array[j + 1] = key;
    colorArray[j + 1] = getRandomColor();

    if (current < array.length - 1) {
      setData(array);
      setColors(colorArray);
      setMessage(`Inserting ${key} into the sorted portion of the array.`);
      setCurrent(current + 1);
    } else {
      setData(array);
      setColors(colorArray);
      setMessage("Array is sorted!");
      setSorted(true);
      setIsAutoSorting(false);
    }
  };

  const drawChart = () => {
    const width = 600;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };

    d3.select("#chart").selectAll("*").remove();
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

    const xAxis = (g) =>
      g.attr("transform", `translate(0,${height - margin.bottom})`).call(
        d3
          .axisBottom(xScale)
          .tickFormat((i) => i + 1)
          .tickSizeOuter(0)
      );

    const yAxis = (g) =>
      g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(yScale));

    // svg.append('g').call(xAxis);
    // svg.append('g').call(yAxis);

    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => xScale(i))
      .attr("y", (d) => yScale(d))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => yScale(0) - yScale(d))
      .attr("fill", (d, i) => colors[i]);

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

    // Add pointer (triangle) to the current element
    if (!sorted && data.length > 0) {
      const pointerSize = 10;
      const xPos = xScale(current) + xScale.bandwidth() / 2;
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
    insertionSortStep();
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
        <h2>Insertion Sort Visualizer</h2>
        <label>
          We have a <span>unsorted</span> list of 10 numbers from which we want
          to sort in ascending order
        </label>

        <label>Click on the buttons below to visualize the Insertion Sort!</label>
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

export default InsertionSortVisualizer;
