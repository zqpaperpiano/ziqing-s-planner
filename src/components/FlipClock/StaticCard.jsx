import React from "react";

// function component
const StaticCard = ({ position, digit }) => {
    return(
      <div className={position}>
        <span>{digit}</span>
      </div>
    );
  };

export default StaticCard;