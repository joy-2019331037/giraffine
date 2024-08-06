import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

const QuickSortVisualizer = () => {
  const [data, setData] = useState([]);
  const [steps, setSteps] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [message, setMessage] = useState('');
  const [isAutoSorting, setIsAutoSorting] = useState(false);

  const timeoutRef = useRef(null);

  useEffect(() => {
    const generateData = () => {
      const array = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
      setData(array);
      const steps = quickSort(array);
      setSteps(steps);
      setStepIndex(0);
    };

    generateData();
  }, []);

  useEffect(() => {
    drawChart();
  }, [data, stepIndex]);

  useEffect(() => {
    if (isAutoSorting) {
      timeoutRef.current = setTimeout(() => {
        handleNextStep();
      }, 1000);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [isAutoSorting, stepIndex]);

  const quickSort = (array) => {
    const steps = [];
    const recursiveSort = (arr, left, right) => {
      if (left < right) {
        const pivotIndex = partition(arr, left, right);
        steps.push({
          array: arr.slice(),
          left,
          right,
          pivotIndex,
          message: `Pivot chosen: ${arr[pivotIndex]}. Partitioning between indices ${left} and ${right}.`
        });
        recursiveSort(arr, left, pivotIndex - 1);
        recursiveSort(arr, pivotIndex + 1, right);
      }
    };

    const partition = (arr, left, right) => {
      const pivot = arr[right];
      let i = left - 1;
      let swapMessage = `Partitioning around pivot ${pivot}. Initial array: ${arr.join(', ')}.`;

      for (let j = left; j < right; j++) {
        if (arr[j] < pivot) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]];
          swapMessage += ` Swapping ${arr[i]} and ${arr[j]}.`;
        }
      }
      [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
      swapMessage += ` Final swap with pivot: ${arr[i + 1]} and ${arr[right]}.`;
      steps.push({
        array: arr.slice(),
        left,
        right,
        pivotIndex: i + 1,
        message: swapMessage
      });
      return i + 1;
    };

    const arr = array.slice();
    recursiveSort(arr, 0, arr.length - 1);
    steps.push({
      array: arr.slice(),
      left: 0,
      right: arr.length - 1,
      pivotIndex: -1,
      message: 'Sorting completed!'
    });
    return steps;
  };

  const handleNextStep = () => {
    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
      setData(steps[stepIndex + 1].array);
      setMessage(steps[stepIndex + 1].message);
    } else {
      setIsAutoSorting(false);
      setMessage('Array is sorted!');
    }
  };

  const handleAutoSort = () => {
    setIsAutoSorting(true);
  };

  const handleStopSort = () => {
    setIsAutoSorting(false);
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

    if (stepIndex < steps.length) {
      const { pivotIndex, left, right } = steps[stepIndex];
      const pointerSize = 10;
      const pivotXPos = xScale(pivotIndex) + xScale.bandwidth() / 2;
      const yPos = yScale(0) + 10;

      svg.append('polygon')
        .attr('points', `
          ${pivotXPos},${yPos} 
          ${pivotXPos - pointerSize},${yPos + pointerSize} 
          ${pivotXPos + pointerSize},${yPos + pointerSize}
        `)
        .attr('fill', 'red');

      svg.append('rect')
        .attr('x', xScale(left))
        .attr('y', yScale(d3.max(data) + 10) + 5)
        .attr('width', xScale(right) - xScale(left) + xScale.bandwidth())
        .attr('height', 5)
        .attr('fill', 'blue');
    }
  };

  return (
    <div>
      <svg id="chart"></svg>
      <div>
        <button onClick={handleNextStep} disabled={isAutoSorting}>
          Next Step
        </button>
        <button onClick={handleAutoSort} disabled={isAutoSorting || stepIndex >= steps.length - 1}>
          Auto Sort
        </button>
        <button onClick={handleStopSort} disabled={!isAutoSorting}>
          Stop
        </button>
      </div>
      <p>{message}</p>
    </div>
  );
};

