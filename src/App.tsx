import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GamePage from './pages/GamePage';
import IndexPage from './pages/IndexPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/:number" element={<GamePage />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default App;
