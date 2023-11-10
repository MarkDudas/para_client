import "./Header.css";
import { Search } from "@mui/icons-material";
import { useState } from "react";

interface Prop {
  onSearch: (search: string) => void;
}

const Header = ({ onSearch }: Prop) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchInputChange = (e: any) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchQuery); // Pass the search query to the parent component
  };

  return (
    <div className="header">
      <div className="header-container">
        <h1 className="header-title">FIND JOB VACANCIES</h1>
        <div className="header-search-container">
          <div className="header-search-input-container">
            <Search />
            <input
              className="header-search"
              type="text"
              placeholder="Search Job Title "
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
          </div>
          <button className="header-search-btn" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
