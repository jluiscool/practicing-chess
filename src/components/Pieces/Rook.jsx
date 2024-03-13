import BlackRook from '../../assets/Blk_Rook.svg';
import WhiteRook from '../../assets/Wht_Rook.svg';

import './Rook.scss'

function Rook({ playerColor }) {
    return (
        <div className="rook">
            <img src={playerColor === 'white' ? WhiteRook : BlackRook} alt="rook" className='rook__piece'/>
        </div>
    )
}

export default Rook;