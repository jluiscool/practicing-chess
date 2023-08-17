import './GameEndModal.scss'

function GameStartModal({ handleResetBoard, handleGameEnd }) {

    function handleOnClick() {
        handleGameEnd()
        handleResetBoard()
    }

    return (
        <div className='game-start-modal'>
            <div className='modal-container'>
                <p className='modal-paragraph'>Game over! Would you like to start a new game?</p>
                <button className="modal-button" onClick={handleOnClick}>Start</button>
            </div>
        </div>
    )
}

export default GameStartModal;