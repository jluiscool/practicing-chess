import { useState } from 'react';
import './App.scss';
import GameBoard from './components/GameBoard/GameBoard';
import GameStartModal from './components/GameStartModal/GameStartModal';
import GameEndModal from './components/GameEndModal/GameEndModal';
import ScoreBoard from './components/ScoreBoard/GameBoard/ScoreBoard';

function App() {
  const [newGame, setNewGame] = useState(true);
  const [gameEnd, setGameEnd] = useState(false);
  const [resetBoard, setResetBoard] = useState(false);

  const BlackRook = {
    player: 'black',
    piece: 'Rook',
    isSelected: false,
  };
  const BlackBishop = {
    player: 'black',
    piece: 'Bishop',
    isSelected: false,
  };
  const BlackKnight = {
    player: 'black',
    piece: 'Knight',
    isSelected: false,
  };
  const BlackQueen = {
    player: 'black',
    piece: 'Queen',
    isSelected: false,
  };
  const BlackKing = {
    player: 'black',
    piece: 'King',
    isSelected: false,
  };
  const BlackPawn = {
    player: 'black',
    piece: 'Pawn',
    isSelected: false,
  };
  const WhiteRook = {
    player: 'white',
    piece: 'Rook',
    isSelected: false,
  };
  const WhiteBishop = {
    player: 'white',
    piece: 'Bishop',
    isSelected: false,
  };
  const WhiteKnight = {
    player: 'white',
    piece: 'Knight',
    isSelected: false,
  };
  const WhiteQueen = {
    player: 'white',
    piece: 'Queen',
    isSelected: false,
  };
  const WhiteKing = {
    player: 'white',
    piece: 'King',
    isSelected: false,
  };
  const WhitePawn = {
    player: 'white',
    piece: 'Pawn',
    isSelected: false,
  };

  const initiateBoard = [
    BlackRook, BlackKnight, BlackBishop, BlackQueen, BlackKing, BlackBishop, BlackKnight, BlackRook,
    BlackPawn, BlackPawn, BlackPawn, BlackPawn, BlackPawn, BlackPawn, BlackPawn, BlackPawn,
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    WhitePawn, WhitePawn, WhitePawn, WhitePawn, WhitePawn, WhitePawn, WhitePawn, WhitePawn,
    WhiteRook, WhiteKnight, WhiteBishop, WhiteQueen, WhiteKing, WhiteBishop, WhiteKnight, WhiteRook
  ]

  function handleNewGame() {
    setNewGame(false)
  }

  function handleGameEnd() {
    setGameEnd((prev) => !prev)
  }

  function handleResetBoard() {
    setResetBoard((prev) => !prev)
  }

  return (
    <div className="app">
      <header className="header">
        8-bit Chess
      </header>
      {newGame ? <GameStartModal handleNewGame={handleNewGame} /> : false}
      {gameEnd ? <GameEndModal handleResetBoard={handleResetBoard} handleGameEnd={handleGameEnd} /> : false}
      <GameBoard handleGameEnd={handleGameEnd} resetBoard={resetBoard} initiateBoard={initiateBoard} handleResetBoard={handleResetBoard}/>
      <ScoreBoard />
    </div>
  );
}

export default App;
