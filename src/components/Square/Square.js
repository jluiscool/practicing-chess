import { useCallback, useEffect, useRef } from 'react';
import './Square.scss'
import Bishop from '../Pieces/Bishop';
import Rook from '../Pieces/Rook';
import Pawn from '../Pieces/Pawn';
import Knight from '../Pieces/Knight';
import Queen from '../Pieces/Queen';
import King from '../Pieces/King';

function Square({ piece, backgroundColor, id, selectAPiece, selectedPiece, possibleMoves, movePiece, isWhiteKingInCheck, isBlackKingInCheck }) {

    const validMove = useCallback(() => {
        for (let i = 0; i < possibleMoves.length; i++) {
            if (possibleMoves[i] === id) {
                return true;
            }
        }
        return false;
    }, [id, possibleMoves]);

    useEffect(() => {
        validMove();
    }, [possibleMoves, validMove]);

    const selected = selectedPiece;

    const squareRef = useRef(null);

    let amIAValidMove = validMove();

    //handle class names
    function addClassNames() {
        let classname = "square__container";
        if (selected) {
            classname += " highlighted"
        }
        if (amIAValidMove) {
            classname += " possible-move"
        }
        if (isWhiteKingInCheck === id || isBlackKingInCheck === id) {
            classname += " highlighted-check"
        }
        return classname;
    }

    function renderComponent(component, player) {
        if (component === 'King') {
            return <King playerColor={player} />
        }
        if (component === 'Queen') {
            return <Queen playerColor={player} />
        }
        if (component === 'Rook') {
            return <Rook playerColor={player} />
        }
        if (component === 'Bishop') {
            return <Bishop playerColor={player} />
        }
        if (component === 'Knight') {
            return <Knight playerColor={player} />
        }
        if (component === 'Pawn') {
            return <Pawn playerColor={player} />
        }

        if (component === "empty") {
            return <div className='empty-square'></div>
        }
    }

    function handleOnClick(e) {
        // console.log(e.target.childNodes.length)
        if (e.target.childNodes.length === 3) {
            selectAPiece(id)
        } else if (e.target.childNodes.length < 3) {
            selectAPiece(null)
        }
        movePiece(id)
    }

    function renderRank(index) {
        let renderRank;
        if (index % 8 === 0) {
            renderRank = ((index - 64) * -1) / 8
        };
        return renderRank;
    }

    function renderFile(index) {
        let renderFile;
        if (index > 55) {
            renderFile = String.fromCharCode(96 + index - 55);
        };
        return renderFile;
    }

    return (
        <div className={`square ${backgroundColor}`}>
            <div className={addClassNames()} onClick={(e) => {
                e.stopPropagation(); // Stop the event from propagating to the outer div
                handleOnClick(e);
            }} ref={squareRef}>
                {piece ? renderComponent(piece.piece, piece.player) : false}
                {/* <p className='square__index'>{id}</p> */}
                <p className='square__file'>{renderFile(id)}</p>
                <p className='square__rank'>{renderRank(id)}</p>
            </div>
        </div>
    )
}

export default Square;