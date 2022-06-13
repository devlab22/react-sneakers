import Card from '../components/Card';

function Favorite({cartItems=[], favoriteItems=[], onAdd2Cart, onAdd2Favorite}){

    return(
        <div className="content">
        <div className="d-flex align-center justify-between">
          <h1>My Favorites</h1>
        </div>

        <div className="d-flex flex-wrap">
          {favoriteItems
            .map(item => (
              <Card
                key={item.id}
                added={cartItems.filter(obj => obj.id === item.id).length > 0 ? true : false}
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