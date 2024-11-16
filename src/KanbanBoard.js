import React from "react";
import Column from "./Column";
import "./KanbanBoard.css";

// Import the icons from the assets folder
import urgentIcon from "./Assests/icons_FEtask/SVG - Urgent Priority colour.svg";
import highIcon from "./Assests/icons_FEtask/Img - High Priority.svg";
import mediumIcon from "./Assests/icons_FEtask/Img - Medium Priority.svg";
import lowIcon from "./Assests/icons_FEtask/Img - Low Priority.svg";
import noPriorityIcon from "./Assests/icons_FEtask/No-priority.svg";
import todoIcon from "./Assests/icons_FEtask/To-do.svg";
import inProgressIcon from "./Assests/icons_FEtask/Inprog.svg";
import doneIcon from "./Assests/icons_FEtask/Done.svg";
import userIcon from "./Assests/icons_FEtask/a.svg";
import backlogIcon from "./Assests/icons_FEtask/Backlog.svg";  
import cancelledIcon from "./Assests/icons_FEtask/Cancelled.svg";
import threeDot from "./Assests/icons_FEtask/3 dot menu.svg";
import addIcon from "./Assests/icons_FEtask/add.svg"; // Add icon

const KanbanBoard = ({ tickets, users, groupBy, sortBy }) => {
  // Priority level mapping
  const priorityLevels = {
    4: { label: "Urgent", icon: urgentIcon },
    3: { label: "High", icon: highIcon },
    2: { label: "Medium", icon: mediumIcon },
    1: { label: "Low", icon: lowIcon },
    0: { label: "No priority", icon: noPriorityIcon },
  };

  // Status mapping for icons (with normalized keys)
  const statusIcons = {
    backlog: backlogIcon, // Add backlog status icon
    todo: todoIcon,
    inprogress: inProgressIcon,  // Normalized to lowercase and no spaces
    done: doneIcon,
    cancelled: cancelledIcon, // Add cancelled status icon
  };

  // Group tickets dynamically based on groupBy
  const groupedTickets = tickets.reduce((acc, ticket) => {
    const key =
      groupBy === "user"
        ? ticket.userId
        : groupBy === "priority"
        ? ticket.priority
        : ticket.status.toLowerCase().replace(/\s+/g, ""); // Normalize status (remove spaces and lowercase)

    if (!acc[key]) acc[key] = [];
    acc[key].push(ticket);
    return acc;
  }, {});

  // Convert groupedTickets into an array of entries and sort if grouped by priority
  const sortedEntries = Object.entries(groupedTickets).sort(([keyA], [keyB]) => {
    if (groupBy === "priority") {
      // Make sure "No priority" (0) is always first
      if (keyA === "0") return -1;
      if (keyB === "0") return 1;
      return keyB - keyA; // Sort priorities from 4 (Urgent) to 1 (Low)
    }
    return 0; // No sorting for other groupBy options
  });

  // Get the list of all possible group values for this groupBy type
  const allGroups = groupBy === "user"
    ? users.map(user => user.id)  // Get all user IDs
    : groupBy === "priority"
    ? Object.keys(priorityLevels)  // Get all priority levels as string keys
    : Object.keys(statusIcons);  // Get all possible status types

  // Ensure that all groups are represented, even if they have zero tickets
  const groupsWithTickets = allGroups.map(groupKey => {
    return {
      key: groupKey,
      tickets: groupedTickets[groupKey] || []  // Default to empty array if no tickets
    };
  });

  return (
    <div className="kanban-board">
      {groupsWithTickets.map(({ key, tickets }) => {
        let columnTitle;
        let icon;

        // Set the column title and icon based on the groupBy field
        if (groupBy === "user") {
          const user = users.find((user) => user.id === key);
          columnTitle = user ? user.name : "Unassigned";
          icon = userIcon;
        } else if (groupBy === "priority") {
          columnTitle = priorityLevels[key]?.label;
          icon = priorityLevels[key]?.icon;
        } else if (groupBy === "status") {
          columnTitle = key.charAt(0).toUpperCase() + key.slice(1);
          icon = statusIcons[key] || backlogIcon;
        }

        // Count tickets in the current group
        const ticketCount = tickets.length;

        return (
          <Column
            key={key}
            title={
              <>
                        <div class="column-header">
                <img src={icon} alt={columnTitle} style={{ width: 20, marginRight: 8 }} />
                <span>{columnTitle}</span>
                <span class="ticket-count">{ticketCount}</span>
                <div class="icon-wrapper">
                    <img src={addIcon} alt="Add ticket" />
                    <img src={threeDot} alt="More options" />
                    
                </div>
            </div>

              </>
            }
            tickets={tickets}
            users={users}
            sortBy={sortBy}
            groupBy={groupBy}
          />
        );
      })}
    </div>
  );
};

export default KanbanBoard;
