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
<<<<<<< HEAD
                <Link to={`${orderId}`}>
                    <img height={60} width={60} src='img/complete-order.jpg' alt='complete order'></img>
                    <h5>Order # {orderId}</h5>
                    <h5>Date: {date}</h5>
                    <h5>Time: {time}</h5>
                    <h5>Products: {items.length}</h5>
=======
                <Link to={`/orders/${orderId}`}>
                    <img height={60} width={50} src='/img/complete-order.jpg' alt='complete order'></img>
                    <h5>Order # <b>{orderId}</b></h5>
                    <h5>Date: <b>{date}</b></h5>
                    <h5>Time: <b>{time}</b></h5>
                    <h5>Products: <b>{items.length}</b></h5>
>>>>>>> parent of 1a8d7be (lesson 7 20220622 v2)
                    <div className="d-flex justify-between align-center">
                        <div className="d-flex flex-column">
                            <p>Price: <b>{p}</b></p>                          
                        </div>

                    </div>
                </Link>
                <button className={styles.greenButton} onClick={() => onRemoveOrder(orderId)}>Remove</button>
            </div>
        </div>
    )
}

export default Order;