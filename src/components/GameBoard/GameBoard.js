import './GameBoard.scss'
import { useEffect, useState } from 'react';
import Square from '../Square/Square';

function GameBoard() {

    const [player, setPlayer] = useState('white')

    const [selectedPiece, setSelectedPiece] = useState(null)

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
        const arr = [];
        if (piece.player === 'white') {
            arr.push(index + 8);
        } else if (piece.player === 'black') {
            arr.push(index - 8);
        }
        return arr;
    }

    function possibleMoves(array) {
        board.map((square) => {
            for (let i=0; i < array.length; i++) {
                console.log('This square is a possible move');
            }
        })
    }

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
                            possibleMoves={() => possibleMoves(pawnMoves(square, index))}
                        />
                    )
                })
            }
        </div>
    )
}

export default GameBoard;