import './App.scss';
import GameBoard from './components/GameBoard/GameBoard';
import ScoreBoard from './components/ScoreBoard/GameBoard/ScoreBoard';

function App() {
  return (
    <div className="app">
      <header className="header">
        8-bit Chess
      </header>
      <GameBoard />
      <ScoreBoard />
    </div>
  );
}

export default App;
