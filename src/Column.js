import React from "react";
import TicketCard from "./TicketCard";



const Column = ({ title, tickets, users, sortBy,groupBy }) => {
  // Sort tickets based on sortBy
  const sortedTickets = tickets.sort((a, b) => {
    if (sortBy === "priority") return a.priority - b.priority;
    if (sortBy === "title") return a.title.localeCompare(b.title);
  });

  return (
    <div className="column">
      <h2>{title}</h2>
      {sortedTickets.map((ticket) => (
        <TicketCard key={ticket.id} ticket={ticket} users={users} groupBy={groupBy}/>
      ))}
    </div>
  );
};

export default Column;
