import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Journal from './pages/Journal';
import Gallery from './pages/Gallery';
import WaysToHelp from './pages/WaysToHelp';
import Planner from './pages/Planner';
import Tributes from './pages/Tributes';
import WellWishes from './pages/WellWishes';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route 
            path="/" 
            element={<Home />} 
          />
          <Route
            path="/journal"
            element={<Journal />}
          />
          <Route 
            path="/gallery"
            element={<Gallery />}
          />
          <Route 
            path="/ways-to-help"
            element={<WaysToHelp />}
          />
          <Route
            path="/planner"
            element={<Planner />}
          />
          <Route 
            path="/tributes"
            element={<Tributes />}
          />
          <Route
            path="/well-wishes"
            element={<WellWishes />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/signup"
            element={<Signup />}
          />
          <Route
            path="/settings"
            element={<Settings />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
