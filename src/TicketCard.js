import React from "react";
import defaultProfile from "./Assests/images/a.svg";
import "./TicketCard.css";

const TicketCard = ({ ticket, users, groupBy }) => {
  const assignedUser = users.find((user) => user.id === ticket.userId);
  const userName = assignedUser ? assignedUser.name : "Unassigned";

  return (
    <div className="ticket-card">
      {/* Ticket ID - Positioned at top right */}
      <div className="ticket-id">{ticket.id}</div>

      {/* User Profile Photo */}
      <div className="profile-photo">
        <img
          src={defaultProfile} // Provide correct default profile image path
          alt="Profile"
        />
      </div>

      {/* Ticket Title */}
      <h3 className="ticket-title">{ticket.title}</h3>

      {/* Priority Icon - Only show if not grouped by status */}
      <div
        className={`priority-icon ${
          groupBy === "status" ? "hidden" : ""
        }`}
      >
        {groupBy === "user" && (
          <img
            src={require(`./Assests/icons_FEtask/priority/${ticket.priority}.svg`)}
            alt={`Priority ${ticket.priority}`}
          />
        )}
      </div>

      {/* Feature Request Tag */}
      <div className="feature-tag">
        <span className="dot gray"></span>
        <span className="tags-container">
          {ticket.tag.map((tag, index) => (
            <span key={index} className="tag gray">
              {tag}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
};

export default TicketCard;
