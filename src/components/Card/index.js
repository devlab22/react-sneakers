import React, {useState, useEffect} from 'react';
import styles from './Card.module.scss';
import { formateCurrency } from '../formatter'

function Card({id, title, onClickFavorite, imageUrl, price, unit, onClickPlus, added=false, favorite=false}) {
    const [isAdded, setIsAdded] = useState(added);
    const [isFavorite, setFavorite] = useState(favorite);

    const p = formateCurrency({price:price, currency:unit, displayCode:true});
    
    useEffect(() => {
        setIsAdded(added);
        setFavorite(favorite);
    }, [added, favorite]); 

    const handlePlus = () => {
        onClickPlus({id, title, price, unit, imageUrl}, !isAdded);
        setIsAdded(!isAdded);    
    };

    const handleFavorite = () => {
        onClickFavorite({id, title, price, unit, imageUrl}, !isFavorite);
        setFavorite(!isFavorite);
    };

    return (
        <div className={styles.card}>
            <div className={styles.favorite}>
                <img src={isFavorite ? "/img/liked.svg" : "/img/unliked.svg"} alt="unliked" onClick={handleFavorite}/>
            </div>
            <img width={133} height={112} src={imageUrl} alt="Sneakers" />
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <p>Price:</p>
                    <b>{p}</b>
                </div>
                <img className={styles.plus}  onClick={handlePlus} src={ isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg" } alt="Plus" />
            </div>
        </div>
    )
}

export default Card;