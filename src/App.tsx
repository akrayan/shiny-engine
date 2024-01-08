import React from 'react';
import logo from './logo.svg';
import './App.css';
import Game from './Game/Game';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Game className="Game-screen"/>
      </header>
    </div>
  );
}

export default App;
