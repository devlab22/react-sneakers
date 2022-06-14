import Card from '../components/Card';

function Orders({items=[], cartItems=[], favoriteItems=[], onAdd2Cart, onAdd2Favorite}){

    return(
        <div className="content">
        <div className="d-flex align-center justify-between">
          <h1>My Orders</h1>
        </div>

        <div className="d-flex flex-wrap">
          {items
            .map(item => (
              <Card
                key={item.id}
                added={cartItems.some(obj => obj.id === item.id)}
                favorite={favoriteItems.some(obj => obj.id === item.id)}
                onClickPlus={onAdd2Cart}
                onClickFavorite={onAdd2Favorite}
                {...item}
              />
            ))}

        </div>
      </div>
    )
}

export default Orders;