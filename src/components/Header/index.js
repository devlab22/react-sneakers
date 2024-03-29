import styles from './Header.module.scss';
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import {useCart} from '../hooks/useCartItems';

function Header({ onClickCart, items = [], favorites= [], onSetToken=Function.prototype }) {
  const [amount, setAmount] = useState(0)
  const { formatedPrice } = useCart();

  useEffect(() => {
    setAmount(formatedPrice);
  }, [formatedPrice]);

  return (
    <header className={styles.mainHeader}>
      <Link to="">
        <div className="d-flex align-center">
          <img width={40} height={40} src="/img/logo.png" alt="logo" />
          <div>
            <h3 className="text-uppercase">React Sneakers</h3>
            <p className="opacity-5">Sneakers Shop</p>
          </div>
        </div>
      </Link>
      <ul className="d-flex">
        <li className='cu-p mr-30' onClick={onClickCart}>
          <img width={18} height={18} src="/img/cart.svg" alt="cart" />
          <span>{amount}</span>
        </li>
        <li className='cu-p mr-20'>
          <Link to="/favorites">
            <img height={24} width={24} src={ favorites.length > 0 ? "/img/heart.svg" : "/img/heart.svg"} alt="heart" />
          </Link>
        </li>
        <Link to='/orders'>
          <li>
            <img width={18} height={18} src="/img/user.svg" alt="user" />
          </li>
        </Link>
        <button
          onClick={onSetToken}
          className='greenButton'
        >
          create token
        </button>

      </ul>
    </header>
  )
}

export default Header;