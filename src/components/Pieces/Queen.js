import BlackQueen from '../../assets/Blk_Queen.svg'
import WhiteQueen from '../../assets/Wht_Queen.svg'

function Queen({playerColor}) {
    return (
        <div className="queen">
            <img src={playerColor === 'white' ? WhiteQueen : BlackQueen} />
        </div>
    )
}

export default Queen;