export default QuickSortVisualizer;


// import React, { useState, useEffect, useRef } from 'react';
// import * as d3 from 'd3';

// const QuickSortVisualizer = () => {
//   const [data, setData] = useState([]);
//   const [steps, setSteps] = useState([]);
//   const [stepIndex, setStepIndex] = useState(0);
//   const [message, setMessage] = useState('');
//   const [isAutoSorting, setIsAutoSorting] = useState(false);

//   const timeoutRef = useRef(null);

//   useEffect(() => {
//     const generateData = () => {
//       const array = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
//       setData(array);
//       const steps = quickSort(array);
//       setSteps(steps);
//       setStepIndex(0);
//     };

//     generateData();
//   }, []);

//   useEffect(() => {
//     drawChart();
//   }, [data, stepIndex]);

//   useEffect(() => {
//     if (isAutoSorting) {
//       timeoutRef.current = setTimeout(() => {
//         handleNextStep();
//       }, 1000);
//     }
//     return () => clearTimeout(timeoutRef.current);
//   }, [isAutoSorting, stepIndex]);

//   const quickSort = (array) => {
//     const steps = [];
//     const recursiveSort = (arr, left, right) => {
//       if (left < right) {
//         const pivotIndex = partition(arr, left, right);
//         steps.push({ 
//           array: arr.slice(), 
//           left, 
//           right, 
//           pivotIndex, 
//           message: `Pivot chosen: ${arr[pivotIndex]} from index ${pivotIndex}.` 
//         });
//         recursiveSort(arr, left, pivotIndex - 1);
//         recursiveSort(arr, pivotIndex + 1, right);
//       }
//     };

//     const partition = (arr, left, right) => {
//       const pivot = arr[right];
//       let i = left - 1;
//       for (let j = left; j < right; j++) {
//         if (arr[j] < pivot) {
//           i++;
//           [arr[i], arr[j]] = [arr[j], arr[i]];
//           steps.push({ 
//             array: arr.slice(), 
//             left, 
//             right, 
//             pivotIndex: right, 
//             message: `Swapping ${arr[i]} and ${arr[j]} as ${arr[j]} is less than pivot ${pivot}.` 
//           });
//         }
//       }
//       [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
//       steps.push({ 
//         array: arr.slice(), 
//         left, 
//         right, 
//         pivotIndex: i + 1, 
//         message: `Placing pivot ${pivot} at correct position.` 
//       });
//       return i + 1;
//     };

//     const arr = array.slice();
//     recursiveSort(arr, 0, arr.length - 1);
//     return steps;
//   };

//   const handleNextStep = () => {
//     if (stepIndex < steps.length - 1) {
//       setStepIndex(stepIndex + 1);
//       setData(steps[stepIndex + 1].array);
//       setMessage(steps[stepIndex + 1].message);
//     } else {
//       setIsAutoSorting(false);
//       setMessage('Array is sorted!');
//     }
//   };

//   const handleAutoSort = () => {
//     setIsAutoSorting(true);
//   };

//   const handleStopSort = () => {
//     setIsAutoSorting(false);
//   };

//   const drawChart = () => {
//     const width = 600;
//     const height = 300;
//     const margin = { top: 20, right: 30, bottom: 30, left: 40 };

//     d3.select('#chart').selectAll('*').remove();
//     const svg = d3.select('#chart')
//                   .attr('width', width)
//                   .attr('height', height)
//                   .style('background', '#f4f4f4')
//                   .style('margin-top', '50px');

//     const xScale = d3.scaleBand()
//                      .domain(d3.range(data.length))
//                      .range([margin.left, width - margin.right])
//                      .padding(0.1);

//     const yScale = d3.scaleLinear()
//                      .domain([0, d3.max(data) + 10])
//                      .range([height - margin.bottom, margin.top]);

//     svg.selectAll('rect')
//       .data(data)
//       .enter()
//       .append('rect')
//       .attr('x', (d, i) => xScale(i

