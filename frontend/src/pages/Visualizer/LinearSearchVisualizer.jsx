import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import "./visualizer.css";
import "animate.css";
import Lottie from "lottie-react";
import visualizer_success from "../../assets/data/animationData/visu_success.json";

const LinearSearchVisualizer = () => {
  const [data, setData] = useState([]);
  const [target, setTarget] = useState(null);
  const [current, setCurrent] = useState(0);
  const [message, setMessage] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isAutoSearching, setIsAutoSearching] = useState(false);
  const [found, setFound] = useState(false);

  useEffect(() => {
    // Generate an array of random numbers
    const generateData = () => {
      const array = Array.from({ length: 15 }, () =>
        Math.floor(Math.random() * 100)
      );
      setData(array);
      setTarget(array[Math.floor(Math.random() * array.length)]);
    };

    generateData();
  }, []);

  useEffect(() => {
    drawChart();
  }, [data, current]);

  useEffect(() => {
    let interval;
    if (isAutoSearching) {
      interval = setInterval(() => {
        linearSearchStep();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isAutoSearching, current]);

  const linearSearchStep = () => {
    if (current >= data.length) {
      setMessage(`Target ${target} not found in the array.`);
      setIsAutoSearching(false);
      return;
    }

    if (data[current] === target) {
      setMessage(`Target ${target} found at index ${current}`);
      setIsAutoSearching(false);
      setFound(true);
    } else {
      setMessage(
        `Target ${target} not found at index ${current}. Checking next element...`
      );
      setCurrent(current + 1);
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
      .padding(0.1); // Increase the padding between bars

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data) + 10])
      .range([height - margin.bottom, margin.top]);

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

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

    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => xScale(i))
      .attr("y", (d) => yScale(d))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => yScale(0) - yScale(d))
      .attr("fill", (d, i) => colorScale(i));

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

    // Highlight current value
    if (current !== null && current < data.length) {
      const xPos = xScale(current) + xScale.bandwidth() / 2;
      const yPos = yScale(data[current]) - 20;

      svg
        .append("polygon")
        .attr(
          "points",
          `
          ${xPos},${yPos} 
          ${xPos - 10},${yPos - 10} 
          ${xPos + 10},${yPos - 10}
        `
        )
        .attr("fill", "red");
    }
  };

  const handleNextStep = () => {
    linearSearchStep();
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
        <h2>Linear Search Visualizer</h2>
        <label>
          Linear Search sequentially checks each element in a list until the
          desired element is found or the list is exhausted.
        </label>
        <label>
          We have a <span>random</span> list of 15 numbers here from which one
          particular number is to be searched out.
        </label>
        <label>
          Let's say, the element pointed by the green arrow is our target:{" "}
          <span>{target}</span>
        </label>
        <label>
          Click on the buttons below to visualize the linear search!
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
            disabled={isAutoSearching || current >= data.length}
          >
            Next Step
          </button>
          <button
            onClick={handleAutoSearch}
            disabled={isAutoSearching || current >= data.length}
          >
            Auto Simulate
          </button>
          <button onClick={handleStopSearch} disabled={!isAutoSearching}>
            Stop
          </button>
        </div>
      </div>

      <div className="footer">
        {current >= data.length && (
          <p>Target {target} not found in the array.</p>
        )}
        {!found && <p>{message}</p>}
        {found && <p className="found">{message}</p>}
      </div>
    </div>
  );
};

export default LinearSearchVisualizer;
