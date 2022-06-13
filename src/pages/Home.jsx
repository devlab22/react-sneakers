import Card from '../components/Card';
import React, { useState } from 'react';

function Home({items=[], cartItems=[], favoriteItems=[], onAdd2Cart, onAdd2Favorite}){
    const [searchValue, setSearchValue] = useState('');

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value);
      };

    return(
        <div className="content">
        <div className="d-flex align-center justify-between">
          <h1>{searchValue ? `Search: "${searchValue}"` : "All sneakers"}</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input placeholder="Search..." value={searchValue} onChange={onChangeSearchInput}></input>
            {searchValue && <img className='clear cu-p' src='/img/btn-remove.svg' alt='remove' onClick={() => setSearchValue('')} />}
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {items
            .filter(item => item.title.toUpperCase().includes(searchValue.toUpperCase()))
            .map(item => (
              <Card
                key={item.id}
                added={cartItems.filter(obj => obj.id === item.id).length > 0 ? true : false}
                favorite={favoriteItems.filter(obj => obj.id === item.id).length > 0 ? true : false}
                onClickPlus={onAdd2Cart}
                onClickFavorite={onAdd2Favorite}
                {...item}
              />
            ))}

        </div>
      </div>
    )
}

export default Home;