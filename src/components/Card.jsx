import React from 'react';
import './Card.css';

const Card = ({ id, isFlipped, handleClick, iconName }) => {
  return (
    <div
      className={`card ${isFlipped ? 'flipped' : ''}`}
      onClick={() => handleClick(id)}
    >
      {isFlipped ? <div className="icon">{iconName}</div> : null}
    </div>
  );
};

export default Card;
