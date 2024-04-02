import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Profile from './components/Profile';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation buttons */}
        <nav>
          <ul>
            <li>
              <Link to="/users">Users</Link>
            </li>
            {/* You can add more navigation buttons here */}
          </ul>
        </nav>
        {/* Routes */}
        <switch>
        <Routes>
          <Route path="/users" element={<Home />} />
          <Route path="/users/:id" element={<Profile />} />
        </Routes>
        </switch>
      </div>
    </Router>
  );
}

export default App;