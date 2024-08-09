import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import "./visualizer.css";

const QuickSortVisualizer = () => {
  const [data, setData] = useState([]);
  const [pivotIndex, setPivotIndex] = useState(null);
  const [leftMarker, setLeftMarker] = useState(null);
  const [rightMarker, setRightMarker] = useState(null);
  const [sorted, setSorted] = useState(false);
  const [message, setMessage] = useState("");
  const [isAutoSorting, setIsAutoSorting] = useState(false);
  const [history, setHistory] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const generateData = () => {
      const array = Array.from({ length: 8 }, () =>
        Math.floor(Math.random() * 100)
      );
      setData(array);
      setHistory([{ array, pivotIndex: null, leftMarker: null, rightMarker: null, message: "Initial Array" }]);
    };

    generateData();
  }, []);

  useEffect(() => {
    drawChart();
  }, [history, currentStep]);

  useEffect(() => {
    let interval;
    if (isAutoSorting && !sorted) {
      interval = setInterval(() => {
        handleNextStep();
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isAutoSorting, history, currentStep, sorted]);

  const quickSort = (arr, lb, ub) => {
    if (lb < ub) {
      const partitionResult = partition(arr, lb, ub);
      const [partitionIndex, newHistory] = partitionResult;
      setHistory((prevHistory) => [...prevHistory, ...newHistory]);
      quickSort(arr, lb, partitionIndex - 1);
      quickSort(arr, partitionIndex + 1, ub);
    } else if (lb === 0 && ub === data.length - 1) {
      setSorted(true);
      setMessage("Array is fully sorted!");
    }
  };

  const partition = (arr, lb, ub) => {
    const pivot = arr[lb];
    let s = lb;
    let e = ub;
    const newHistory = [];
    
    newHistory.push({ array: [...arr], pivotIndex: lb, leftMarker: s, rightMarker: e, message: `Choosing pivot: ${pivot}` });

    while (s < e) {
      while (arr[s] <= pivot && s < ub) {
        s++;
        newHistory.push({ array: [...arr], pivotIndex: lb, leftMarker: s, rightMarker: e, message: `Moving left marker to ${arr[s]}` });
      }
      while (arr[e] > pivot && e > lb) {
        e--;
        newHistory.push({ array: [...arr], pivotIndex: lb, leftMarker: s, rightMarker: e, message: `Moving right marker to ${arr[e]}` });
      }
      if (s < e) {
        [arr[s], arr[e]] = [arr[e], arr[s]];
        newHistory.push({ array: [...arr], pivotIndex: lb, leftMarker: s, rightMarker: e, message: `Swapping ${arr[s]} and ${arr[e]}` });
      }
    }
    
    [arr[lb], arr[e]] = [arr[e], arr[lb]];
    newHistory.push({ array: [...arr], pivotIndex: e, leftMarker: null, rightMarker: null, message: `Placing pivot in position ${arr[e]}` });

    return [e, newHistory];
  };

  const handleNextStep = () => {
    if (currentStep < history.length - 1) {
      setCurrentStep(currentStep + 1);
      const nextStep = history[currentStep + 1];
      setPivotIndex(nextStep.pivotIndex);
      setLeftMarker(nextStep.leftMarker);
      setRightMarker(nextStep.rightMarker);
      setMessage(nextStep.message);
    } else {
      setSorted(true);
      setMessage("Array is fully sorted!");
      setIsAutoSorting(false);
    }
  };

  const handleAutoSort = () => {
    setIsAutoSorting(true);
    setSorted(false);
    quickSort([...data], 0, data.length - 1);
  };

  const handleStopSort = () => {
    setIsAutoSorting(false);
  };

  const drawChart = () => {
    const width = 800;
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
      .domain(d3.range(history[currentStep].array.length))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(history[currentStep].array) + 10])
      .range([height - margin.bottom, margin.top]);

    const boxes = svg.selectAll("rect").data(history[currentStep].array);

    // Exit old elements not present in new data
    boxes.exit().remove();

    // Update existing elements
    boxes
      .transition()
      .duration(500)
      .attr("x", (d, i) => xScale(i))
      .attr("y", (d) => yScale(d))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => yScale(0) - yScale(d))
      .attr("fill", (d, i) =>
        i === pivotIndex
          ? "blue"
          : i === leftMarker || i === rightMarker
          ? "red"
          : "green"
      );

    // Enter new elements
    boxes
      .enter()
      .append("rect")
      .attr("x", (d, i) => xScale(i))
      .attr("y", (d) => yScale(d))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => yScale(0) - yScale(d))
      .attr("fill", (d, i) =>
        i === pivotIndex
          ? "blue"
          : i === leftMarker || i === rightMarker
          ? "red"
          : "green"
      );

    const labels = svg.selectAll("text.label").data(history[currentStep].array);

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
  };

  return (
    <div className="visualizer">
      <div className="header">
        <h2>Quick Sort Visualizer</h2>
      </div>

      <div className="content">
        <svg id="chart"></svg>
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
        <p>{message}</p>
      </div>
    </div>
  );
};

export default QuickSortVisualizer;
