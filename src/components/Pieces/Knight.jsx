import BlackKnight from '../../assets/Blk_Knight.svg'
import WhiteKnight from '../../assets/Wht_Knight.svg'

import './Knight.scss'

function Knight({playerColor}) {
    return (
        <div className="knight">
            <img src={playerColor === 'white' ? WhiteKnight : BlackKnight} alt="knight" className='knight__piece'/>
        </div>
    )
}

export default Knight;