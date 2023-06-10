import BlackKnight from '../../assets/Blk_Knight.svg'
import WhiteKnight from '../../assets/Wht_Knight.svg'

function Knight({playerColor}) {
    return (
        <div className="knight">
            <img src={playerColor === 'white' ? WhiteKnight : BlackKnight} alt="knight"/>
        </div>
    )
}

export default Knight;