import Header from './components/Header';
import CartShop from './components/CartShop';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Favorite from './pages/Favorites';

/* const data = [
  {id:1, title: 'Nike Blazer Mid Suede', price: '120', unit: "€", imageUrl: '/img/sneakers/1.jpg' },
  {id:2, title: 'Nike Air Max 270', price: '45', unit: "€", imageUrl: '/img/sneakers/2.jpg' },
  {id:3, title: 'Nike Blazer Mid Suede', price: '35', unit: "€", imageUrl: '/img/sneakers/3.jpg' },
  {id:4, title: 'Boku Future Rider', price: '53', unit: "€", imageUrl: '/img/sneakers/4.jpg' },
  {id:5, title: 'Nike Kyrie 7', price: '55', unit: "€", imageUrl: '/img/sneakers/5.jpg' },
  {id:6, title: 'Nike LeBrone XVIII', price: '45', unit: "€", imageUrl: '/img/sneakers/6.jpg' },
  {id:7, title: 'Puma X Aka Boku Future Rider', price: '35', unit: "€", imageUrl: '/img/sneakers/7.jpg' },
  {id:8, title: 'Puma X Aka', price: '53', unit: "€", imageUrl: '/img/sneakers/8.jpg' },
  {id:9, title: 'Nike Air Max 70', price: '35', unit: "€", imageUrl: '/img/sneakers/7.jpg' },
  {id:10, title: 'Puma X Aka', price: '53', unit: "€", imageUrl: '/img/sneakers/8.jpg' }
] */

function App() {
  // https://restcountries.com/v2/all
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);

  useEffect(() => {
    async function fetchData() {

      try {
        const [itemsResponse, cartResponse, favoriteResponse] = await Promise.all([
          axios.get('https://62a04d7a202ceef7086a2584.mockapi.io/items'),
          axios.get('https://62a04d7a202ceef7086a2584.mockapi.io/cart'),
          axios.get('https://62a04d7a202ceef7086a2584.mockapi.io/favorite')
        ]);

        setItems(itemsResponse.data);
        setCartItems(cartResponse.data);
        setFavoriteItems(favoriteResponse.data);

      } catch (error) {
        console.log('error by response');
      }
    }

    fetchData();
  }, []);

  async function onAdd2Cart(obj, added) {

    if (added) {
      try {
        const res = await axios.post(`https://62a04d7a202ceef7086a2584.mockapi.io/cart/`, obj);
        setCartItems(prev => [...prev, res.data]);
      }
      catch (error) {
        console.log(error);
      }
    }
    else {
      onRemoveItem(obj.id);
    }

  };

  async function onAdd2Favorite(obj, added) {

    if (added) {
      try {
        const res = await axios.post(`https://62a04d7a202ceef7086a2584.mockapi.io/favorite/`, obj);
        setFavoriteItems(prev => [...prev, res.data]);
      }
      catch (error) {
        console.log(error);
      }
    }
    else {
      onRemoveFavoriteItem(obj.id);
    }

  };

  const onRemoveItem = (id) => {

    const item = cartItems.filter(item => item.id === id)[0];

    try {
      axios.delete(`https://62a04d7a202ceef7086a2584.mockapi.io/cart/${item.key}`)
      setCartItems(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.log(error);
    }

  };

  const onRemoveFavoriteItem = (id) => {

    const item = favoriteItems.filter(item => item.id === id)[0];

    try {

      axios.delete(`https://62a04d7a202ceef7086a2584.mockapi.io/favorite/${item.key}`)
      setFavoriteItems(prev => prev.filter(item => item.id !== id));

    } catch (error) {
      console.log(error);
    }

  };

  return (
    <div className='wrapper clear'>

      {cartOpened && <CartShop items={cartItems} onCloseCart={() => setCartOpened(false)} onRemoveItem={onRemoveItem} />}
      <Header onClickCart={() => setCartOpened(true)} items={cartItems} />

      <Routes>
        <Route path="/" exact element={
          <Home
            items={items}
            cartItems={cartItems}
            favoriteItems={favoriteItems}
            onAdd2Cart={onAdd2Cart}
            onAdd2Favorite={onAdd2Favorite}
          />}>
        </Route>
        <Route path="/favorites" exact element={
          <Favorite
            cartItems={cartItems}
            favoriteItems={favoriteItems}
            onAdd2Cart={onAdd2Cart}
            onAdd2Favorite={onAdd2Favorite}
          />}>
        </Route>
      </Routes>

    </div>
  )
}

export default App;
