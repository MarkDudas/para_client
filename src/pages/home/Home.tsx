import Navbar from "../../components/navbar/Navbar";
import JobPost from "../jobPost/JobPost";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <Navbar />
  
      <JobPost />
    </div>
  );
};

export default Home;
