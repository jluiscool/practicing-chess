import { useState, useEffect } from 'react';
import './Square.scss'
import Bishop from '../Pieces/Bishop';
import Rook from '../Pieces/Rook';
import Pawn from '../Pieces/Pawn';
import Knight from '../Pieces/Knight';
import Queen from '../Pieces/Queen';
import King from '../Pieces/King';

function Square({ piece, backgroundColor, id, resetSelect }) {

    const [selected, setSelected] = useState(false)

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

    function handleOnClick(id) {
        console.log(`You clicked on square: ${id}`)
        setSelected(prev => !prev)
    }

    useEffect(() => {
        if (selected) {
            resetSelect(id);
        }
    }, [id, selected, resetSelect]);

    return (
        <div className={`square ${backgroundColor}`} >
            <div className={selected ? 'square__container highlighted' : 'square__container'} onClick={() => handleOnClick(id)}>
                {piece ? renderComponent(piece.piece, piece.player) : ""}
            </div>
        </div>
    )
}

export default Square;