import Card from "../components/Card";
import React from "react";
import AppContext from "../context";

function OrderDetails() {
    const state = React.useContext(AppContext);

    //console.log(window.location.pathname);
    //const arr = window.location.pathname.split('/');
    //console.log(arr);
    //let orderId = arr[2];
    //console.log(orderId);
    //console.log('state', state)
    const orderId = state.orderId;
    //console.log(state);
    //console.log('orderId', orderId)
    const order = state.orderItems.filter(item => Number(item.key) === Number(orderId));
    console.log(order[0].items);
    let items = [];
    if (order[0].items.length > 0){
        items = order[0].items;
    } 

    console.log(items);

    return (
        <div className="content">
            <div className="d-flex align-center justify-between">
                <h1>Order #{orderId}</h1>
            </div>

            <div className="d-flex flex-wrap">
                {items
                    .map(item => (
                        <Card
                            key={item.id}
                            added={state.isItemInCart(item && item.id)}
                            favorite={state.isItemInCart(item && item.id)}

                            {...item}
                        />
                    ))}

            </div>
        </div>
    )
}

export default OrderDetails;