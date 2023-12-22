// App.js
import React, { useRef } from 'react';
import './App.css';
import Board from './components/Board';

function App() {
  const boardRef = useRef();

  const restartGame = () => {
    // Llama a la función de reinicio en el componente Board a través de la referencia
    boardRef.current.initializeGame();
  };

  return (
    <div className="app">
      <h1>Memory Cards Game</h1>
      <button className="btn" onClick={restartGame}>Restart Game</button>
      {/* Pasa la referencia al componente Board */}
      <Board ref={boardRef} />
    </div>
  );
}

export default App;

