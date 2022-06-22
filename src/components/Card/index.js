import React, { useState, useEffect, useContext } from 'react';
import styles from './Card.module.scss';
import { formateCurrency } from '../formatter';
import LoadingCard from '../LoadingCard';
import AppContext from '../../context';

function Card({ id, title, onClickFavorite, imageUrl, price, unit, onClickPlus, added = false, favorite = false, isLoading=false }) {
    //const [isAdded, setIsAdded] = useState(added);
    //const [isFavorite, setFavorite] = useState(favorite);
    const state = useContext(AppContext);
    const p = formateCurrency({ price: price, currency: unit, displayCode: true });

   /*  useEffect(() => {
        setIsAdded(added);
        setFavorite(favorite);
    }, [added, favorite]); */

    const handlePlus = () => {
        onClickPlus({ id, title, price, unit, imageUrl }, !state.isItemInCart(id));
        //state.onAdd2Cart({ id, title, price, unit, imageUrl }, !state.isItemInCart(id));
        //setIsAdded(!isAdded);
    };

    const handleFavorite = () => {
        //onClickFavorite({ id, title, price, unit, imageUrl }, !state.isItemInFavorite(id));
        state.onAdd2Favorite({ id, title, price, unit, imageUrl }, !state.isItemInFavorite(id))
        //setFavorite(!isFavorite);
    };

    return (

        isLoading ? <LoadingCard key={id}/> :
        <div className={styles.card}>

            <div className={styles.favorite}>
                <img src={state.isItemInFavorite(id) ? "img/liked.svg" : "img/unliked.svg"} alt="unliked" onClick={handleFavorite} />
            </div>
            <img width="90%" height="auto" src={imageUrl} alt="Sneakers" />
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <p>Price:</p>
                    <b>{p}</b>
                </div>
                {onClickPlus && <img className={styles.plus} onClick={handlePlus} src={state.isItemInCart(id) ? "img/btn-checked.svg" : "img/btn-plus.svg"} alt="Plus" />}
            </div>

        </div> 
    )
}

export default Card;