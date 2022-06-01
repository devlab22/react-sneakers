function CartItem(){
    return(
        <div className="cartItem d-flex align-center mb-20">
        <div style={{ backgroundImage: 'url(/img/sneakers/2.jpg)' }} 
             className="cartItemImg">    
        </div>
        <div className="mr-20 flex">
            <p className="mb-5">Nike Blazer Mid Suede</p>
            <b>45 €</b>
        </div>
        <img className="removeBtn" src="/img/btn-remove.svg" alt="Remove" />
    </div>
    )
}

export default CartItem;