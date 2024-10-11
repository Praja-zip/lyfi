import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  const [categoryData, setCategoryData] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fecthChart = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/chartdata`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setCategoryData(response.data.categories);
        console.log(response.data.categories)
      } catch (error) {
        console.log("Error Fetching Data", error);
      }
    };
    fecthChart();
  }, [])
  
  const totalProducts = categoryData.reduce((acc, item) => acc + item.total_produk, 0);

  const data = {
    labels: categoryData.map((item) => item.nama_kategori),
    datasets: [
      {
        data: categoryData.map((item) => item.total_produk),
        backgroundColor: ["#FAF7F0", "#D8D2C2", "#B17457", "#4A4947",
           "#705C53", "#B7B7B7", "#EDDFE0", "#493628", "#AB886D"],
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
          {categoryData.map((item, index) => (
            <div className="legend-item" key={index}>
              <span>{`${item.nama_kategori} ${(
                (item.total_produk / totalProducts) *
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
