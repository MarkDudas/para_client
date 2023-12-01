import React, { useEffect } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import { useQuery } from "@tanstack/react-query";
import "./ApplicantChart.css";
import Navbar from "../../components/navbar/Navbar";
import { IApplicant } from "../../types/Types";


const ApplicantChart: React.FC = () => {
  const { data: applicants } = useQuery<IApplicant[] | undefined>({
    queryKey: ["ApplicantList"],
    queryFn: async () =>
      await axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/applicant`)
        .then((res) => res.data),
  });

  useEffect(() => {
    if (applicants) {
      // Count the occurrences of each job title
      const jobCounts: Record<string, number> = {};
      applicants.forEach((applicant) => {
        const jobTitle = applicant.actualJobPosted;
        jobCounts[jobTitle] = (jobCounts[jobTitle] || 0) + 1;
      });
  
      // Prepare data for the chart
      const jobTitles = Object.keys(jobCounts);
      const jobCountsData = Object.values(jobCounts);
  
      // Get the canvas element
      const ctx = document.getElementById("jobChart") as HTMLCanvasElement;
  
      // Destroy existing chart if it exists
      const existingChart = Chart.getChart(ctx);
      if (existingChart) {
        existingChart.destroy();
      }
  
      // Create a new bar chart
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: jobTitles,
          datasets: [
            {
              label: "Number of Applicants",
              data: jobCountsData,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [applicants]);
  

  return (
    <>
      <Navbar />
      <div className="container">
      <canvas id="jobChart" />
      </div>
    </>
  );
};
export default ApplicantChart;

