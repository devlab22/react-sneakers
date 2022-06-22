import Info from '../components/Info';
import Order from '../components/Order';
import React from 'react';

function Orders({ items = [], cartItems = [], favoriteItems = [], onAdd2Cart, onAdd2Favorite, onRemoveOrder }) {
  

  return (
    <div className="content">
      <div className="d-flex align-center justify-between">
        <h1>My Orders</h1>
      </div>

      {items.length > 0 ? (
        <div className="d-flex flex-wrap">
          {items
            .map(item => (
              <Order
                key={item.key}
                orderId={item.key}
                onRemoveOrder={onRemoveOrder}
                {...item}
              />
            ))}

        </div>
      ) : (
        <Info
          imgUrl="img/empty-cart.jpg"
          title="No Orders"
          showBtn={false}
        />
      )
      }
    </div>
  )
}

export default Orders;