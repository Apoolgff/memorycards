
import React, { useRef } from 'react';
import './App.css';
import Board from './components/Board';

function App() {
  const boardRef = useRef();

  const restartGame = () => {
    
    boardRef.current.initializeGame();
  };

  return (
    <div className="app">
      <h1>Memory Cards Game</h1>
      <button className="btn" onClick={restartGame}>Restart Game</button>
      <Board ref={boardRef} />
    </div>
  );
}

export default App;

