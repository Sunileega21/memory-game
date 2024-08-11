import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/IndexPage.css'
const IndexPage: React.FC = () => {
  const [gridSize, setGridSize] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (gridSize && !isNaN(Number(gridSize))) {
      navigate(`/${gridSize}`);
    }
  };

  return (
    <div className="index-page">
      <h1>Welcome to Memory Game</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Grid Size:
          <input
            type="text"
            value={gridSize}
            onChange={(e) => setGridSize(e.target.value)}
            placeholder="Enter a number"
            required
          />
        </label>
        <button type="submit">Start Game</button>
      </form>
    </div>
  );
};

export default IndexPage;
