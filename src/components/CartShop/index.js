import CartItem from '../CartItem'
import styles from './CartShop.module.scss'
import React, { useState, useEffect } from 'react';
import { formateCurrency } from '../formatter';
import Info from '../Info';
import AppContext from '../../context';

function CartShop({ onCloseCart, onRemoveItem, items = [], onBuy }) {

    const [isCompleted, setIsCompleted] = useState(false);
    const { orderId } = React.useContext(AppContext);

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
        const t = p -  p / ( 1 + tax / 100 );
        return formateCurrency({price:t, displayCode:true});
    };

    const handleOnBuy = () => {
       onBuy(items);
       setIsCompleted(true)
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.drawer}>
                <h2 className="d-flex justify-between align-center mb-30">Shopping cart
                    <img className={styles.removeBtn} src="/img/btn-remove.svg" alt="Remove" onClick={onCloseCart} />
                </h2>

                { 
                
                    items.length > 0 ? (
                        <div className='d-flex flex-column flex'>
                            <div className={styles.items}>

                                {items.map(item => {
                                    return <CartItem
                                        key={item.key}
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
                                <button disabled={isCompleted} className={styles.greenButton} onClick={handleOnBuy}>Buy
                                    <img src="/img/arrow.svg" alt="Arrow" />
                                </button>
                            </div>
                        </div>

                    ) : (

                         <Info 
                            imgUrl={isCompleted ? "/img/complete-order.jpg" : "/img/empty-cart.jpg" }
                            title={isCompleted ? `Order #${orderId} created` : "Empty Cart"}
                            description="Thank you"
                            onClose={onCloseCart}
                            />
                    )
            }

            </div>
        </div>
    )
}

export default CartShop;