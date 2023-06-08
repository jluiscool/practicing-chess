import { useState } from 'react';
import './Square.scss'

function Square({ piece, backgroundColor, handleOnClick, id, }) {

    const [selected, setSelected] = useState(false)

    function handleBeingClicked(id) {
        handleOnClick(id)
        setSelected(prev => !prev)
    }
    
    return (
        <div className={`square ${backgroundColor}`} onClick={() => handleBeingClicked(id)}>
            <div className={selected ? 'square__container highlighted' : 'square__container'} >
                {piece ? <img className="square__img" src={piece} /> : ""}
            </div>
        </div>
    )
}

export default Square;