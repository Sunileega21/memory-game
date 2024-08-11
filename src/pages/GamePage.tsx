import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/store";
import { initializeGame } from "../redux/gameSlice";
import Grid from "../components/Grid";
import "../styles/GamePage.css";
import { RootState } from "../redux/store";

const GamePage: React.FC = () => {

  const { number } = useParams<{ number: string }>();
  const dispatch = useAppDispatch();
  const isGameCompleted = useSelector(
    (state: RootState) => state.game.isGameCompleted
  );
  const moves = useSelector((state: RootState) => state.game.moves);
  const misses = useSelector((state: RootState) => state.game.misses);

  useEffect(() => {
    const gridSize = parseInt(number || "4", 10);
    dispatch(initializeGame(gridSize));
  }, [number, dispatch]);

  const handlePlayAgain = () => {
    const gridSize = parseInt(number || "4", 10);
    dispatch(initializeGame(gridSize));
  }

  return (
    <div className="game-page">
        <h1>Memory Game</h1>
      <div className="stats">
        <span>Moves: {moves}</span>
        <span>Misses: {misses}</span>
      </div>
      {isGameCompleted ? (
        <>
        <div className="congratulations-message">
          🎉 Congratulations! You've completed the game! 🎉
        </div>
        <button onClick={handlePlayAgain} className="play-again-button">
        Play Again
      </button></>
      ) : 
      <Grid />}
    </div>
  );
};

export default GamePage;
