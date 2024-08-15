import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import "./visualizer.css";

import Lottie from "lottie-react";
import visualizer_success from "../../../assets/data/animationData/visu_success.json";

const SieveVisualizer = () => {
  const [actionMessage, setActionMessage] = useState("");
  const [currentStep, setCurrentStep] = useState(2);
  const [primes, setPrimes] = useState([]);
  const [numbers] = useState(Array.from({ length: 100 }, (_, i) => i + 1));
  const [done, setDone] = useState(false);
  const [primeList, setPrimeList] = useState([]);
  const [isNextStepDisabled, setIsNextStepDisabled] = useState(false); // New state variable

  useEffect(() => {
    const width = 690; // Updated width for 15 columns
    const height = 340;
    const padding = 10;
    const cellSize = (width - 2 * padding) / 15; // 15 columns
    const svg = d3
      .select("#sieve-visualizer")
      .attr("width", width)
      .attr("height", height);

    // Create cells for numbers
    const cells = svg
      .selectAll("rect")
      .data(numbers)
      .enter()
      .append("rect")
      .attr("x", (d, i) => padding + (i % 15) * cellSize) // 15 columns
      .attr("y", (d, i) => padding + Math.floor(i / 15) * cellSize) // 15 columns
      .attr("width", cellSize - 1)
      .attr("height", cellSize - 1)
      .attr("fill", "lightgray")
      .attr("id", (d) => `cell-${d}`);

    // Add number labels
    svg
      .selectAll("text")
      .data(numbers)
      .enter()
      .append("text")
      .attr("x", (d, i) => padding + (i % 15) * cellSize + cellSize / 2) // 15 columns
      .attr(
        "y",
        (d, i) => padding + Math.floor(i / 15) * cellSize + cellSize / 2
      ) // 15 columns
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .text((d) => d);
  }, [numbers]);

  const markMultiples = async (number) => {
    d3.selectAll(`#cell-${number}`)
      .transition()
      .duration(500)
      .attr("fill", "lightgreen");
    for (let i = number * 2; i <= 100; i += number) {
      if (i !== number) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        d3.select(`#cell-${i}`)
          .transition()
          .duration(500)
          .attr("fill", "tomato");
      }
    }
    setActionMessage(`All multiples of ${number} are marked`);
  };

  const nextStep = async () => {
    for (let i = currentStep; i <= 100; i++) {
      if (!primes[i]) {
        setActionMessage(`Marking multiples of ${i}`);
        await markMultiples(i);
        let newPrimes = [...primes];
        for (let j = i * i; j <= 100; j += i) {
          newPrimes[j] = true;
        }
        setPrimes(newPrimes);
        setCurrentStep(i + 1);

        if (i === 7) {
          setIsNextStepDisabled(true); // Disable the button
          // All remaining numbers are prime
          await new Promise((resolve) => setTimeout(resolve, 1000));
          setActionMessage("The remaining elements are prime");
          await new Promise((resolve) => setTimeout(resolve, 1500));
          d3.selectAll("rect")
            .filter(function () {
              const id = +this.id.split("-")[1];
              return id > 7 && !primes[id];
            })
            .transition()
            .duration(500)
            .attr("fill", "lightgreen");
          setPrimeList(numbers.filter((num) => !newPrimes[num] && num > 1));
          setDone(true);
          setActionMessage("Completed");
          return;
        }

        return;
      }
    }

    setActionMessage("Completed");
  };

  const reset = () => {
    d3.selectAll("rect").attr("fill", "lightgray");
    setActionMessage("");
    setCurrentStep(0);
    setPrimes([]);
    setIsNextStepDisabled(false); // Re-enable the button
  };

  return (
    <div className="visualizer">
      <div className="header">
        <h2>Sieve of Eratosthenes Visualization</h2>
        <label>
          This visualization demonstrates the Sieve of Eratosthenes algorithm
          for finding all prime numbers up to 100.{" "}
        </label>
        <label>
          The algorithm works by iteratively marking the multiples of each prime
          number starting from 2.{" "}
        </label>
        <label>
          Non-prime numbers are highlighted in red, while prime numbers are
          shown in green once all multiples are marked.
        </label>
      </div>

      <div className="content">
        <div>
          {done && (
            <Lottie className="animation" animationData={visualizer_success} />
          )}
          <svg id="sieve-visualizer"></svg>
          {done && (
            <Lottie className="animation" animationData={visualizer_success} />
          )}
        </div>
        <div className="buttons">
          <button onClick={nextStep} disabled={isNextStepDisabled}>
            Next Step
          </button>
        </div>
      </div>

      <div className="footer">
        <p>{actionMessage}</p>
        {done && (
          <div className="prime-list">
            <h3>Prime Numbers</h3>
            <p>{primeList.join(", ")}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SieveVisualizer;
