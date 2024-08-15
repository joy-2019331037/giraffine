import React, { useState, useEffect } from "react";
import "./MergeSortVisualizer.css";

const MergeSortVisualizer = () => {
  const hardcodedSteps = [
    [6, 89, 34, 23, 56, 12, 90],
    [6, 89, 34, 23, "  ", 56, 12, 90],
    [6, 89, "  ", 34, 23, "  ", 56, 12, "  ", 90],
    [6, "  ", 89, "  ", 34, "  ", 23, "  ", 56, "  ", 12, "  ", 90],
    [6, "  ", 89, "  ", 23, "  ", 34, "  ", 12, "  ", 56, "  ", 90],
    [6, 23, "  ", 34, 89, "  ", 12, 56, "  ", 90],
    [6, 12, 23, 34, "  ", 56, 89, 90],
    [6, 12, 23, 34, 56, 89, 90],
  ];

  const messages = [
    "Spliting the elements into subarrays",
    "Spliting the subarrays again",
    "Spliting the subarrays again",
    "Sorting the elements pairwise",
    "Merging and sorting the subarrays",
    "Merging and sorting the subarrays",
    "Array is sorted!!!",
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [isAutoSimulate, setIsAutoSimulate] = useState(false);

  useEffect(() => {
    if (isAutoSimulate && currentStep < hardcodedSteps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isAutoSimulate, currentStep, hardcodedSteps.length]);

  const handleNextStep = () => {
    if (currentStep < hardcodedSteps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleAutoSimulate = () => {
    setIsAutoSimulate(true);
  };

  // Render the cumulative steps with line breaks between each hardcoded step
  return (
    <div className="merge-sort-visualizer">
      <div className="header">
        <h2>Merge Sort Visualizer</h2>
        <label>
          Merge Sort is a <span>divide-and-conquer</span> algorithm that recursively splits an array into smaller subarrays 
        </label>
        <label>
          until each subarray contains a single
          element.
        </label>
        <label>
          {" "}
          It then merges and sorts these subarrays back together to form the
          sorted array!
        </label>
        <label>Click the buttons below to visualize the merge sort!</label>
      </div>
      <div className="controls">
        <button
          onClick={handleNextStep}
          disabled={currentStep >= hardcodedSteps.length - 1}
        >
          Next Step
        </button>
        <button
          onClick={handleAutoSimulate}
          disabled={isAutoSimulate || currentStep >= hardcodedSteps.length - 1}
        >
          Auto Simulate
        </button>
      </div>
      <div className="array-container">
        {hardcodedSteps.slice(0, currentStep + 1).map((step, stepIdx) => (
          <div key={stepIdx} className="merge-step">
            {step.map((value, idx) => (
              <div key={idx} className="array-item">
                {value}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="message">
        <p>{messages[currentStep - 1] || "Here is an unsorted array of 7 numbers"}</p>
      </div>

      {/* <div>
        {messages.map((value, index) => (
          <div key={index}>{value}</div>
        ))}
      </div> */}
    </div>
  );
};

export default MergeSortVisualizer;
