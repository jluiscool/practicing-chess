import BlackBIshop from '../../assets/Blk_Bishop.svg'
import WhiteBishop from '../../assets/Wht_Bishop.svg'

function Bishop({playerColor}) {
    return (
        <div className="bishop">
            <img src={playerColor === 'white' ? WhiteBishop : BlackBIshop} />
        </div>
    )
}

export default Bishop;