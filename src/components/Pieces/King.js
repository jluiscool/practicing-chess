import BlackKing from '../../assets/Blk_King.svg'
import WhiteKing from '../../assets/Wht_King.svg'

import './King.scss'

function King({playerColor}) {
    return (
        <div className="king">
            <img src={playerColor === 'white' ? WhiteKing : BlackKing} alt="king"/>
        </div>
    )
}

export default King;