import { useState, useEffect, useRef } from 'react';
import './Square.scss'
import Bishop from '../Pieces/Bishop';
import Rook from '../Pieces/Rook';
import Pawn from '../Pieces/Pawn';
import Knight from '../Pieces/Knight';
import Queen from '../Pieces/Queen';
import King from '../Pieces/King';

function Square({ piece, backgroundColor, id, selectAPiece, selectedPiece, possibleMoves, movePiece, isWhiteKingInCheck, isBlackKingInCheck }) {

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



    function validMove() {
        for (let i = 0; i < possibleMoves.length; i++) {
            if (possibleMoves[i] === id) {
                return true;
            }
        }
        return false;
    }

    useEffect(() => {
        validMove()
    }, [possibleMoves])

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
    }

    function handleOnClick(e) {
        if (e.target.childNodes.length === 2) {
            selectAPiece(id)
        } else if (e.target.childNodes.length < 2) {
            selectAPiece(null)
        }
        movePiece(id)
    }

    return (
        <div className={`square ${backgroundColor}`} >
            <div className={addClassNames()} onClick={(e) => handleOnClick(e)} ref={squareRef}>
                {piece ? renderComponent(piece.piece, piece.player) : ""}
                <p className='square__index'>{id}</p>
            </div>
        </div>
    )
}

export default Square;