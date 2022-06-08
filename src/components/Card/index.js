import React, {useState} from 'react';
import styles from './Card.module.scss'

function Card({id, title, onClickFavorite, imageUrl, price, unit, onClickPlus}) {
    const [isAdded, setIsAdded] = useState(false);
    const [isFavorite, setFavorite] = useState(false)

    const handlePlus = () => {

        const added = !isAdded;
        onClickPlus({id, title, price, unit, imageUrl}, added);
        //isAdded ? setIsAdded(false) : setIsAdded(true);
        setIsAdded(!isAdded);
    };

    const handleFavorite = () => {
        onClickFavorite({id, title, price, unit, imageUrl});
        setFavorite(!isFavorite);
    };

    return (
        <div className={styles.card}>
            <div className={styles.favorite} onClick={handleFavorite}>
                <img src={isFavorite ? "/img/liked.svg" : "/img/unliked.svg"} alt="unliked" onClick={handleFavorite}/>
            </div>
            <img width={133} height={112} src={imageUrl} alt="Sneakers" />
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <p>Price:</p>
                    <b>{price} {unit}</b>
                </div>
                <img className={styles.plus}  onClick={handlePlus} src={ isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg" } alt="Plus" />
            </div>
        </div>
    )
}

export default Card;