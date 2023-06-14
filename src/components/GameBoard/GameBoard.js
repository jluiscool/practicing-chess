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

    function pawnMoves(piece, index) {
        console.log(index)
        const arr = [];
        if (piece.player === 'white') {
            if (6 <= index / ranks && index / ranks < 7 && board[index - 8] == false) {
                arr.push(index - 8);
                if (board[index - 16] == false) {
                    arr.push(index - 16);
                }
            }
            if (index / ranks < 6 && board[index - 8] == false) {
                arr.push(index - 8);
            }
        }
        if (piece.player === 'black') {
            if (1 <= index / ranks && index / ranks < 2 && board[index + 8] == false) {
                arr.push(index + 8);
                if (board[index + 16] == false)
                    arr.push(index + 16);
            }
            if (index / ranks > 2 && board[index + 8] == false) {
                arr.push(index + 8);
            }
            if (board[index + 7] == true) {
                arr.push(index + 7);
            }
            if (board[index + 9] == true) {
                arr.push(index + 9);
            }
            else {
                console.log('wtf')
            }
        }
        return arr;
    }

    function bishopMoves(piece, index) {
        const arr = [];
        if (piece.player === 'white') {
            arr.push(index - 7);
            arr.push(index - 9);
            arr.push(index - 14);
            arr.push(index - 18);
            arr.push(index - 21);
            arr.push(index - 27);
        } else if (piece.player === 'black') {
            arr.push(index + 7);
            arr.push(index + 9);
            arr.push(index + 14);
            arr.push(index + 18);
        }
        return arr;
    }

    function findPossibleMoves(array) {
        console.log(`These square indexes: ${array} - are possible moves`);
        setPossibleMoves(array)
    }

    function movePiece(squareToMove) {
        let validSquare;
        if (selectedPiece && possibleMoves.length > 0) {
            for (let i = 0; i < possibleMoves.length; i++) {
                if (squareToMove === possibleMoves[i])
                    validSquare = possibleMoves[i]
            }
            console.log(validSquare)
        } else {
            return;
        }
        if (validSquare && playerTurn === board[selectedPiece].player) {
            console.log(`You can move to this square ${validSquare}`)
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
                return newBoard;
            })
        } else {
            console.log('You cant move to this square')
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

    // useEffect(() => {
    //     if (possibleMoves.length < 0) {
    //         console.log(possibleMoves)
    //     }
    // }, [possibleMoves])

    // useEffect(() => {
    //     console.log(board)
    // }, [board])

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