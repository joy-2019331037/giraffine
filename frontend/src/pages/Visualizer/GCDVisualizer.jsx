import React, { useState } from "react";
import * as d3 from "d3";
import "./gcdvisualizer.css";

const GCDVisualizer = () => {
  const [num1, setNum1] = useState(5);
  const [num2, setNum2] = useState(2);
  const [steps, setSteps] = useState([]);
  const [actionMessage, setActionMessage] = useState("");
  const [done, setDone] = useState(false);

  const calculateGCDSteps = (a, b) => {
    let steps = [];

    // Ensure that 'a' is the larger number and 'b' is the smaller number
    if (b > a) [a, b] = [b, a];

    while (b !== 0) {
      const remainder = a % b;
      steps.push({
        dividend: a,
        divisor: b,
        quotient: Math.floor(a / b),
        remainder: remainder,
      });
      a = b;
      b = remainder;
    }

    return steps;
  };

  const visualizeGCD = async () => {
    setSteps([]);
    setDone(false);
    setActionMessage(`Calculating GCD of ${num1} and ${num2}`);

    const steps = calculateGCDSteps(num1, num2);
    setSteps(steps);

    const svg = d3
      .select("#gcd-visualizer")
      .attr("width", 550)
      .attr("height", 500)
    // .style("border", "1px solid black");

    svg.selectAll("*").remove(); // Clear previous visuals

    for (let i = 0; i < steps.length; i++) {
      const { dividend, divisor, quotient, remainder } = steps[i];
      const yOffset = i * 100;

      // Write the dividend (a)
      svg
        .append("text")
        .attr("x", 260)
        .attr("y", 40 + yOffset)
        .attr("font-size", "15px")
        .attr("text-anchor", "end")
        .text(dividend);

      svg
        .append("line")
        .attr("x1", 220)
        .attr("y1", 25 + yOffset) // Starting y position of the line
        .attr("x2", 220)
        .attr("y2", 50 + yOffset) // Ending y position of the line
        .attr("stroke", "black")
        .attr("stroke-width", 1);

      svg
        .append("line")
        .attr("x1", 280)
        .attr("y1", 25 + yOffset) // Starting y position of the line
        .attr("x2", 280)
        .attr("y2", 50 + yOffset) // Ending y position of the line
        .attr("stroke", "black")
        .attr("stroke-width", 1);

      // Write the divisor (b)
      svg
        .append("text")
        .attr("x", 200)
        .attr("y", 40 + yOffset)
        .attr("font-size", "15px")
        .attr("fill", "blue")
        .attr("text-anchor", "start")
        .text(divisor);

      // Write the quotient
      svg
        .append("text")
        .attr("x", 290)
        .attr("y", 40 + yOffset)
        .attr("font-size", "15px")
        .attr("fill", "red")
        .attr("text-anchor", "start")
        .text(quotient);

      // Write the remainder
      svg
        .append("text")
        .attr("x", 250)
        .attr("y", 90 + yOffset)
        .attr("font-size", "15px")
        .attr("fill", "orange")
        .attr("text-anchor", "start")
        .text(remainder);

      //write the multiple
      svg
        .append("text")
        .attr("x", 250)
        .attr("y", 60 + yOffset)
        .attr("font-size", "15px")
        .attr("fill", "orange")
        .attr("text-anchor", "start")
        .text(quotient * divisor);

      // Draw division line
      svg
        .append("line")
        .attr("x1", 220)
        .attr("y1", 70 + yOffset)
        .attr("x2", 290)
        .attr("y2", 70 + yOffset)
        .attr("stroke", "black")
        .attr("stroke-width", 1);

      if (i < steps.length - 1) {
        svg
          .append("text")
          .attr("x", 290)
          .attr("y", 90 + yOffset)
          .attr("font-size", "12px")
          .attr("fill", "green")
          .attr("text-anchor", "start")
          .text("<-- Next divisor");
      }
      else if(i==steps.length-1){
        svg
        .append("text")
        .attr("x", 290)
        .attr("y", 90 + yOffset)
        .attr("font-size", "12px")
        .attr("fill", "green")
        .attr("text-anchor", "start")
        .text("<-- Remainder is 0. This divisor is the GCD");
      }

      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (remainder === 0) {
        setActionMessage(`GCD is ${divisor}`);
        setDone(true);
        return;
      }
    }
  };

  const reset = () => {
    d3.select("#gcd-visualizer").selectAll("*").remove();
    setSteps([]);
    setActionMessage("");
    setDone(false);
  };

  return (
    <div className="visualizer">
      <div className="header">
        <h2>GCD Calculation Visualization</h2>
        <label>
          Enter two numbers to calculate their GCD using the Euclidian method.
        </label>
      </div>

      <div className="input-container">
        <div>
          <label>Number 1</label>
          <input
            type="number"
            value={num1}
            onChange={(e) => setNum1(parseInt(e.target.value))}
          />
        </div>
        <div>
          <label>Number 2</label>
          <input
            type="number"
            value={num2}
            onChange={(e) => setNum2(parseInt(e.target.value))}
          />
        </div>
      </div>

      <div className="content">
        <div className="buttons">
          <button onClick={visualizeGCD}>Calculate GCD</button>
          <button onClick={reset}>Reset</button>
        </div>

        <p>{actionMessage}</p>

        <svg id="gcd-visualizer"></svg>
      </div>
    </div>
  );
};

export default GCDVisualizer;
