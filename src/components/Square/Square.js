import './Square.scss'

function Square({ piece }) {
    return (
        <div className="square">
            <div className='square__container'>
                {piece ? <img className="square__img" src={piece } /> : ""}
            </div>
        </div>
    )
}

export default Square;