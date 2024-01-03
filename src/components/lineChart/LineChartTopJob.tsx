import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

interface ILineChart {
  jobPosted: string;
  count: number;
}

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
);

const LineChartTopJob = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("month");

  const { data } = useQuery<ILineChart[]>({
    queryKey: ["LineChartTopJob", selectedFilter],
    queryFn: () =>
      axios
        .get(
          `${
            import.meta.env.VITE_APP_API_URL
          }/api/applicant/get-by-job/count/${selectedFilter}`
        )
        .then((res) => res.data),
  });

  const graph = {
    labels: data?.map((item) => item.jobPosted),
    datasets: [
      {
        label: `Top 3 Most Applied Job this ${selectedFilter}`,
        data: data?.map((item) => item.count),
        backgroundColor: [
          "rgba(173, 216, 230, 0.2)",
          "rgba(255, 140, 0, 0.2)",
          "rgba(144, 238, 144, 0.2)",
          "rgba(255, 69, 0, 0.2)",
          "rgba(255, 192, 203, 0.2)",
          "rgba(0, 128, 0, 0.2)",
          "rgba(255, 215, 0, 0.2)",
        ],
        borderColor: [
          "rgb(173, 216, 230)",
          "rgb(255, 140, 0)",
          "rgb(144, 238, 144)",
          "rgb(255, 69, 0)",
          "rgb(255, 192, 203)",
          "rgb(0, 128, 0)",
          "rgb(255, 215, 0)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
  };

  return (
    <div
      style={{
        marginBottom: "200px",
        width: "100%",
        height: "500px",
        maxWidth: "1100px",
      }}
    >
      <h2>Top 3 Most Applied Jobs:</h2>
      <select
        style={{ padding: "10px 50px", fontSize: "20px" }}
        onChange={(e) => setSelectedFilter(e.target.value)}
      >
        <option value="month">Month</option>
        <option value="year">Year</option>
      </select>
      <div
        style={{
          padding: "20px",
          border: "3px solid gray",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Line data={graph} options={barOptions} />
      </div>
    </div>
  );
};

export default LineChartTopJob;
