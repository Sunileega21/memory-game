import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { flipCard, checkMatch } from "../redux/gameSlice";
import Card from "./Card";
import "../styles/Grid.css";

const Grid: React.FC = () => {
  const cards = useSelector((state: RootState) => state.game.cards);
  const flippedIndices = useSelector(
    (state: RootState) => state.game.flippedIndices
  );

  const dispatch = useDispatch();
  const gridSize = Math.ceil(Math.sqrt(cards.length));
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (flippedIndices.length === 2) {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      // Set a new timeout to check for a match
      timeoutRef.current = window.setTimeout(() => {
        dispatch(checkMatch());
        timeoutRef.current = null; // Reset the timeout reference
      }, 1500);
    }

    return () => {
      // Cleanup on unmount or before effect runs again
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [flippedIndices, dispatch]);

  const handleCardClick = (id: number) => {
    if (flippedIndices.length < 2) {
      dispatch(flipCard(id));
    } else if (flippedIndices.length === 2) {
      // If two cards are already flipped, clear the timeout and check the match immediately
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
        dispatch(checkMatch());
      }
      dispatch(flipCard(id));
    }
  };

  return (
    <>
      <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
      >
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onClick={() => handleCardClick(card.id)}
          />
        ))}
      </div>
    </>
  );
};

export default Grid;
