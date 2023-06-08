import './GameBoard.scss'

import BlkKing from '../../assets/Blk_King.svg';
import BlkBishop from '../../assets/Blk_Bishop.svg';
import BlkQueen from '../../assets/Blk_Queen.svg';
import BlkRook from '../../assets/Blk_Rook.svg';
import BlkKnight from '../../assets/Blk_Knight.svg';
import BlkPawn from '../../assets/Blk_Pawn.svg';

import WhtKing from '../../assets/Wht_King.svg';
import WhtBishop from '../../assets/Wht_Bishop.svg';
import WhtQueen from '../../assets/Wht_Queen.svg';
import WhtRook from '../../assets/Wht_Rook.svg';
import WhtKnight from '../../assets/Wht_Knight.svg';
import WhtPawn from '../../assets/Wht_Pawn.svg';
import { useState } from 'react';
import Square from '../Square/Square';

function GameBoard() {

    const [player, setPlayer] = useState('Player 1')

    const [selectedPiece, setSelectedPiece] = useState(false)

    const [board, setBoard] = useState(
        [
            BlkRook, BlkKnight, BlkBishop, BlkQueen, BlkKing, BlkBishop, BlkKnight, BlkRook,
            BlkPawn, BlkPawn, BlkPawn, BlkPawn, BlkPawn, BlkPawn, BlkPawn, BlkPawn,
            '', '', '', '', '', '', '', '',
            '', '', '', '', '', '', '', '',
            '', '', '', '', '', '', '', '',
            '', '', '', '', '', '', '', '',
            WhtPawn, WhtPawn, WhtPawn, WhtPawn, WhtPawn, WhtPawn, WhtPawn, WhtPawn,
            WhtRook, WhtKnight, WhtBishop, WhtQueen, WhtKing, WhtBishop, WhtKnight, WhtRook
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

    function handleOnClick(id) {
        setSelectedPiece(prev => !prev)
        console.log(`you clicked on square: ${id}`)
    }

    return (
        <div className='gameboard'>
            {
                board.map((square, index) => {
                    return (
                        <Square key={index} id={index} piece={square ? square : ''} backgroundColor={changeColor(index)} handleOnClick={handleOnClick}/>
                    )
                })
            }
        </div>
    )
}

export default GameBoard;