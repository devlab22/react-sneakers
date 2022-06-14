import styles from './Header.module.scss';
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { formateCurrency } from '../formatter'

function Header({ onClickCart, items = [] }) {
  const [amount, setAmount] = useState(0)
  let price = 0;
  items.forEach(item => {
    price += parseFloat(item.price);
  });

  useEffect(() => {
    const p = formateCurrency({ price: price, displayCode: true });
    setAmount(p);
  }, [price]);

  return (
    <header className={styles.mainHeader}>
      <Link to="/">
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
          <img width={18} height={18} src="/img/cart.svg" alt="logo" />
          <span>{amount}</span>
        </li>
        <li className='cu-p mr-30'>
          <Link to="/favorites">
            <img width={18} height={18} src="/img/heart.svg" alt="heart" />
          </Link>
        </li>
        <Link to='/orders'>
          <li>
            <img width={18} height={18} src="/img/user.svg" alt="user" />
          </li>
        </Link>

      </ul>
    </header>
  )
}

export default Header;