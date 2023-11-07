import React from 'react';
import './App.css';
import {BrowserRouter as Router} from "react-router-dom";
import ApplicationRouter from "./compoents/ApplicationRouter";


function App() {
  return (
    <Router>
        <ApplicationRouter />
    </Router>
  );
}

export default App;
