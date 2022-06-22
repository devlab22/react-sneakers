import Card from "../components/Card";
import React from "react";
import AppContext from "../context";
import { Link } from 'react-router-dom';

function OrderDetails() {
    const state = React.useContext(AppContext);

    const arr = window.location.pathname.split('/');
    let orderId = arr[arr.length -1];
    const order = state.orderItems.filter(item => Number(item.key) === Number(orderId));
    const line = order[0];
    let items = [];
    if ('items' in line){
        items = line['items'];
    }

    return (
        <div className="content">
            <div className="d-flex align-center justify-between">
                <h1 className="mt-30">Order #{orderId}</h1>
                <h1 className="mt-30">Date: {line['dateTime']}</h1>
                <Link to='react-sneakers/orders/'>
                  <button className="greenButton">Return</button>
                </Link>
               
            </div>



            <div className="d-flex flex-wrap">
                {items
                    .map(item => (
                        <Card
                            key={item.id}
                            added={state.isItemInCart(item && item.id)}
                            favorite={state.isItemInCart(item && item.id)}
                            onClickPlus={state.onAdd2Cart}
                            {...item}
                        />
                    ))}

            </div>
        </div>
    )
}

export default OrderDetails;