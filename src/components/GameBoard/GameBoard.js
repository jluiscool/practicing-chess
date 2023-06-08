import './GameBoard.scss'
import { useState } from 'react';
import Square from '../Square/Square';

function GameBoard() {

    const [player, setPlayer] = useState('White')

    const [isPieceSelected, setIsPieceSelected] = useState(false)

    const BlackRook = {
        player: 'black',
        piece: 'Rook'
    };

    const BlackBishop = {
        player: 'black',
        piece: 'Bishop'
    };

    const BlackKnight = {
        player: 'black',
        piece: 'Knight'
    };

    const BlackQueen = {
        player: 'black',
        piece: 'Queen'
    };

    const BlackKing = {
        player: 'black',
        piece: 'King'
    };

    const BlackPawn = {
        player: 'black',
        piece: 'Pawn'
    };

    const WhiteRook = {
        player: 'white',
        piece: 'Rook'
    };

    const WhiteBishop = {
        player: 'white',
        piece: 'Bishop'
    };

    const WhiteKnight = {
        player: 'white',
        piece: 'Knight'
    };

    const WhiteQueen = {
        player: 'white',
        piece: 'Queen'
    };

    const WhiteKing = {
        player: 'white',
        piece: 'King'
    };

    const WhitePawn = {
        player: 'white',
        piece: 'Pawn'
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

    // function handleSquareClick(id) {
    //     console.log(`you clicked on square: ${id}`)
    // }

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
                            // onClick={handleSquareClick}
                            // isPieceSelected={isPieceSelected}
                        />
                    )
                })
            }
        </div>
    )
}

export default GameBoard;