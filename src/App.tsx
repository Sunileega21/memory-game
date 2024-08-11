import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GamePage from './pages/GamePage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/:number" Component={GamePage} />
      </Routes>
    </Router>
  );
};

export default App;
