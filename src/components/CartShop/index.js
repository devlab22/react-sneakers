import CartItem from '../CartItem'
import styles from './CartShop.module.scss'
import React, { useState, useEffect } from 'react';
import { formateCurrency } from '../formatter';

function CartShop({ onCloseCart, onRemoveItem, items = [], onBuy }) {
    const tax = 19;
    const [amount, setAmount] = useState(0)
    let price = 0;
    items.forEach(item => {
        price += parseFloat(item.price);
    });

    useEffect(() => {
        const p = formateCurrency({price:price, displayCode:false});
        setAmount(p);
    }, [price]);

    const calculateTax = () => {
        const p = parseFloat(amount);
        const t = p * (tax / 100 );
        return formateCurrency({price:t, displayCode:true});
    };

    const handleOnBuy = () => {
       onBuy(items);
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.drawer}>
                <h2 className="d-flex justify-between align-center mb-30">Shopping cart
                    <img className={styles.removeBtn} src="/img/btn-remove.svg" alt="Remove" onClick={onCloseCart} />
                </h2>

                {
                    items.length > 0 ? (
                        <div>
                            <div className={styles.items}>

                                {items.map(item => {
                                    return <CartItem
                                        key={item.id}
                                        id={item.id}
                                        title={item.title}
                                        price={item.price}
                                        unit={item.unit}
                                        imageUrl={item.imageUrl}
                                        onRemoveItem={onRemoveItem}
                                    />
                                })}

                            </div>

                            <div className={styles.cartTotalBlock}>
                                <ul>
                                    <li>
                                        <span>Price:</span>
                                        <div></div>
                                        <b>{amount} €</b>
                                    </li>
                                    <li>
                                        <span>Tax {tax}%:</span>
                                        <div></div>
                                        <b>{calculateTax()}</b>
                                    </li>
                                </ul>
                                <button className={styles.greenButton} onClick={handleOnBuy}>Buy
                                    <img src="/img/arrow.svg" alt="Arrow" />
                                </button>
                            </div>
                        </div>

                    ) : (

                        <div className={styles.cartEmpty}>
                            <img className='mb-20' with="120px" height="120px" src="/img/empty-cart.jpg" alt="empty cart"></img>
                            <h2>Empty Cart</h2>
                            <p className='opacity-6'>Add a sneaker</p>
                            <button className={styles.greenButton} onClick={onCloseCart}>
                                <img src="/img/arrow.svg" alt="Arrow"></img>
                                Return
                            </button>
                        </div>
                    )
                }

            </div>
        </div>
    )
}

export default CartShop;