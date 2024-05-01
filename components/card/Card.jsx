import React from "react";
import './Card.scss'


function Card({ title, totalNumber, icon }) {
  return (
    <div className="single__card">
      <div className="card__content">
        <h4>{title}</h4>
        <span>{totalNumber}+</span>
      </div>

      <span className="card__icon">
        <i className={icon}></i>
      </span>
    </div>
  );
}

export default Card;
