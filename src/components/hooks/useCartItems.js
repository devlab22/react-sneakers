import AppContext from "../../context";
import React from 'react';
import { formateCurrency } from "../formatter";

export const useCart = () => {
    const {cartItems, setCartItems} = React.useContext(AppContext);
    const totalPrice = cartItems.reduce((sum, obj) => parseFloat(obj.price) + sum, 0);
    const formatedPrice = formateCurrency({ price: totalPrice, displayCode: true });

    return { cartItems, setCartItems, totalPrice, formatedPrice };
}

