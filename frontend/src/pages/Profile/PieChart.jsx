// PieChart.jsx
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const PieChart = ({ data }) => {
  const chartData = {
    labels: data.levels,
    datasets: [
      {
        data: data.values,
        backgroundColor: ["#ff0037", "orange", "blueviolet","blue", "#4CAF50"],
        hoverOffset: 4,
      },
    ],
  };

  return <Pie data={chartData} />;
};

export default PieChart;
