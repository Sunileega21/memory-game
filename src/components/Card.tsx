import React from "react";
import { Card as CardType } from "../redux/gameSlice";
import "../styles/Card.css";

interface CardProps {
  card: CardType;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ card, onClick }) => {
  return (
    <div
      key={card.id}
      className={`card ${card.isFlipped || card.isMatched ? "flipped" : ""}`}
      onClick={onClick}
    >
      <div className="card-front">?</div>
      <div className="card-back">
        <img alt="card" src={card.content} />
      </div>
    </div>
  );
};

export default Card;
