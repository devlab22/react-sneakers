import { useContext } from 'react';
import Card from '../components/Card';
import AppContext  from '../context'

function Favorite({cartItems=[], favoriteItems=[], onAdd2Cart, onAdd2Favorite}){
    const state = useContext(AppContext);
    //console.log(state)
    return(
        <div className="content">
        <div className="d-flex align-center justify-between">
          <h1>My Favorites</h1>
        </div>

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
      </div>
    )
}

export default Favorite;