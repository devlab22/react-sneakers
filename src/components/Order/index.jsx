import styles from './Order.module.scss';
import { formateCurrency } from '../formatter';
import { Link } from 'react-router-dom';
import AppContext from '../../context';
import React from 'react';

function Order({ orderId, items = [] }) {

    const { setOrderId } = React.useContext(AppContext);
    let p = 0
    items.forEach(item => p = p + Number(item.price))
    p = formateCurrency({ price: p, currency: "EUR", displayCode: true });

    const onOrderClick = () => {
        setOrderId(orderId);
    };

    return (
        <div>
            <Link to={`/orders/${orderId}`}>
                <div className={styles.card} onClick={onOrderClick}>

                    <h5>Order #{orderId}</h5>
                    <div className="d-flex justify-between align-center">
                        <div className="d-flex flex-column">
                            <p>Price: </p>
                            <b>{p}</b>
                        </div>
                    </div>

                </div>
            </Link>
        </div>
    )
}

export default Order;