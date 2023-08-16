import { useState } from 'react';
import './App.scss';
import GameBoard from './components/GameBoard/GameBoard';
import GameStartModal from './components/GameStartModal/GameStartModal';
import ScoreBoard from './components/ScoreBoard/GameBoard/ScoreBoard';

function App() {
  const [newGame, setNewGame] = useState(true)

  function handleNewGame() {
    setNewGame(false)
  }

  return (
    <div className="app">
      <header className="header">
        8-bit Chess
      </header>
      {/* {newGame ? <GameStartModal handleNewGame={handleNewGame} /> : false} */}
      <GameBoard />
      <ScoreBoard />
    </div>
  );
}

export default App;
