import { useState } from 'react'
import BlackPawn from '../../assets/Blk_Pawn.svg'
import WhitePawn from '../../assets/Wht_Pawn.svg'

function Pawn({ playerColor }) {

    return (
        <div className="pawn">
            <img src={playerColor === 'white' ? WhitePawn : BlackPawn} />
        </div>
    )
}

export default Pawn;