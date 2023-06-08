import BlackKing from '../../assets/Blk_King.svg'
import WhiteKing from '../../assets/Wht_King.svg'

function King({playerColor}) {
    return (
        <div className="king">
            <img src={playerColor === 'white' ? WhiteKing : BlackKing} />
        </div>
    )
}

export default King;