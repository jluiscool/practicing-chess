import './GameEndModal.scss'

function GameStartModal({ handleNewGame }) {
    return (
        <div className='game-start-modal'>
            <div className='modal-container'>
                <p className='modal-paragraph'>Would you like to start a new game?</p>
                <button className="modal-button" onClick={handleNewGame}>Start</button>
            </div>
        </div>
    )
}

export default GameStartModal;