import CartItem from "./CartItem";

function CartShop() {
    return (
        <div className="overlay">
            <div className="drawer">
                <h2 className="d-flex justify-between align-center mb-30">Shopping cart 
                <img className="removeBtn" src="/img/btn-remove.svg" alt="Remove" />
                </h2>

                <div className="items">

                    <CartItem />
                    <CartItem />
                    
                </div>

                <div className="cartTotalBlock">
                    <ul>
                        <li>
                            <span>Amount:</span>
                            <div></div>
                            <b>90 €</b>
                        </li>
                        <li>
                            <span>Tax 5%:</span>
                            <div></div>
                            <b>4,5 €</b>
                        </li>
                    </ul>
                    <button className="greenButton">Buy 
                    <img src="/img/arrow.svg" alt="Arrow" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CartShop;