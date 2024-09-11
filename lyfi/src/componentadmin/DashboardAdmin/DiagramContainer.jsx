import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  const totalProducts = 500; // Jumlah total produk
  const chartData = [
    { label: "Facewash", value: 120 },
    { label: "Serum", value: 180 },
    { label: "Moisturizer", value: 100 },
    { label: "Sunscreen", value: 100 },
  ];

  const data = {
    labels: chartData.map((item) => item.label),
    datasets: [
      {
        data: chartData.map((item) => (item.value / totalProducts) * 100),
        backgroundColor: ["#4caf50", "#009688", "#f44336", "#000000"],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="diagram-container mt-4">
      <h3>Diagram Kategori</h3>
      <div className="chart-legend-wrapper">
        <div className="chart-wrapper">
          <Doughnut data={data} className="chart-main d-none d-md-block" />
        </div>
        <div className="divider"></div> {/* Garis pembatas */}
        <div className="custom-legend">
          {chartData.map((item, index) => (
            <div className="legend-item" key={index}>
              <span>{`${item.label} ${(
                (item.value / totalProducts) *
                100
              ).toFixed(2)}%`}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoughnutChart;
