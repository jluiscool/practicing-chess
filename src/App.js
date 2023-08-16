import { useState } from 'react';
import './App.scss';
import GameBoard from './components/GameBoard/GameBoard';
import GameStartModal from './components/GameStartModal/GameStartModal';
import GameEndModal from './components/GameEndModal/GameEndModal';
import ScoreBoard from './components/ScoreBoard/GameBoard/ScoreBoard';

function App() {
  const [newGame, setNewGame] = useState(true)
  const [gameEnd, setGameEnd] = useState(false)

  function handleNewGame() {
    setNewGame(false)
  }

  return (
    <div className="app">
      <header className="header">
        8-bit Chess
      </header>
      {newGame ? <GameStartModal handleNewGame={handleNewGame} /> : false}
      {gameEnd ? <GameEndModal handleNewGame={handleNewGame} /> : false}
      <GameBoard />
      <ScoreBoard />
    </div>
  );
}

export default App;
