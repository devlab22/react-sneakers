import styles from './Order.module.scss';
import { formateCurrency } from '../formatter';
import { Link } from 'react-router-dom';

function Order({ orderId, items = [], dateTime, onRemoveOrder }) {

    const totalPrice = items.reduce((sum, obj) => parseFloat(obj.price) + sum, 0);
    const p = formateCurrency({ price: totalPrice, currency: "EUR", displayCode: true });
    const date = dateTime.split(',')[0];
    const time = dateTime.split(',')[1];

    return (
        <div>
            <div className={styles.card} >
                <Link to={`/orders/${orderId}`}>
                    <img height={60} width={60} src='img/complete-order.jpg' alt='complete order'></img>
                    <h5>Order # {orderId}</h5>
                    <h5>Date: {date}</h5>
                    <h5>Time: {time}</h5>
                    <h5>Products: {items.length}</h5>
                    <div className="d-flex justify-between align-center">
                        <div className="d-flex flex-column">
                            <p>Price: {p}</p>                          
                        </div>

                    </div>
                </Link>
                <button className={styles.greenButton} onClick={() => onRemoveOrder(orderId)}>Remove</button>
            </div>
        </div>
    )
}

export default Order;