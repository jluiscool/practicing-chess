import './GameBoard.scss'
import { useEffect, useState } from 'react';
import Square from '../Square/Square';

function GameBoard() {

    const [playerTurn, setPlayerTurn] = useState('white');

    const [selectedPiece, setSelectedPiece] = useState(null);

    const [possibleMoves, setPossibleMoves] = useState([]);

    const ranks = 8;
    const files = 8;

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

    const [board, setBoard] = useState(
        [
            BlackRook, BlackKnight, BlackBishop, BlackQueen, BlackKing, BlackBishop, BlackKnight, BlackRook,
            BlackPawn, BlackPawn, BlackPawn, BlackPawn, BlackPawn, BlackPawn, BlackPawn, BlackPawn,
            '', '', '', '', '', '', '', '',
            '', '', '', '', '', '', '', '',
            '', '', '', '', '', '', '', '',
            '', '', '', '', '', '', '', '',
            WhitePawn, WhitePawn, WhitePawn, WhitePawn, WhitePawn, WhitePawn, WhitePawn, WhitePawn,
            WhiteRook, WhiteKnight, WhiteBishop, WhiteQueen, WhiteKing, WhiteBishop, WhiteKnight, WhiteRook
        ]
    )

    function changeColor(index) {
        let color = '';
        if ((index >= 0 && index < 8) || (index >= 16 && index < 24) || (index >= 32 && index < 40) || (index >= 48 && index < 56)) {
            if (index % 2) {
                color = 'beige'
            } else {
                color = 'brown'
            }
        }
        if ((index >= 8 && index < 16) || (index >= 24 && index < 32) || (index >= 40 && index < 48) || (index >= 56 && index < 64)) {
            index = index + 1;
            if (index % 2) {
                color = 'beige'
            } else {
                color = 'brown'
            }
        }
        return color;
    }

    function selectAPiece(index) {
        if (index === selectedPiece) {
            setSelectedPiece(null)
        } else {
            setSelectedPiece(index)
        }
    }

    function findSquareRank(index) {
        let rank = Math.trunc((index / ranks));
        return rank;
    }

    function findSquareFile(index) {
        let file = Math.trunc((index / files));
        return file;
    }


    function pawnMoves(piece, index) {
        const possibleMovesArr = [];
        //capture pieces
        if (piece.player === 'white') {
            if (6 <= index / ranks && index / ranks < 7 && board[index - 8] == false) {
                possibleMovesArr.push(index - 8);
                if (board[index - 16] == false) {
                    possibleMovesArr.push(index - 16);
                }
            }
            if (index / ranks < 6 && board[index - 8] == false) {
                possibleMovesArr.push(index - 8);
            }
            if (board[index - 7].player === 'black') {
                possibleMovesArr.push(index - 7);
            }
            if (board[index - 9].player === 'black') {
                possibleMovesArr.push(index - 9);
            }
        }
        if (piece.player === 'black') {
            if (1 <= index / ranks && index / ranks < 2 && board[index + 8] == false) {
                possibleMovesArr.push(index + 8);
                if (board[index + 16] == false)
                    possibleMovesArr.push(index + 16);
            }
            if (index / ranks > 2 && board[index + 8] == false) {
                possibleMovesArr.push(index + 8);
            }
            if (board[index + 7].player === 'white') {
                possibleMovesArr.push(index + 7);
            }
            if (board[index + 9].player === 'white') {
                possibleMovesArr.push(index + 9);
            }
        }
        return possibleMovesArr;
    }

    function checkOneRankDiff(newSquare, prevSquare) {
        let diff = Math.abs(findSquareRank(newSquare) - findSquareRank(prevSquare))
        if (diff === 1) {
            return true;
        } else {
            return false;
        }
    }

    function bishopMoves(piece, square) {
        const firstDiagonal = [7, 14, 21, 28, 35, 42, 49];
        const secondDiagonal = [9, 18, 27, 36, 45, 54, 63];
        const currentPlayer = piece.player;
        const directions = 4;
        const movesArr = [];

        //index going down by 7
        for (let i = square - 7; i >= 0; i -= 7) {
            console.log(i);
            if (checkOneRankDiff(i, i + 7)) {
                if (board[i]) {
                    if (board[i].player === currentPlayer) {
                        break;
                    }
                    if (board[i].player !== currentPlayer) {
                        movesArr.push(i);
                        break;
                    }
                } else if (!board[i]) {
                    movesArr.push(i);
                }
            } else {
                break;
            }
        }
        //index going down by 9
        for (let i = square - 9; i >= 0; i -= 9) {
            console.log(i);
            if (checkOneRankDiff(i, i + 9)) {
                if (board[i]) {
                    if (board[i].player === currentPlayer) {
                        break;
                    }
                    if (board[i].player !== currentPlayer) {
                        movesArr.push(i);
                        break;
                    }
                } else if (!board[i]) {
                    movesArr.push(i);
                }
            } else {
                break;
            }
        }

        //index going up by 7
        for (let i = square + 7; i < 64; i += 7) {
            console.log(i);
            if (checkOneRankDiff(i, i - 7)) {
                if (board[i]) {
                    if (board[i].player === currentPlayer) {
                        break;
                    }
                    if (board[i].player !== currentPlayer) {
                        movesArr.push(i);
                        break;
                    }
                } else if (!board[i]) {
                    movesArr.push(i);
                }
            } else {
                break;
            }
        }

        //index going up by 9
        for (let i = square + 9; i < 64; i += 9) {
            console.log(i);
            if (checkOneRankDiff(i, i - 9)) {
                if (board[i]) {
                    if (board[i].player === currentPlayer) {
                        break;
                    }
                    if (board[i].player !== currentPlayer) {
                        movesArr.push(i);
                        break;
                    }
                } else if (!board[i]) {
                    movesArr.push(i);
                }
            } else {
                break;
            }
        }

        return movesArr;
    }

    function findPossibleMoves(array) {
        if (array !== undefined) {
            console.log(`These square indexes: ${array} - are possible moves`);
            setPossibleMoves(array)
        } else {
            return;
        }
    }

    function movePiece(squareToMove) {
        let validSquare;
        if (selectedPiece && possibleMoves.length > 0) {
            for (let i = 0; i < possibleMoves.length; i++) {
                if (squareToMove === possibleMoves[i])
                    validSquare = possibleMoves[i]
            }
        } else {
            return;
        }
        if (typeof validSquare === 'number' && playerTurn === board[selectedPiece].player) {
            console.log(validSquare)
            setBoard((prev) => {
                let newBoard = prev.map((square, index) => {
                    if (index === validSquare) {
                        square = board[selectedPiece];
                        return square;
                    } else if (index === selectedPiece) {
                        square = "";
                        return square;
                    } else {
                        return square;
                    }
                })
                if (playerTurn === 'white') {
                    setPlayerTurn('black')
                } else {
                    setPlayerTurn('white')
                }
                setSelectedPiece(null)
                return newBoard;
            })
        } else {
            return;
        }
    }

    //handle clicking on a piece

    useEffect(() => {
        if (selectedPiece) {
            if (board[selectedPiece].piece === 'Pawn') {
                findPossibleMoves(pawnMoves(board[selectedPiece], selectedPiece))
            }
            if (board[selectedPiece].piece === 'Bishop') {
                findPossibleMoves(bishopMoves(board[selectedPiece], selectedPiece))
            }
        } else {
            setPossibleMoves([])
        }
    }, [selectedPiece])

    useEffect(() => {
        if (possibleMoves.length < 0) {
            console.log(possibleMoves)
        }
    }, [possibleMoves])

    return (
        <div className='gameboard'>
            {
                board.map((square, index) => {
                    return (
                        <Square
                            key={index}
                            id={index}
                            piece={square ? square : ''}
                            backgroundColor={changeColor(index)}
                            selectAPiece={selectAPiece}
                            selectedPiece={selectedPiece === index ? true : false}
                            possibleMoves={possibleMoves}
                            movePiece={movePiece}
                        />
                    )
                })
            }
            <div>It is {playerTurn}'s turn</div>
        </div>
    )
}

export default GameBoard;