import './GameStartModal.scss'

function GameStartModal({ handleNewGame }) {
    return (
        <div className='game-start-modal'>
            <div className='modal-container'>
                <p>Would you like to start a new game?</p>
                <button onClick={handleNewGame}>Start</button>
            </div>
        </div>
    )
}

export default GameStartModal;