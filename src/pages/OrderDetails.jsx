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
            <div className="d-flex align-center">
                <h1 className="mb-5">Order #{orderId}</h1>
            
               {/*  <Link to='/orders'>
                  <button className="greenButton">Return</button>
                </Link> */}
               
            </div>

            <h2 className="mt-5">Date: {line['dateTime']}</h2>

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