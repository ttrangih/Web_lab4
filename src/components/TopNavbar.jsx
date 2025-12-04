import React, { useState } from "react";
import "./TopNavbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTv, faSearch } from "@fortawesome/free-solid-svg-icons";

function TopNavbar({ className = "", onSearch }) {
  const [showSearch, setShowSearch] = useState(false);
  const [value, setValue] = useState("");

  const handleSearchIconClick = () => {
    setShowSearch((prev) => !prev);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className={`top-navbar ${className}`}>
      <div className="top-navbar-left">
        <FontAwesomeIcon icon={faTv} />
      </div>

      <div className="top-navbar-center">
        <span className="top-navbar-text">Following</span>
        <span className="top-navbar-text active">For You</span>
      </div>

      <div className="top-navbar-right">
        <FontAwesomeIcon
          icon={faSearch}
          className="top-navbar-search-icon"
          onClick={handleSearchIconClick}
        />
      </div>

      {showSearch && (
        <div className="top-navbar-search-box">
          <input
            type="text"
            placeholder="Search hashtag (e.g. #programming)"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      )}
    </div>
  );
}

export default TopNavbar;
