import './GameBoard.scss'

import { useEffect, useState, useCallback } from 'react';

import Square from '../Square/Square';
import PromotionModal from '../PromotionModal/PromotionModal'
// const _ = require('lodash');
import * as _ from "lodash"

function GameBoard({ handleGameEnd, resetBoard, initiateBoard, handleResetBoard }) {

    const [playerTurn, setPlayerTurn] = useState('black');

    const [selectedPiece, setSelectedPiece] = useState(null);

    const [possibleMoves, setPossibleMoves] = useState([]);

    const [whiteIsInCheck, setWhiteIsInCheck] = useState(false);
    const [blackIsInCheck, setBlackIsInCheck] = useState(false);

    const [whiteIsInCheckmate, setWhiteIsInCheckmate] = useState(false);
    const [blackIsInCheckmate, setBlackIsInCheckmate] = useState(false);

    const [isItStalemate, setIsItStalemate] = useState(false);

    const [whiteKingSquare, setWhiteKingSquare] = useState(60);
    const [blackKingSquare, setBlackKingSquare] = useState(4);

    const [whiteLeftRookMoved, setWhiteLeftRookMoved] = useState(false);
    const [whiteRightRookMoved, setWhiteRightRookMoved] = useState(false);

    const [blackLeftRookMoved, setBlackLeftRookMoved] = useState(false);
    const [blackRightRookMoved, setBlackRightRookMoved] = useState(false);

    const [hasWhiteKingMoved, setHasWhiteKingMoved] = useState(false);
    const [hasBlackKingMoved, setHasBlackKingMoved] = useState(false);

    // const [canWhiteCastle, setCanWhiteCastle] = useState(true);
    // const [canBlackCastle, setCanBlackCastle] = useState(true);
    //handleResetBoard

    const [canEnPassant, setCanEnPassant] = useState(false);
    const [pawnThatCanEnPassant, setPawnThatCanEnPassant] = useState(null);
    const [squareToEnPassant, setSquareToEnPassant] = useState(null)
    const [pawnGettingEnPassant, setPawnGettingEnPassant] = useState(null)

    const [pawnPromotion, setPawnPromotion] = useState(false);
    const [pawnPromotionSquare, setPawnPromotionSquare] = useState(null)

    const ranks = 8;
    // const files = 8;

    const [board, setBoard] = useState(
        [...initiateBoard]
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

    const checkRankDiff = useCallback(
        function checkRankDiff(newSquare, prevSquare, rankDiff) {
            let diff = Math.abs(findSquareRank(newSquare) - findSquareRank(prevSquare))
            if (diff === rankDiff) {
                return true;
            } else {
                return false;
            }
        }, [])

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

    const pawnMoves = useCallback(
        function pawnMoves(piece, index, table = board) {
            const possibleMovesArr = [];
            //capture pieces
            if (piece.player === 'white') {
                if (6 <= index / ranks && index / ranks < 7 && table[index - 8] === "") {
                    possibleMovesArr.push(index - 8);
                    if (table[index - 16] === "") {
                        possibleMovesArr.push(index - 16);
                    }
                }
                if (index / ranks < 6 && table[index - 8] === "") {
                    possibleMovesArr.push(index - 8);
                }
                if (typeof table[index - 7] === "object" && table[index - 7].player === 'black' && checkNewFileDiff(index - 7, index, 1)) {
                    possibleMovesArr.push(index - 7);
                }
                if (typeof table[index - 9] === "object" && table[index - 9].player === 'black' && checkNewFileDiff(index - 9, index, 1)) {
                    possibleMovesArr.push(index - 9);
                }

            }
            if (piece.player === 'black') {
                if (1 <= index / ranks && index / ranks < 2 && table[index + 8] === "") {
                    possibleMovesArr.push(index + 8);
                    if (table[index + 16] === "")
                        possibleMovesArr.push(index + 16);
                }
                if (index / ranks > 2 && table[index + 8] === "") {
                    possibleMovesArr.push(index + 8);
                }
                if (typeof table[index + 7] === "object" && table[index + 7].player === 'white' && checkNewFileDiff(index + 7, index, 1)) {
                    possibleMovesArr.push(index + 7);
                }
                if (typeof table[index + 9] === "object" && table[index + 9].player === 'white' && checkNewFileDiff(index + 9, index, 1)) {
                    possibleMovesArr.push(index + 9);
                }
            }

            //en passant
            if (canEnPassant === true && index === pawnThatCanEnPassant) {
                possibleMovesArr.push(squareToEnPassant)
            }

            return possibleMovesArr;
        }, [board, canEnPassant, pawnThatCanEnPassant, squareToEnPassant])

    const bishopMoves = useCallback(
        function bishopMoves(piece, square, table = board) {
            const currentPlayer = piece.player;
            const movesArr = [];

            //index going down by 7
            for (let i = square - 7; i >= 0; i -= 7) {
                if (checkRankDiff(i, i + 7, 1)) {
                    if (table[i]) {
                        if (table[i].player === currentPlayer) {
                            break;
                        }
                        if (table[i].player !== currentPlayer) {
                            movesArr.push(i);
                            break;
                        }
                    } else if (!table[i]) {
                        movesArr.push(i);
                    }
                } else {
                    break;
                }
            }
            //index going down by 9
            for (let i = square - 9; i >= 0; i -= 9) {
                if (checkRankDiff(i, i + 9, 1)) {
                    if (table[i]) {
                        if (table[i].player === currentPlayer) {
                            break;
                        }
                        if (table[i].player !== currentPlayer) {
                            movesArr.push(i);
                            break;
                        }
                    } else if (!table[i]) {
                        movesArr.push(i);
                    }
                } else {
                    break;
                }
            }

            //index going up by 7
            for (let i = square + 7; i < 64; i += 7) {
                if (checkRankDiff(i, i - 7, 1)) {
                    if (table[i]) {
                        if (table[i].player === currentPlayer) {
                            break;
                        }
                        if (table[i].player !== currentPlayer) {
                            movesArr.push(i);
                            break;
                        }
                    } else if (!table[i]) {
                        movesArr.push(i);
                    }
                } else {
                    break;
                }
            }

            //index going up by 9
            for (let i = square + 9; i < 64; i += 9) {
                if (checkRankDiff(i, i - 9, 1)) {
                    if (table[i]) {
                        if (table[i].player === currentPlayer) {
                            break;
                        }
                        if (table[i].player !== currentPlayer) {
                            movesArr.push(i);
                            break;
                        }
                    } else if (!table[i]) {
                        movesArr.push(i);
                    }
                } else {
                    break;
                }
            }

            return movesArr;
        }, [board, checkRankDiff])

    const rookMoves = useCallback(
        function rookMoves(piece, square, table = board) {
            const currentPlayer = piece.player;
            const movesArr = [];
            let pieceRank = findSquareRank(square)
            // let pieceFile = findSquareFile(square)

            //going right
            for (let i = square + 1; findSquareRank(i) === pieceRank; i++) {
                if (table[i]) {
                    if (table[i].player === currentPlayer) {
                        break;
                    }
                    if (table[i].player !== currentPlayer) {
                        movesArr.push(i);
                        break;
                    }
                } else if (!table[i]) {
                    movesArr.push(i);
                }
            }

            //going left
            for (let i = square - 1; findSquareRank(i) === pieceRank; i--) {
                if (table[i]) {
                    if (table[i].player === currentPlayer) {
                        break;
                    }
                    if (table[i].player !== currentPlayer) {
                        movesArr.push(i);
                        break;
                    }
                } else if (i < 0) {
                    break;
                } else if (!table[i]) {
                    movesArr.push(i);
                }
            }

            //going up
            for (let i = square - 8; i >= 0; i -= 8) {
                if (checkNewFileDiff(i + 8, i, 0)) {
                    if (table[i]) {
                        if (table[i].player === currentPlayer) {
                            break;
                        }
                        if (table[i].player !== currentPlayer) {
                            movesArr.push(i);
                            break;
                        }
                    } else if (!table[i]) {
                        movesArr.push(i);
                    }
                }
            }
            //going down
            for (let i = square + 8; i < 64; i += 8) {
                if (checkNewFileDiff(i - 8, i, 0)) {
                    if (table[i]) {
                        if (table[i].player === currentPlayer) {
                            break;
                        }
                        if (table[i].player !== currentPlayer) {
                            movesArr.push(i);
                            break;
                        }
                    } else if (!table[i]) {
                        movesArr.push(i);
                    }
                }
            }
            return movesArr;
        }, [board])

    const queenMoves = useCallback(
        function queenMoves(piece, square, table = board) {
            let movesArr = [];
            let crossMoves = rookMoves(piece, square, table)
            let diaMoves = bishopMoves(piece, square, table)
            movesArr = [...crossMoves, ...diaMoves];

            return movesArr;
        }, [rookMoves, bishopMoves, board])


    const knightMoves = useCallback(
        function knightMoves(piece, square, table = board) {
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

            if (table[topRight] !== undefined && table[topRight].player !== currentPlayer && topRight < 64 && topRight >= 0 && checkNewFileDiff(topRight, square, 1)) {
                movesArr.push(topRight)
            }
            if (table[rightTop] !== undefined && table[rightTop].player !== currentPlayer && rightTop < 64 && rightTop >= 0 && checkNewFileDiff(rightTop, square, 2)) {
                movesArr.push(rightTop)
            }
            if (table[rightBottom] !== undefined && table[rightBottom].player !== currentPlayer && rightBottom < 64 && rightBottom >= 0 && checkNewFileDiff(rightBottom, square, 2)) {
                movesArr.push(rightBottom)
            }
            if (table[bottomRight] !== undefined && table[bottomRight].player !== currentPlayer && bottomRight < 64 && bottomRight >= 0 && checkNewFileDiff(bottomRight, square, 1)) {
                movesArr.push(bottomRight)
            }
            if (table[bottomLeft] !== undefined && table[bottomLeft].player !== currentPlayer && bottomLeft < 64 && bottomLeft >= 0 && checkNewFileDiff(bottomLeft, square, 1)) {
                movesArr.push(bottomLeft)
            }
            if (table[leftBottom] !== undefined && table[leftBottom].player !== currentPlayer && leftBottom < 64 && leftBottom >= 0 && checkNewFileDiff(leftBottom, square, 2)) {
                movesArr.push(leftBottom)
            }
            if (table[leftTop] !== undefined && table[leftTop].player !== currentPlayer && leftTop < 64 && leftTop >= 0 && checkNewFileDiff(leftTop, square, 2)) {
                movesArr.push(leftTop)
            }
            if (table[topLeft] !== undefined && table[topLeft].player !== currentPlayer && topLeft < 64 && topLeft >= 0 && checkNewFileDiff(topLeft, square, 1)) {
                movesArr.push(topLeft)
            }

            return movesArr;
        }, [board])

    const kingMoves = useCallback(
        function kingMoves(piece, square, table = board) {
            let movesArr = [];
            let currentPlayer = piece.player;
            let rightMove = square + 1;
            let leftMove = square - 1

            // going down
            for (let i = square + 7; i < square + 10 && i < 64; i++) {
                if (i === square + 7 || i === square + 9) {
                    if (checkNewFileDiff(i, square, 1)) {
                        if (table[i]) {
                            if (table[i].player !== currentPlayer) {
                                movesArr.push(i);
                            }
                        } else if (!table[i]) {
                            movesArr.push(i);
                        }
                    }
                }
                if (i === square + 8) {
                    if (table[i]) {
                        if (table[i].player !== currentPlayer) {
                            movesArr.push(i);
                        }
                    } else if (!table[i]) {
                        movesArr.push(i);
                    }
                }
            }
            //going up
            for (let i = square - 7; i > square - 10 && i >= 0; i--) {
                if (i === square - 7 || i === square - 9) {
                    if (checkNewFileDiff(i, square, 1)) {
                        if (table[i]) {
                            if (table[i].player !== currentPlayer) {
                                movesArr.push(i);
                            }
                        } else if (!table[i]) {
                            movesArr.push(i);
                        }
                    }
                }
                if (i === square - 8) {
                    if (table[i]) {
                        if (table[i].player !== currentPlayer) {
                            movesArr.push(i);
                        }
                    } else if (!table[i]) {
                        movesArr.push(i);
                    }
                }

            }
            // right
            if (rightMove <= 63 && table[rightMove].player !== currentPlayer) {
                movesArr.push(rightMove);
            }
            // left
            if (leftMove > 0 && table[leftMove].player !== currentPlayer) {
                movesArr.push(leftMove);
            }

            return movesArr;
        }
        , [board])

    const canKingCastle = useCallback((piece, square, table = board) => {
        let castlingAvailable = true;
        let movesArr = [];

        let whiteRightCastleSquare = 62;
        let whiteLeftCastleSquare = 58;
        let blackRightCastleSquare = 6;
        let blackLeftCastleSquare = 2;

        //white castle
        if (table[square].player === "white" && hasWhiteKingMoved === false && whiteRightRookMoved === false && typeof table[61] === "string" && typeof table[62] === "string" && !whiteIsInCheck) {
            movesArr.push(whiteRightCastleSquare)
        }

        if (table[square].player === "white" && hasWhiteKingMoved === false && whiteLeftRookMoved === false && typeof table[59] === "string" && typeof table[58] === "string" && typeof table[57] === "string" && !whiteIsInCheck) {
            movesArr.push(whiteLeftCastleSquare)
        }

        // //black castle
        if (table[square].player === "black" && hasBlackKingMoved === false && blackRightRookMoved === false && typeof table[5] === "string" && typeof table[6] === "string" && !blackIsInCheck) {
            movesArr.push(blackRightCastleSquare)
        }
        if (table[square].player === "black" && hasBlackKingMoved === false && blackLeftRookMoved === false && typeof table[3] === "string" && typeof table[2] === "string" && typeof table[1] === "string" && !blackIsInCheck) {
            movesArr.push(blackLeftCastleSquare)
        }
        if (castlingAvailable === true) {
            return movesArr;
        } else {
            return movesArr = [];
        }

    }, [blackIsInCheck, blackLeftRookMoved, blackRightRookMoved, board, hasBlackKingMoved, hasWhiteKingMoved, whiteIsInCheck, whiteLeftRookMoved, whiteRightRookMoved])

    const allKingMoves = useCallback((piece, square, table) => {
        let allMovesArray = kingMoves(piece, square, table).concat(canKingCastle(piece, square, table))

        return allMovesArray;
    }, [canKingCastle, kingMoves])

    const handleThisPiece = useCallback((square, table = board) => {
        let potentialMoves = [];
        if (table[square].piece === 'Pawn') {
            potentialMoves.push(...pawnMoves(table[square], square, table));
        }
        if (table[square].piece === 'Bishop') {
            potentialMoves.push(...bishopMoves(table[square], square, table));
        }
        if (table[square].piece === 'Rook') {
            potentialMoves.push(...rookMoves(table[square], square, table));
        }
        if (table[square].piece === 'Queen') {
            potentialMoves.push(...queenMoves(table[square], square, table));
        }
        if (table[square].piece === 'King') {
            potentialMoves.push(...allKingMoves(table[square], square, table));
        }
        if (table[square].piece === 'Knight') {
            potentialMoves.push(...knightMoves(table[square], square, table));
        }
        return potentialMoves;
    }, [bishopMoves, knightMoves, pawnMoves, queenMoves, rookMoves, allKingMoves, board]);

    const seeAttackingSquares = useCallback((attackingPlayer, table = board, pieceToExclude) => {
        let attackedSquaresArr = [];
        for (let i = 0; i < table.length; i++) {
            if (typeof table[i] === 'object' && table[i].player === attackingPlayer && table[i].piece !== pieceToExclude) {
                attackedSquaresArr.push(...handleThisPiece(i, table));
            }
        }
        return attackedSquaresArr;
    }, [board, handleThisPiece]);

    const resetEnPassant = useCallback(() => {
        setCanEnPassant(false);
        setPawnThatCanEnPassant(null);
        setSquareToEnPassant(null);
        setPawnGettingEnPassant(null);
    }, [])

    function movePiece(squareToMoveTo, table = board) {
        let validSquare;
        if (typeof selectedPiece === 'number' && possibleMoves.length > 0) {
            for (let i = 0; i < possibleMoves.length; i++) {
                console.log(possibleMoves)
                if (squareToMoveTo === possibleMoves[i])
                    validSquare = possibleMoves[i]
            }
        } else {
            return;
        }
        if (typeof validSquare === 'number' && playerTurn === table[selectedPiece].player && table === board) {
            //set en passant logic
            if (board[selectedPiece].piece === "Pawn") {
                //en passant
                //black pawn
                if (board[selectedPiece].player === "black" && selectedPiece / 8 >= 1 && selectedPiece / 8 < 2) {
                    if (board[validSquare + 1].player === "white" && board[validSquare + 1].piece === "Pawn") {
                        setCanEnPassant(true)
                        setPawnThatCanEnPassant(validSquare + 1)
                        setSquareToEnPassant(validSquare - 8)
                        setPawnGettingEnPassant(validSquare)
                    }
                    if (board[validSquare - 1].player === "white" && board[validSquare - 1].piece === "Pawn") {
                        setCanEnPassant(true)
                        setPawnThatCanEnPassant(validSquare - 1)
                        setSquareToEnPassant(validSquare - 8)
                        setPawnGettingEnPassant(validSquare)
                    }
                }
                //white pawn
                if (board[selectedPiece].player === "white" && selectedPiece / 8 >= 6 && selectedPiece / 8 < 7) {
                    if (board[validSquare + 1].player === "black" && board[validSquare + 1].piece === "Pawn") {
                        setCanEnPassant(true)
                        setPawnThatCanEnPassant(validSquare + 1)
                        setSquareToEnPassant(validSquare + 8)
                        setPawnGettingEnPassant(validSquare)
                    }
                    if (board[validSquare - 1].player === "black" && board[validSquare - 1].piece === "Pawn") {
                        setCanEnPassant(true)
                        setPawnThatCanEnPassant(validSquare - 1)
                        setSquareToEnPassant(validSquare + 8)
                        setPawnGettingEnPassant(validSquare)
                    }
                }
            }

            //castling white, left
            if (validSquare === 58 && table[selectedPiece].piece === "King" && table[selectedPiece].player === "white" && hasWhiteKingMoved === false) {
                setBoard((prev) => {
                    let newBoard = prev.map((square, index) => {
                        if (index === validSquare) {
                            square = table[selectedPiece];
                            return square;
                        } else if (index === 59) {
                            square = table[56];
                            return square;
                        } else if (index === 56) {
                            square = ""
                            return square;
                        } else {
                            return square;
                        }
                    })
                    return newBoard;
                })
            }

            // castling white, right
            if (validSquare === 62 && table[selectedPiece].piece === "King" && table[selectedPiece].player === "white" && hasWhiteKingMoved === false) {
                setBoard((prev) => {
                    let newBoard = prev.map((square, index) => {
                        if (index === validSquare) {
                            square = table[selectedPiece];
                            return square;
                        } else if (index === 61) {
                            square = table[63];
                            return square;
                        } else if (index === 63) {
                            square = ""
                            return square;
                        } else {
                            return square;
                        }
                    })
                    return newBoard;
                })
            }

            //castle black, right
            if (validSquare === 6 && table[selectedPiece].piece === "King" && table[selectedPiece].player === "black" && hasBlackKingMoved === false) {
                setBoard((prev) => {
                    let newBoard = prev.map((square, index) => {
                        if (index === validSquare) {
                            square = table[selectedPiece];
                            return square;
                        } else if (index === 5) {
                            square = table[7];
                            return square;
                        } else if (index === 7) {
                            square = ""
                            return square;
                        } else {
                            return square;
                        }
                    })
                    return newBoard;
                })
            }

            //castle black, left
            if (validSquare === 2 && table[selectedPiece].piece === "King" && table[selectedPiece].player === "black" && hasBlackKingMoved === false) {
                setBoard((prev) => {
                    let newBoard = prev.map((square, index) => {
                        if (index === validSquare) {
                            square = table[selectedPiece];
                            return square;
                        } else if (index === 3) {
                            square = table[0];
                            return square;
                        } else if (index === 0) {
                            square = ""
                            return square;
                        } else {
                            return square;
                        }
                    })
                    return newBoard;
                })
            }

            //regular move
            setBoard((prev) => {
                let newBoard = prev.map((square, index) => {
                    // console.log(selectedPiece)
                    if (index === validSquare) {
                        square = table[selectedPiece];
                        return square;
                    } else if (canEnPassant === true && index === pawnGettingEnPassant && validSquare === squareToEnPassant) {
                        square = "";
                        return square
                    } else if (index === selectedPiece) {
                        square = "";
                        return square;
                    } else {
                        return square;
                    }
                })
                if (canEnPassant === true) {
                    resetEnPassant()
                }
                return newBoard;
            })

            if (board[selectedPiece].piece === "Pawn" && board[selectedPiece].player === "white" && squareToMoveTo < 8 && pawnPromotion === false) {
                console.log('you are now promoting as white')
                setPawnPromotionSquare(squareToMoveTo)
                setPawnPromotion(true)
            } else if (board[selectedPiece].piece === "Pawn" && board[selectedPiece].player === "black" && squareToMoveTo > 55 && pawnPromotion === false) {
                console.log('you are now promoting as black')
                setPawnPromotionSquare(squareToMoveTo)
                setPawnPromotion(true)
            }
        } else {
            return;
        }
    }

    //change player turn, reset selectedPiece
    useEffect(() => {
        if (playerTurn === 'white') {
            setPlayerTurn('black')
        } else if (playerTurn === "black") {
            setPlayerTurn('white')
        }
        setSelectedPiece(null)
    }, [board])

    // returns a board in an array with the simulated move
    const changeNextMoveBoard = useCallback((squareToMoveTo, pieceToMove) => {
        let simulatedBoard = _.cloneDeep(board);
        let newSimulatedBoard = simulatedBoard.map((square, index) => {
            if (index === squareToMoveTo) {
                square = simulatedBoard[pieceToMove]
                return square;
            } else if (index === pieceToMove) {
                square = "";
                return square;
            } else {
                return square;
            }
        })
        return newSimulatedBoard
    }, [board])

    const findKingSquare = useCallback((player, table = board) => {
        let foundKingSquare;
        for (let i = 0; i < table.length; i++) {
            if (typeof table[i] === "object" && table[i].piece === "King" && table[i].player === player) {
                foundKingSquare = i;
            }
        }
        return foundKingSquare
    }, [board])

    const checkIfPieceMoved = useCallback((pieceThatMoved, pieceStartingSquare) => {
        let didPieceMove = false;

        if (typeof board[pieceStartingSquare] === "object") {
            if (board[pieceStartingSquare].piece !== pieceThatMoved) {
                didPieceMove = true;
            }
        } else {
            didPieceMove = true;
        }

        return didPieceMove;

    }, [board])

    const checkIfPlayerIsInCheck = useCallback((player, attackArray, table = board) => {
        let checked = false;

        let kingSquare = findKingSquare(player, table)

        for (let i = 0; i < attackArray.length; i++) {
            if (kingSquare === attackArray[i]) {
                checked = true;
            }
        }

        return checked;
    }, [board, findKingSquare]);

    const checkIfSquareIsInCheck = useCallback((attackArray, squareToCheck) => {
        let checked = false;

        for (let i = 0; i < attackArray.length; i++) {
            if (squareToCheck === attackArray[i]) {
                checked = true;
            }
        }

        return checked;
    }, [board, findKingSquare]);

    const findAllPlayerPieces = useCallback((player, table = board) => {
        let playerPieces = []
        for (let i = 0; i < table.length; i++) {
            if (typeof table[i] === "object" && table[i].player === player) {
                playerPieces.push(i);
            }
        }
        return playerPieces
    }, [board])

    const findOppPlayer = useCallback((player) => {
        if (player === "white") {
            return "black"
        } else if (player === "black") {
            return "white"
        }
    }, [])

    const findLegalMoves = useCallback((movesArr, oppPlayer, pieceToMove) => {
        let possibleMovesArr = [...movesArr];
        let filteredMoves = []
        for (let i = 0; i < possibleMovesArr.length; i++) {
            // returns new board
            let testBoard = changeNextMoveBoard(possibleMovesArr[i], pieceToMove);
            // returns array of squares being attacked by player
            let oppFutureAttackingMoves = seeAttackingSquares(oppPlayer, testBoard)
            if (checkIfPlayerIsInCheck(findOppPlayer(oppPlayer), oppFutureAttackingMoves, testBoard)) {
                if (board[pieceToMove].piece === "King" && board[pieceToMove].player === "black") {
                    if (oppFutureAttackingMoves.includes(5)) {
                        possibleMovesArr = possibleMovesArr.filter((num) => {
                            return (
                                num !== 6
                            )
                        })
                    } else if (oppFutureAttackingMoves.includes(3)) {
                        possibleMovesArr = possibleMovesArr.filter((num) => {
                            return (
                                num !== 2
                            )
                        })
                    }
                } if (board[pieceToMove].piece === "King" && board[pieceToMove].player === "white") {
                    if (oppFutureAttackingMoves.includes(61)) {
                        possibleMovesArr = possibleMovesArr.filter((num) => {
                            return (
                                num !== 62
                            )
                        })
                    } else if (oppFutureAttackingMoves.includes(59)) {
                        possibleMovesArr = possibleMovesArr.filter((num) => {
                            return (
                                num !== 58
                            )
                        })
                    }
                }
            } else {
                filteredMoves.push(possibleMovesArr[i])
            }
        }
        return filteredMoves;
    }, [changeNextMoveBoard, checkIfPlayerIsInCheck, findOppPlayer, seeAttackingSquares])

    const findEveryLegalMove = useCallback((playerPiecesArr, oppPlayer) => {
        let everyLegalMove = []
        for (let j = 0; j < playerPiecesArr.length; j++) {
            let piecePossibleMoves = handleThisPiece(playerPiecesArr[j], board);
            everyLegalMove = [...everyLegalMove, ...findLegalMoves(piecePossibleMoves, oppPlayer, playerPiecesArr[j])];
        }
        return everyLegalMove;
    }, [board, findLegalMoves, handleThisPiece])

    function choosePromotionPiece(promotionPiece) {
        setBoard((prevBoard) => {
            let newBoard = prevBoard.map((square, index) => {
                if (index === pawnPromotionSquare) {
                    console.log(pawnPromotionSquare)
                    console.log(promotionPiece)
                    console.log(square)
                    return ({
                        ...square,
                        piece: promotionPiece
                    })
                } else {
                    return square
                }
            })
            return newBoard;
        }
        )
        setPawnPromotion(false)
        setPawnPromotionSquare(null)
        if (playerTurn === 'white') {
            setPlayerTurn('black')
        } else if (playerTurn === "black") {
            setPlayerTurn('white')
        }
    }



    //handle clicking on a piece
    useEffect(() => {
        if (selectedPiece !== null) {
            let oppPlayer = findOppPlayer(board[selectedPiece].player)
            //you get back array
            let newPossibleMoves = handleThisPiece(selectedPiece);
            let legalMoves = findLegalMoves(newPossibleMoves, oppPlayer, selectedPiece)
            setPossibleMoves(legalMoves);
        } else {
            setPossibleMoves([])
        }
    }, [selectedPiece, handleThisPiece, board, findLegalMoves, findOppPlayer])

    //set player's king squares
    useEffect(() => {
        setWhiteKingSquare(findKingSquare("white"))
        setBlackKingSquare(findKingSquare("black"))
    }, [board, findKingSquare])

    // set player's rooks squares
    useEffect(() => {

    }, [board])

    //check if white king moved, castling is false
    useEffect(() => {
        if (whiteKingSquare !== 60) {
            setHasWhiteKingMoved(true)
            // setCanWhiteCastle(false)
        }
    }, [whiteKingSquare])

    //check if black king moved, castling is false
    useEffect(() => {
        if (blackKingSquare !== 4) {
            setHasBlackKingMoved(true)
            // setCanBlackCastle(false)
        }
    }, [blackKingSquare])

    // check if white left rook moved
    useEffect(() => {
        let didWhiteLeftRookMove = checkIfPieceMoved("Rook", 56)
        if (didWhiteLeftRookMove === true) {
            setWhiteLeftRookMoved(true)
        }
    }, [board, checkIfPieceMoved])

    // check if white right rook moved
    useEffect(() => {
        let didWhiteRightRookMove = checkIfPieceMoved("Rook", 63)
        if (didWhiteRightRookMove === true) {
            setWhiteRightRookMoved(true)
        }
    }, [board, checkIfPieceMoved])

    // check if black left rook moved
    useEffect(() => {
        let didBlackLeftRookMove = checkIfPieceMoved("Rook", 0)
        if (didBlackLeftRookMove === true) {
            setBlackLeftRookMoved(true)
        }
    }, [board, checkIfPieceMoved])

    // check if black right rook moved
    useEffect(() => {
        let didBlackRightRookMove = checkIfPieceMoved("Rook", 7)
        if (didBlackRightRookMove === true) {
            setBlackRightRookMoved(true)
        }
    }, [board, checkIfPieceMoved])

    //check if player is in check
    useEffect(() => {
        setWhiteIsInCheck(checkIfPlayerIsInCheck("white", seeAttackingSquares("black")))
        setBlackIsInCheck(checkIfPlayerIsInCheck("black", seeAttackingSquares("white")))
    }, [checkIfPlayerIsInCheck, board, seeAttackingSquares])

    //checks for checkmate
    useEffect(() => {
        if (blackIsInCheck) {
            let playerPieces = findAllPlayerPieces("black")
            let legalMoves = findEveryLegalMove(playerPieces, findOppPlayer("black"));
            if (legalMoves.length === 0) {
                console.log('youre black and youre in checkmate pal')
                setBlackIsInCheckmate(true)
            }
        }
        if (whiteIsInCheck) {
            let playerPieces = findAllPlayerPieces("white")
            let legalMoves = findEveryLegalMove(playerPieces, findOppPlayer("white"));
            if (legalMoves.length === 0) {
                console.log('youre white and youre checkmate pal')
                setWhiteIsInCheckmate(true)
            }
        }
        if (playerTurn === "white" && !whiteIsInCheck) {
            let playerPieces = findAllPlayerPieces("white")
            let legalMoves = findEveryLegalMove(playerPieces, findOppPlayer("white"));
            if (legalMoves.length === 0) {
                setIsItStalemate(true)
            }
        }
        if (playerTurn === "black" && !blackIsInCheck) {
            let playerPieces = findAllPlayerPieces("white")
            let legalMoves = findEveryLegalMove(playerPieces, findOppPlayer("white"));
            if (legalMoves.length === 0) {
                console.log('no possible moves for you, its a stalemate draw')
                setIsItStalemate(true)
            }
        }

    }, [board, blackIsInCheck, whiteIsInCheck, findAllPlayerPieces, findEveryLegalMove, findOppPlayer, playerTurn])

    useEffect(() => {
        if (whiteIsInCheckmate) {
            handleGameEnd()
            setWhiteIsInCheckmate(false)
        }
        if (blackIsInCheckmate) {
            handleGameEnd()
            setBlackIsInCheckmate(false)
        }
    }, [whiteIsInCheckmate, blackIsInCheckmate])

    useEffect(() => {
        if (resetBoard) {
            setBoard((prev) => [...initiateBoard])
        }
        // handleResetBoard()
    }, [resetBoard])

    return (
        <div className='gameboard'>
            {pawnPromotion ? <PromotionModal playerColor={findOppPlayer(playerTurn)} choosePromotionPiece={choosePromotionPiece} /> : false}
            <div className={`gameboard-squares ${playerTurn === "black" ? "flip" : ""}`}>
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
                                isBlackKingInCheck={blackIsInCheck ? blackKingSquare : false}
                                playerTurn={playerTurn}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default GameBoard;