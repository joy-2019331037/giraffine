import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';

const BubbleSortVisualizer = () => {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);
  const [sorted, setSorted] = useState(false);
  const [message, setMessage] = useState('');
  const [isComparing, setIsComparing] = useState(false);
  const [isAutoSorting, setIsAutoSorting] = useState(false);

  useEffect(() => {
    // Generate an array of random numbers
    const generateData = () => {
      const array = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
      setData(array);
    };

    generateData();
  }, []);

  useEffect(() => {
    drawChart();
  }, [data, index]);

  useEffect(() => {
    let interval;
    if (isAutoSorting && !sorted) {
      interval = setInterval(() => {
        bubbleSortStep();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isAutoSorting, data, index, sorted]);

  const bubbleSortStep = () => {
    const array = [...data];
    if (index < array.length - 1) {
      setIsComparing(true);
      if (array[index] > array[index + 1]) {
        [array[index], array[index + 1]] = [array[index + 1], array[index]];
        setData(array);
        setMessage(`Swapping ${array[index + 1]} and ${array[index]} because ${array[index + 1]} is greater than ${array[index]}`);
      } else {
        setMessage(`No swap needed because ${array[index]} is less than or equal to ${array[index + 1]}`);
      }
      setIndex(index + 1);
    } else {
      setIndex(0);
      if (isSorted(array)) {
        setSorted(true);
        setMessage('Array is sorted!');
        setIsComparing(false);
        setIsAutoSorting(false);
      } else {
        setMessage('Starting next pass through the array.');
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

    d3.select('#chart').selectAll('*').remove();
    const svg = d3.select('#chart')
                  .attr('width', width)
                  .attr('height', height)
                  .style('background', '#f4f4f4')
                  .style('margin-top', '50px');

    const xScale = d3.scaleBand()
                     .domain(d3.range(data.length))
                     .range([margin.left, width - margin.right])
                     .padding(0.1);

    const yScale = d3.scaleLinear()
                     .domain([0, d3.max(data) + 10])
                     .range([height - margin.bottom, margin.top]);

    const xAxis = g => g
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).tickFormat(i => i + 1).tickSizeOuter(0));

    const yAxis = g => g
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale));

    // svg.append('g').call(xAxis);
    // svg.append('g').call(yAxis);

    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => xScale(i))
      .attr('y', d => yScale(d))
      .attr('width', xScale.bandwidth())
      .attr('height', d => yScale(0) - yScale(d))
      .attr('fill', 'teal');

    svg.selectAll('text.label')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('x', (d, i) => xScale(i) + xScale.bandwidth() / 2)
      .attr('y', d => yScale(d) - 5)
      .attr('text-anchor', 'middle')
      .text(d => d);

    // Add pointer (triangle) to the current element
    if (!sorted && data.length > 0) {
      const pointerSize = 10;
      const xPos = xScale(index) + xScale.bandwidth() / 2;
      const yPos = yScale(0) + 10;// Position at the bottom

      svg.append('polygon')
        .attr('points', `
          ${xPos},${yPos} 
          ${xPos - pointerSize},${yPos + pointerSize} 
          ${xPos + pointerSize},${yPos + pointerSize}
        `)
        .attr('fill', 'red');
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
    <div>
      <svg id="chart"></svg>
      <div>
        <button onClick={handleNextStep} disabled={sorted || isAutoSorting}>
          Next Step
        </button>
        <button onClick={handleAutoSort} disabled={sorted || isAutoSorting}>
          Auto Sort
        </button>
        <button onClick={handleStopSort} disabled={!isAutoSorting}>
          Stop
        </button>
      </div>
      {sorted && <p>Array is sorted!</p>}
      <p>{message}</p>
    </div>
  );
};

export default BubbleSortVisualizer;
