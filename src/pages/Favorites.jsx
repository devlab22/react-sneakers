import { useContext } from 'react';
import Card from '../components/Card';
import AppContext from '../context';
import Info from '../components/Info';

function Favorite({ cartItems = [], favoriteItems = [], onAdd2Cart, onAdd2Favorite }) {
  const state = useContext(AppContext);
  
  return (
    <div className="content">
      <div className="d-flex align-center justify-between">
        <h1>My Favorites</h1>
      </div>

      {
        state.favoriteItems.length > 0 ? (
          <div className="d-flex flex-wrap">
            {state.favoriteItems
              .map(item => (
                <Card
                  key={item.id}
                  added={state.isItemInCart(item && item.id)}
                  favorite={true}
                  onClickPlus={onAdd2Cart}
                  onClickFavorite={onAdd2Favorite}
                  {...item}
                />
              ))}

          </div>
        ) : (
          <Info
            imgUrl="img/empty-cart.jpg"
            title="Empty Favorite"
            description="Add a sneaker"
            showBtn={false}
          />
        )
        }
    </div>
  )
}

export default Favorite;