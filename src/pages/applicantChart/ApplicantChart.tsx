import React, { useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Navbar from "../../components/navbar/Navbar";
import { IApplicant, IJob } from "../../types/Types";
import "./ApplicantChart.css";
import { Chart, registerables, TooltipItem } from "chart.js";
import LineChartTopJob from "../../components/lineChart/LineChartTopJob";
import LineChartTopJobToday from "../../components/lineChart/LineChartTopJobToday";

Chart.register(...registerables);

const ApplicantChart: React.FC = () => {
  const { data: applicants } = useQuery<IApplicant[] | undefined>({
    queryKey: ["ApplicantList"],
    queryFn: async () =>
      await axios
        .get<IApplicant[]>(`${import.meta.env.VITE_APP_API_URL}/api/applicant`)
        .then((res) => res.data),
  });

  const { data: jobs } = useQuery<IJob[] | undefined>({
    queryKey: ["JobList"],
    queryFn: async () =>
      await axios
        .get<IJob[]>(`${import.meta.env.VITE_APP_API_URL}/api/job/list`)
        .then((res) => res.data),
  });

  useEffect(() => {
    if (applicants) {
      const jobCounts: Record<string, number> = {};
      applicants.forEach((applicant: IApplicant) => {
        const jobTitle = applicant.actualJobPosted;
        jobCounts[jobTitle] = (jobCounts[jobTitle] || 0) + 1;
      });

      const jobTitles = Object.keys(jobCounts);
      const jobCountsData = Object.values(jobCounts);

      const ctx = document.getElementById("jobChart") as HTMLCanvasElement;
      const existingChart = Chart.getChart(ctx);

      if (existingChart) {
        existingChart.destroy();
      }

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
              max: Math.ceil(Math.max(...jobCountsData)),
            },
          },
        },
      });
    }
    if (applicants) {
      const monthCounts: Record<string, number> = {};
      applicants.forEach((applicant: IApplicant) => {
        const createdAt = new Date(applicant.createdAt);
        const monthLabel = `${createdAt.toLocaleString("default", {
          month: "long",
        })} ${createdAt.getFullYear()}`;
        monthCounts[monthLabel] = (monthCounts[monthLabel] || 0) + 1;
      });

      const monthLabels = Object.keys(monthCounts);
      const monthCountsData = Object.values(monthCounts);

      const ctx = document.getElementById(
        "applicantMonthChart"
      ) as HTMLCanvasElement;
      const existingChart = Chart.getChart(ctx);

      if (existingChart) {
        existingChart.destroy();
      }

      new Chart(ctx, {
        type: "bar",
        data: {
          labels: monthLabels,
          datasets: [
            {
              label: "Number of Applicants",
              data: monthCountsData,
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
              max: Math.ceil(Math.max(...monthCountsData)),
            },
          },
        },
      });
    }

    if (jobs) {
      const totalJobCtx = document.getElementById(
        "totalJobChart"
      ) as HTMLCanvasElement;
      const existingTotalJobChart = Chart.getChart(totalJobCtx);

      if (existingTotalJobChart) {
        existingTotalJobChart.destroy();
      }

      const totalJobCounts: Record<string, number> = {};
      const companyMap: Record<string, string> = {};

      jobs.forEach((job: IJob) => {
        const jobTitle = job.jobTitle;
        totalJobCounts[jobTitle] = (totalJobCounts[jobTitle] || 0) + 1;
        companyMap[jobTitle] = job.company; // Store company information
      });

      const totalJobTitles = Object.keys(totalJobCounts);
      const totalJobCountsData = Object.values(totalJobCounts);

      new Chart(totalJobCtx, {
        type: "doughnut",
        data: {
          labels: totalJobTitles,
          datasets: [
            {
              label: "Number of Jobs",
              data: totalJobCountsData,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              max: Math.ceil(Math.max(...totalJobCountsData)),
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                title: (tooltipItems: TooltipItem<"doughnut">[]) => {
                  const dataIndex = tooltipItems[0]?.dataIndex;
                  return dataIndex !== undefined
                    ? totalJobTitles[dataIndex]
                    : "";
                },
                label: (context: TooltipItem<"doughnut">) => {
                  const dataIndex = context.dataIndex;
                  const jobTitle = totalJobTitles[dataIndex];
                  const jobCount = totalJobCounts[jobTitle];

                  return `quantity: ${jobCount} `;
                },
              },
            },
          },
        },
      });
    }
  }, [applicants, jobs]);

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="chart-container">
          <div className="chart-wrapper">
            <canvas id="jobChart" />
          </div>
          <p className="chart-label">Total Applicants:</p>
        </div>
        <div className="chart-container">
          <div className="chart-wrapper">
            <canvas id="applicantMonthChart" />
          </div>
          <p className="chart-label">Applicants per Month:</p>
        </div>
        <div className="chart-container">
          <div className="chart-wrapper">
            <canvas id="totalJobChart" />
          </div>
          <p className="chart-label">Jobs:</p>
        </div>
        <LineChartTopJob />

        <LineChartTopJobToday />
      </div>
    </>
  );
};

export default ApplicantChart;
