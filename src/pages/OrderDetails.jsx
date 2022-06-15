import Card from "../components/Card";
import React from "react";
import AppContext from "../context";

function OrderDetails() {
    const state = React.useContext(AppContext);

    const order = state.orderItems.filter(item => Number(item.key) === Number(state.orderId));
    //const items = order.items;
    console.log(order[0].items)
    const items = order[0].items

    return (
        <div className="content">
            <div className="d-flex align-center justify-between">
                <h1>Order #{state.orderId}</h1>
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