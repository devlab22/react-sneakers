import styles from './CartItem.module.scss'

function CartItem(props){

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
            <b>{props.price} {props.unit}</b>
        </div>
        <img className={styles.removeBtn} src="/img/btn-remove.svg" alt="Remove" onClick={onRemoveItem}/>
    </div>
    )
}

export default CartItem;