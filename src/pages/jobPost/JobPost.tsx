import JobCard from "../../components/jobCard/JobCard";
import { IJob } from "../../types/Types";
import { useQuery } from "@tanstack/react-query";
import "./JobPost.css";
import axios from "axios";
import Header from "../../components/header/Header";
import { useState } from "react";

const JobPost = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { data } = useQuery<IJob[]>({
    queryKey: ["JobPost"],
    queryFn: async () =>
      await axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/job/list/unarchive`)
        .then((res) => res.data),
  });

  // Filter the job list based on the search query
  const filteredJobs = data?.filter((item) => {
    return item.jobTitle.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <>
      <Header onSearch={setSearchQuery} />
      <div className="jobpost">
        {filteredJobs?.map((item, key) => (
          <JobCard item={item} key={key} />
        ))}
      </div>
    </>
  );
};

export default JobPost;
