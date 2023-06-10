import BlackRook from '../../assets/Blk_Rook.svg'
import WhiteRook from '../../assets/Wht_Rook.svg'

function Rook({ playerColor }) {
    return (
        <div className="rook">
            <img src={playerColor === 'white' ? WhiteRook : BlackRook} alt="rook"/>
        </div>
    )
}

export default Rook;