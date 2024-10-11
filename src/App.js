import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';

const Dashboard = () => {
  const [statistics, setStatistics] = useState({ totalSales: 0, soldItems: 0, notSoldItems: 0 });
  const [barChartData, setBarChartData] = useState({});
  const [pieChartData, setPieChartData] = useState({});
  const [month, setMonth] = useState('March'); // Default to March

  // Fetch statistics
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/statistics`, {
          params: { month }
        });
        setStatistics(response.data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    const fetchBarChartData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/bar-chart`, {
          params: { month }
        });

        const priceRanges = response.data.map(item => item._id);
        const itemCounts = response.data.map(item => item.count);

        setBarChartData({
          labels: priceRanges,
          datasets: [
            {
              label: 'Items per Price Range',
              data: itemCounts,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
            }
          ]
        });
      } catch (error) {
        console.error('Error fetching bar chart data:', error);
      }
    };

    const fetchPieChartData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/pie-chart`, {
          params: { month }
        });

        const categories = response.data.map(item => item.category);
        const itemCounts = response.data.map(item => item.count);

        setPieChartData({
          labels: categories,
          datasets: [
            {
              label: 'Items per Category',
              data: itemCounts,
              backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
              ]
            }
          ]
        });
      } catch (error) {
        console.error('Error fetching pie chart data:', error);
      }
    };

    fetchStatistics();
    fetchBarChartData();
    fetchPieChartData();
  }, [month]);

  return (
    <div>
      <h1>Transactions Dashboard</h1>

      <select onChange={(e) => setMonth(e.target.value)} value={month}>
        <option>January</option>
        <option>February</option>
        <option>March</option>
        <option>April</option>
        <option>May</option>
        <option>June</option>
        <option>July</option>
        <option>August</option>
        <option>September</option>
        <option>October</option>
        <option>November</option>
        <option>December</option>
      </select>

      {/* Display Statistics */}
      <div>
        <h2>Statistics for {month}</h2>
        <p>Total Sales: ${statistics.totalSales}</p>
        <p>Sold Items: {statistics.soldItems}</p>
        <p>Not Sold Items: {statistics.notSoldItems}</p>
      </div>

      {/* Bar Chart */}
      <div>
        <h2>Items per Price Range</h2>
        <Bar
          data={barChartData}
          options={{
            responsive: true,
            scales: {
              y: { beginAtZero: true },
            },
          }}
        />
      </div>

      {/* Pie Chart */}
      <div>
        <h2>Items per Category</h2>
        <Pie
          data={pieChartData}
          options={{
            responsive: true,
          }}
        />
      </div>
    </div>
  );
};

export default Dashboard;
