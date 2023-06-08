import './Square.scss'

function Square({ piece, backgroundColor }) {
    return (
        <div className={`square ${backgroundColor}`}>
            <div className='square__container'>
                {piece ? <img className="square__img" src={piece} /> : ""}
            </div>
        </div>
    )
}

export default Square;