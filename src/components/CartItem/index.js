import styles from './CartItem.module.scss';
import { formateCurrency } from '../formatter';

function CartItem(props){
    
    const p = formateCurrency({price:props.price, currency:props.unit, displayCode:true});
    
    const onRemoveItem = () =>{
        props.onRemoveItem(props.id)
    };
    
    return(
        <div className={styles.cartItem}>
        <div style={{ backgroundImage: `url(${props.imageUrl})` }} 
             className={styles.cartItemImg}>    
        </div>
        <div className="mr-20 flex">
            <p className="mb-5">{props.title}</p>
            <b>{p}</b>
        </div>
        <img className={styles.removeBtn} src="/img/btn-remove.svg" alt="Remove" onClick={onRemoveItem}/>
    </div>
    )
}

export default CartItem;