import BlackBIshop from '../../assets/Blk_Bishop.svg'
import WhiteBishop from '../../assets/Wht_Bishop.svg'

import './Bishop.scss'

function Bishop({playerColor}) {
    return (
        <div className="bishop">
            <img src={playerColor === 'white' ? WhiteBishop : BlackBIshop} alt="bishop"/>
        </div>
    )
}

export default Bishop;