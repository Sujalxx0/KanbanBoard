import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import KanbanBoard from "./KanbanBoard.js";
import "./styles.css";
import display from "./Assests/icons_FEtask/Display.svg";
import Down from "./Assests/icons_FEtask/down.svg"; 

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState("status"); // Default grouping
  const [sortBy, setSortBy] = useState("priority"); // Default sorting
  const [showDropdown, setShowDropdown] = useState(false); // For main dropdown visibility
  const [showGroupByOptions, setShowGroupByOptions] = useState(false); // For Group By dropdown
  const [showSortByOptions, setShowSortByOptions] = useState(false); // For Sort By dropdown

  const dropdownRef = useRef(null); // Ref for the dropdown container
  const groupByRef = useRef(null); // Ref for the Group By dropdown
  const sortByRef = useRef(null); // Ref for the Sort By dropdown

  // Fetch tickets and users data from API
  useEffect(() => {
    axios
      .get("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((response) => {
        setTickets(response.data.tickets);
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        alert("Failed to fetch data. Please check the API endpoint.");
      });
  }, []);

  // Close the dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside the dropdowns
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        groupByRef.current &&
        !groupByRef.current.contains(event.target) &&
        sortByRef.current &&
        !sortByRef.current.contains(event.target)
      ) {
        // Close all dropdowns if click is outside
        setShowDropdown(false);
        setShowGroupByOptions(false);
        setShowSortByOptions(false);
      }
    };

    // Add event listener on mount
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="app">
  <header className="header">
    <div className="header-content">
      <div className="dropdown-container" ref={dropdownRef}>
        <button
          className="dropdown-toggle"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <img src={display} alt="Display Icon" style={{ width: 16, height: 16, marginRight: 8 }} />
          Display Options
          <img src={Down} alt="Down Icon" style={{ width: 16, height: 16, marginLeft: 8 }} />
        </button>
        {showDropdown && (
          <div className="dropdown-menu">
            {/* Group By Dropdown */}
            <div className="dropdown-section">
            Grouping
              <button
                className="dropdown-toggle"
                ref={groupByRef}
                onClick={() => {
                  setShowGroupByOptions(!showGroupByOptions);
                  setShowSortByOptions(false);
                }}
              >
                 {groupBy}
                <img src={Down} alt="Down Icon" style={{ width: 16, height: 16, marginLeft: 8 }} />
              </button>
              {showGroupByOptions && (
                <ul className="nested-dropdown">
                  {["status", "user", "priority"].map((option) => (
                    <li
                      key={option}
                      className={groupBy === option ? "selected" : ""}
                      onClick={() => {
                        setGroupBy(option);
                        setShowGroupByOptions(false); // Close Group By dropdown
                      }}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Sort By Dropdown */}
            <div className="dropdown-section">
            Ordering 
              <button
                className="dropdown-toggle"
                ref={sortByRef}
                onClick={() => setShowSortByOptions(!showSortByOptions)}
              >
                {sortBy}
                <img src={Down} alt="Down Icon" style={{ width: 16, height: 16, marginLeft: 8 }} />
              </button>
              {showSortByOptions && (
                <ul className="nested-dropdown">
                  {["priority", "title"].map((option) => (
                    <li
                      key={option}
                      className={sortBy === option ? "selected" : ""}
                      onClick={() => {
                        setSortBy(option);
                        setShowSortByOptions(false); // Close Sort By dropdown
                      }}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  </header>
  <KanbanBoard tickets={tickets} users={users} groupBy={groupBy} sortBy={sortBy} />
</div>
  );
};

export default App;
