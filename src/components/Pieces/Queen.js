import BlackQueen from '../../assets/Blk_Queen.svg'
import WhiteQueen from '../../assets/Wht_Queen.svg'

import './Queen.scss'

function Queen({playerColor}) {
    return (
        <div className="queen">
            <img src={playerColor === 'white' ? WhiteQueen : BlackQueen} alt="queen"/>
        </div>
    )
}

export default Queen;