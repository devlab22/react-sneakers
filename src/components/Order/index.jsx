import styles from './Order.module.scss';
import { formateCurrency } from '../formatter';
import { Link } from 'react-router-dom';

function Order({ orderId, items = [], onRemoveOrder }) {

    let p = 0;
    items.forEach(item => p = p + Number(item.price));
    p = formateCurrency({ price: p, currency: "EUR", displayCode: true });

    return (
        <div>
            <div className={styles.card} >
                <Link to={`/orders/${orderId}`}>
                    <img className='ml-30' height={60} width={50} src='/img/complete-order.jpg' alt='complete order'></img>
                    <h5>Order #{orderId}</h5>
                    <h5>Products: {items.length}</h5>
                    <div className="d-flex justify-between align-center">
                        <div className="d-flex flex-column">
                            <p>Price: </p>
                            <b>{p}</b>
                        </div>

                    </div>
                </Link>
                <button className={styles.greenButton} onClick={() => onRemoveOrder(orderId)}>Remove</button>
            </div>
        </div>
    )
}

export default Order;