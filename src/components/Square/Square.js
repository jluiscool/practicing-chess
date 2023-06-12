import { useState, useEffect } from 'react';
import './Square.scss'
import Bishop from '../Pieces/Bishop';
import Rook from '../Pieces/Rook';
import Pawn from '../Pieces/Pawn';
import Knight from '../Pieces/Knight';
import Queen from '../Pieces/Queen';
import King from '../Pieces/King';

function Square({ piece, backgroundColor, id, selectAPiece, selectedPiece, }) {

    const selected = selectedPiece;

    function renderComponent(component, player) {
        if (component === 'King') {
            return <King playerColor={player} /* isSelected={isSelected} */ />
        }
        if (component === 'Queen') {
            return <Queen playerColor={player} /* isSelected={isSelected} */ />
        }
        if (component === 'Rook') {
            return <Rook playerColor={player} /* isSelected={isSelected} */ />
        }
        if (component === 'Bishop') {
            return <Bishop playerColor={player} /* isSelected={isSelected} */ />
        }
        if (component === 'Knight') {
            return <Knight playerColor={player} /* isSelected={isSelected} */ />
        }
        if (component === 'Pawn') {
            return <Pawn playerColor={player} /* isSelected={isSelected} */ />
        }
    }

    function handleOnClick(e) {
        if (e.target.hasChildNodes()) {
            selectAPiece(id)
        } else {
            return;
        }
    }

    return (
        <div className={`square ${backgroundColor}`} >
            <div className={selected ? 'square__container highlighted' : 'square__container'} onClick={(e) => handleOnClick(e)}>
                {piece ? renderComponent(piece.piece, piece.player) : ""}
            </div>
        </div>
    )
}

export default Square;