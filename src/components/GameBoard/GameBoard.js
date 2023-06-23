import './GameBoard.scss'

import { useEffect, useState } from 'react';

import Square from '../Square/Square';
const _ = require('lodash');

function GameBoard() {

    const [playerTurn, setPlayerTurn] = useState('white');

    const [selectedPiece, setSelectedPiece] = useState(null);

    const [possibleMoves, setPossibleMoves] = useState([]);

    const [whiteIsInCheck, setWhiteIsInCheck] = useState(false);
    const [blackIsInCheck, setBlackIsInCheck] = useState(false);

    const [squaresAttackedByWhite, setSquaresAttackedByWhite] = useState([]);

    const [squaresAttackedByBlack, setSquaresAttackedByBlack] = useState([]);

    const [whiteKingSquare, setWhiteKingSquare] = useState(null);
    const [blackKingSquare, setBlackKingSquare] = useState(null);

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

    //select or deselect piece
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

        //apply some logic to the possibleMovesArr if player is in check or will be in check by making this move
        // let blackPotentialMoves = seeAttackingSquares("black");
        if (piece.player === 'white' && whiteIsInCheck) {
            for (let i = 0; i < possibleMovesArr.length; i++) {
                console.log(possibleMovesArr[i])
                // for (let j = 0; j < blackPotentialMoves.length; j++) {
                //     if (possibleMovesArr[i] === blackPotentialMoves[j]) {
                //         console.log(possibleMovesArr[i])
                //     }
                // }
            }
        }

        return possibleMovesArr;
    }

    function checkRankDiff(newSquare, prevSquare, rankDiff) {
        let diff = Math.abs(findSquareRank(newSquare) - findSquareRank(prevSquare))
        if (diff === rankDiff) {
            return true;
        } else {
            return false;
        }
    }

    function checkNewFileDiff(newSquare, currSquare, fileDiff) {

        let currSquareFile = (currSquare / 8) % 1;
        let newSquareFile = (newSquare / 8) % 1

        let squareDiff = Math.abs(currSquareFile - newSquareFile);

        let diff = fileDiff / 8;

        if (squareDiff === diff) {
            return true;
        } else {
            return false;
        }
    }

    function bishopMoves(piece, square) {
        const currentPlayer = piece.player;
        const movesArr = [];

        //index going down by 7
        for (let i = square - 7; i >= 0; i -= 7) {
            if (checkRankDiff(i, i + 7, 1)) {
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
            if (checkRankDiff(i, i + 9, 1)) {
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
            if (checkRankDiff(i, i - 7, 1)) {
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
            if (checkRankDiff(i, i - 9, 1)) {
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

    function rookMoves(piece, square) {
        const currentPlayer = piece.player;
        const movesArr = [];
        let pieceRank = findSquareRank(square)
        let pieceFile = findSquareFile(square)

        //going right
        for (let i = square + 1; findSquareRank(i) == pieceRank; i++) {
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
        }

        //going left
        for (let i = square - 1; findSquareRank(i) == pieceRank; i--) {
            if (board[i]) {
                if (board[i].player === currentPlayer) {
                    break;
                }
                if (board[i].player !== currentPlayer) {
                    movesArr.push(i);
                    break;
                }
            } else if (i < 0) {
                break;
            } else if (!board[i]) {
                movesArr.push(i);
            }
        }

        //going up
        for (let i = square - 8; i >= 0; i -= 8) {
            if (checkNewFileDiff(i + 8, i, 0)) {
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
            }
        }
        //going down
        for (let i = square + 8; i < 64; i += 8) {
            if (checkNewFileDiff(i - 8, i, 0)) {
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
            }
        }
        return movesArr;
    }

    function queenMoves(piece, square) {
        let movesArr = [];
        let crossMoves = rookMoves(piece, square)
        let diaMoves = bishopMoves(piece, square)
        movesArr = [...crossMoves, ...diaMoves];

        return movesArr;
    }

    function kingMoves(piece, square) {
        let movesArr = [];
        let currentPlayer = piece.player;
        let rightMove = square + 1;
        let leftMove = square - 1

        // going down
        for (let i = square + 7; i < square + 10 && i < 64; i++) {
            if (board[i]) {
                if (board[i].player !== currentPlayer) {
                    movesArr.push(i);
                }
            } else if (!board[i]) {
                movesArr.push(i);
            }
        }
        //going up
        for (let i = square - 7; i > square - 10 && i >= 0; i--) {
            if (board[i]) {
                if (board[i].player !== currentPlayer) {
                    movesArr.push(i);
                }
            } else if (!board[i]) {
                movesArr.push(i);
            }
        }
        // right
        if (board[rightMove].player !== currentPlayer) {
            movesArr.push(rightMove);
        }
        // left
        if (board[leftMove].player !== currentPlayer) {
            movesArr.push(leftMove);
        }
        return movesArr;
    }

    function knightMoves(piece, square) {
        let movesArr = [];
        let currentPlayer = piece.player;
        let topRight = square - 15;
        let rightTop = square - 6;
        let rightBottom = square + 10;
        let bottomRight = square + 17;
        let bottomLeft = square + 15;
        let leftBottom = square + 6;
        let leftTop = square - 10;
        let topLeft = square - 17;

        if (board[topRight] !== undefined && board[topRight].player != currentPlayer && topRight < 64 && topRight >= 0 && checkNewFileDiff(topRight, square, 1)) {
            movesArr.push(topRight)
        }
        if (board[rightTop] !== undefined && board[rightTop].player != currentPlayer && rightTop < 64 && rightTop >= 0 && checkNewFileDiff(rightTop, square, 2)) {
            movesArr.push(rightTop)
        }
        if (board[rightBottom] !== undefined && board[rightBottom].player != currentPlayer && rightBottom < 64 && rightBottom >= 0 && checkNewFileDiff(rightBottom, square, 2)) {
            movesArr.push(rightBottom)
        }
        if (board[bottomRight] !== undefined && board[bottomRight].player != currentPlayer && bottomRight < 64 && bottomRight >= 0 && checkNewFileDiff(bottomRight, square, 1)) {
            movesArr.push(bottomRight)
        }
        if (board[bottomLeft] !== undefined && board[bottomLeft].player != currentPlayer && bottomLeft < 64 && bottomLeft >= 0 && checkNewFileDiff(bottomLeft, square, 1)) {
            movesArr.push(bottomLeft)
        }
        if (board[leftBottom] !== undefined && board[leftBottom].player != currentPlayer && leftBottom < 64 && leftBottom >= 0 && checkNewFileDiff(leftBottom, square, 2)) {
            movesArr.push(leftBottom)
        }
        if (board[leftTop] !== undefined && board[leftTop].player != currentPlayer && leftTop < 64 && leftTop >= 0 && checkNewFileDiff(leftTop, square, 2)) {
            movesArr.push(leftTop)
        }
        if (board[topLeft] !== undefined && board[topLeft].player != currentPlayer && topLeft < 64 && topLeft >= 0 && checkNewFileDiff(topLeft, square, 1)) {
            movesArr.push(topLeft)
        }

        return movesArr;
    }

    function movePiece(squareToMoveTo) {
        let validSquare;
        if (typeof selectedPiece === 'number' && possibleMoves.length > 0) {
            for (let i = 0; i < possibleMoves.length; i++) {
                if (squareToMoveTo === possibleMoves[i])
                    validSquare = possibleMoves[i]
            }
        } else {
            return;
        }
        if (typeof validSquare === 'number' && playerTurn === board[selectedPiece].player) {
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

    function handleThisPiece(square) {
        let potentialMoves = [];
        if (board[square].piece === 'Pawn') {
            potentialMoves.push(...pawnMoves(board[square], square));
        }
        if (board[square].piece === 'Bishop') {
            potentialMoves.push(...bishopMoves(board[square], square));
        }
        if (board[square].piece === 'Rook') {
            potentialMoves.push(...rookMoves(board[square], square));
        }
        if (board[square].piece === 'Queen') {
            potentialMoves.push(...queenMoves(board[square], square));
        }
        if (board[square].piece === 'King') {
            potentialMoves.push(...kingMoves(board[square], square));
        }
        if (board[square].piece === 'Knight') {
            potentialMoves.push(...knightMoves(board[square], square));
        }
        return potentialMoves;
    }

    function seeAttackingSquares(attackingPlayer) {
        let attackedSquaresArrWhite = [];
        let attackedSquaresArrBlack = [];

        for (let i = 0; i < board.length; i++) {
            if (typeof board[i] === "object") {
                if (board[i].player === 'white') {
                    attackedSquaresArrWhite.push(...handleThisPiece(i))
                }
                if (board[i].player === 'black') {
                    attackedSquaresArrBlack.push(...handleThisPiece(i))
                }
            }
        }

        if (attackingPlayer === "white") {
            return attackedSquaresArrWhite;
        } else if (attackingPlayer === "black") {
            return attackedSquaresArrBlack;
        }
    }

    //handle clicking on a piece
    useEffect(() => {
        if (selectedPiece !== null) {
            setPossibleMoves(handleThisPiece(selectedPiece));
        } else {
            setPossibleMoves([])
        }
    }, [selectedPiece])

    //set player's king squares
    useEffect(() => {
        setBlackKingSquare(prev => {
            for (let i = 0; i < board.length; i++) {
                if (board[i].piece === "King" & board[i].player === "black") {
                    return i;
                }
            }
        })
        setWhiteKingSquare(prev => {
            for (let i = 0; i < board.length; i++) {
                if (board[i].piece === "King" & board[i].player === "white") {
                    return i;
                }
            }
        })
    }, [board])

    useEffect(() => {
        console.log(`white king: ${whiteKingSquare}, black king ${blackKingSquare}`)
    }, [blackKingSquare, whiteKingSquare])

    //set player's attacking squares
    useEffect(() => {
        setSquaresAttackedByBlack(seeAttackingSquares("black"))
        setSquaresAttackedByWhite(seeAttackingSquares("white"))
    }, [board])

    // log players attacking squares, check if player is in check

    useEffect(() => {
        //check if white is in check
        for (let i = 0; i < squaresAttackedByBlack.length; i++) {
            if (squaresAttackedByBlack[i] === whiteKingSquare) {
                setWhiteIsInCheck(true);
            } else {
                setWhiteIsInCheck(false);
            }
        }

        for (let i = 0; i < squaresAttackedByWhite.length; i++) {
            if (squaresAttackedByWhite[i] === blackKingSquare) {
                setBlackIsInCheck(true);
            } else {
                setBlackIsInCheck(false);
            }
        }
    }, [squaresAttackedByBlack, squaresAttackedByWhite, whiteKingSquare, blackKingSquare, board])

    useEffect(() => {
        if (blackIsInCheck) {
            console.log('black is in check')
        }
        if (whiteIsInCheck) {
            console.log('white is in check')
        } else {
            console.log('white is no longer in check');
        }
    }, [blackIsInCheck, whiteIsInCheck, board])

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
                            isWhiteKingInCheck={whiteIsInCheck ? whiteKingSquare : false}
                            isBlackKingInCheck={blackIsInCheck ? whiteKingSquare : false}
                        />
                    )
                })
            }
            <div>It is {playerTurn}'s turn</div>
        </div>
    )
}

export default GameBoard;