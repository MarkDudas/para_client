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

const LineChartTopJobToday = () => {
  const { data } = useQuery<ILineChart[]>({
    queryKey: ["LineChartTopJob"],
    queryFn: () =>
      axios
        .get(
          `${
            import.meta.env.VITE_APP_API_URL
          }/api/applicant/get-by-job/count/today`
        )
        .then((res) => res.data),
  });

  const graph = {
    labels: data?.map((item) => item.jobPosted),
    datasets: [
      {
        label: `Applied Jobs for today`,
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
        maxWidth: "1100px",
        height: "500px",
      }}
    >
      <h2>Applied Jobs for today:</h2>
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

export default LineChartTopJobToday;
