import BlackPawn from '../../assets/Blk_Pawn.svg'
import WhitePawn from '../../assets/Wht_Pawn.svg'

import './Pawn.scss'

function Pawn({ playerColor }) {

    return (
        <div className="pawn">
            <img src={playerColor === 'white' ? WhitePawn : BlackPawn} alt="pawn" />
        </div>
    )
}

export default Pawn;