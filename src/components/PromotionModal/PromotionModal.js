import './PromotionModal.scss'
import Bishop from '../Pieces/Bishop';
import Rook from '../Pieces/Rook';
import Knight from '../Pieces/Knight';
import Queen from '../Pieces/Queen';

function PromotionModal({ playerColor, choosePromotionPiece }) {

    function handleOnClick(piece) {
        // console.log(piece)
        choosePromotionPiece(piece)
    }

    return (
        <div className="promotion-modal">
            <div className="promotion-modal__square" onClick={() => handleOnClick("Queen")} onMouseEnter={console.log('Mouse is inside')}>
                <Queen playerColor={playerColor}  />
            </div>
            <div className="promotion-modal__square" onClick={() => handleOnClick("Rook")}>
                <Rook playerColor={playerColor}  />
            </div>
            <div className="promotion-modal__square" onClick={() => handleOnClick("Bishop")}>
                <Bishop playerColor={playerColor}  />
            </div>
            <div className="promotion-modal__square" onClick={() => handleOnClick("Knight")}>
                <Knight playerColor={playerColor}  />
            </div>
        </div>
    )
}

export default PromotionModal;