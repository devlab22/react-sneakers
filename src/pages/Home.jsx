import Card from '../components/Card';
import React, { useState } from 'react';

function Home({ items = [], cartItems = [], favoriteItems = [], onAdd2Cart, onAdd2Favorite, isLoading=false }) {
  const [searchValue, setSearchValue] = useState('');

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };
 
  const renderItems = () => {
    const filteredItems = items.filter(item => 
      item.title.toUpperCase().includes(searchValue.toUpperCase()));

    return (isLoading ? [...Array(15)] : filteredItems)       
      .map((item, index) => (
        <Card
          key={index}
          onClickPlus={onAdd2Cart}
          onClickFavorite={onAdd2Favorite}
          isLoading={isLoading}
          {...item}
        />  
      ))
  };

  return (
    <div className="content">
      <div className="d-flex align-center justify-between">
        <h1>{searchValue ? `Search: "${searchValue}"` : "All sneakers"}</h1>
        <div className="search-block d-flex">
          <img src="img/search.svg" alt="Search" />
          <input placeholder="Search..." value={searchValue} onChange={onChangeSearchInput}></input>
          {searchValue && <img className='clear cu-p' src='img/btn-remove.svg' alt='remove' onClick={() => setSearchValue('')} />}
        </div>
      </div>

      <div className="d-flex flex-wrap">
        {renderItems()}
      </div>
    </div>
  )
}

export default Home;