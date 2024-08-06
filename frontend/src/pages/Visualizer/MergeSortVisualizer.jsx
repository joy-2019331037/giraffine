import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';

const MergeSortVisualizer = () => {
  const [data, setData] = useState([]);
  const [steps, setSteps] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [sorted, setSorted] = useState(false);
  const [message, setMessage] = useState('');
  const [isAutoSorting, setIsAutoSorting] = useState(false);

  useEffect(() => {
    const generateData = () => {
      const array = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
      setData(array);
      const steps = [];
      mergeSort([...array], 0, array.length, steps);
      setSteps(steps);
    };

    generateData();
  }, []);

  useEffect(() => {
    drawChart();
  }, [data, stepIndex]);

  useEffect(() => {
    let interval;
    if (isAutoSorting && !sorted) {
      interval = setInterval(() => {
        nextStep();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isAutoSorting, steps, stepIndex, sorted]);

  const mergeSort = (array, start, end, steps) => {
    if (end - start <= 1) return;

    const mid = Math.floor((start + end) / 2);
    steps.push({ array: [...array], left: array.slice(start, mid), right: array.slice(mid, end), type: 'split' });
    mergeSort(array, start, mid, steps);
    mergeSort(array, mid, end, steps);
    merge(array, start, mid, end, steps);
  };

  const merge = (array, start, mid, end, steps) => {
    const left = array.slice(start, mid);
    const right = array.slice(mid, end);

    let i = start, j = 0, k = 0;
    while (j < left.length && k < right.length) {
      if (left[j] < right[k]) {
        array[i++] = left[j++];
      } else {
        array[i++] = right[k++];
      }
      steps.push({ array: [...array], left, right, type: 'merge' });
    }

    while (j < left.length) {
      array[i++] = left[j++];
      steps.push({ array: [...array], left, right, type: 'merge' });
    }

    while (k < right.length) {
      array[i++] = right[k++];
      steps.push({ array: [...array], left, right, type: 'merge' });
    }
  };

  const nextStep = () => {
    if (stepIndex < steps.length) {
      setData(steps[stepIndex].array);
      setStepIndex(stepIndex + 1);
      setMessage(`Step ${stepIndex + 1}: ${steps[stepIndex].type}`);
    } else {
      setSorted(true);
      setMessage('Array is sorted!');
      setIsAutoSorting(false);
    }
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
                     .domain([0, d3.max(data)])
                     .nice()
                     .range([height - margin.bottom, margin.top]);

    svg.selectAll('rect')
       .data(data)
       .enter()
       .append('rect')
       .attr('x', (d, i) => xScale(i))
       .attr('y', d => yScale(d))
       .attr('height', d => yScale(0) - yScale(d))
       .attr('width', xScale.bandwidth())
       .attr('fill', (d, i) => {
         if (stepIndex > 0 && stepIndex < steps.length) {
           const { left, right, type } = steps[stepIndex];
           if (type === 'split') {
             if (i < left.length) return 'red';
             if (i >= left.length && i < left.length + right.length) return 'blue';
           } else if (type === 'merge') {
             if (left.includes(d)) return 'red';
             if (right.includes(d)) return 'blue';
           }
         }
         return 'steelblue';
       });

    if (stepIndex > 0 && stepIndex < steps.length) {
      const { left, right, type } = steps[stepIndex];
      if (type === 'split') {
        svg.selectAll('text.left')
           .data(left)
           .enter()
           .append('text')
           .attr('class', 'left')
           .attr('x', (d, i) => xScale(i))
           .attr('y', height - margin.bottom + 20)
           .text(d => d)
           .attr('fill', 'red');

        svg.selectAll('text.right')
           .data(right)
           .enter()
           .append('text')
           .attr('class', 'right')
           .attr('x', (d, i) => xScale(i + left.length))
           .attr('y', height - margin.bottom + 20)
           .text(d => d)
           .attr('fill', 'blue');
      }
    }
  };

  return (
    <div>
      <h1>Merge Sort Visualizer</h1>
      <svg id="chart"></svg>
      <div>
        <button onClick={nextStep} disabled={isAutoSorting || sorted}>Next Step</button>
        <button onClick={() => setIsAutoSorting(!isAutoSorting)} disabled={sorted}>
          {isAutoSorting ? 'Pause' : 'Auto Sort'}
        </button>
        <button onClick={() => window.location.reload()}>Reset</button>
      </div>
      <p>{message}</p>
    </div>
  );
};

export default MergeSortVisualizer;
