import Header from './components/Header';
import CartShop from './components/CartShop';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Favorite from './pages/Favorites';
import Orders from './pages/Orders';
import AppContext from './context'
import CiscoISE from './Api';
import OrderDetails from './pages/OrderDetails';
import MyDashboard from './Dashboard'
import {formateDate} from './components/formatter';

/* const data = [
  {id:1, title: 'Nike Blazer Mid Suede', price: '120', unit: "€", imageUrl: 'img/sneakers/1.jpg' },
  {id:2, title: 'Nike Air Max 270', price: '45', unit: "€", imageUrl: 'img/sneakers/2.jpg' },
  {id:3, title: 'Nike Blazer Mid Suede', price: '35', unit: "€", imageUrl: 'img/sneakers/3.jpg' },
  {id:4, title: 'Boku Future Rider', price: '53', unit: "€", imageUrl: 'img/sneakers/4.jpg' },
  {id:5, title: 'Nike Kyrie 7', price: '55', unit: "€", imageUrl: 'img/sneakers/5.jpg' },
  {id:6, title: 'Nike LeBrone XVIII', price: '45', unit: "€", imageUrl: 'img/sneakers/6.jpg' },
  {id:7, title: 'Puma X Aka Boku Future Rider', price: '35', unit: "€", imageUrl: 'img/sneakers/7.jpg' },
  {id:8, title: 'Puma X Aka', price: '53', unit: "€", imageUrl: 'img/sneakers/8.jpg' },
  {id:9, title: 'Nike Air Max 70', price: '35', unit: "€", imageUrl: 'img/sneakers/9.jpg' },
  {id:10, title: 'Puma X Aka', price: '53', unit: "€", imageUrl: 'img/sneakers/10.jpg' }
] */
// Context

//export const AppContext = React.createContext({});
let MyCiscoIse = null;
let MyMeraki = null;

function App() {
  
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [orderId, setOrderId] = useState('');

  //const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  useEffect(() => {

    async function fetchData() {
      
      setIsLoading(true);

      try {
        const [itemsResponse, cartResponse, favoriteResponse, orderItemsResponse] = await Promise.all([
          axios.get('https://62a04d7a202ceef7086a2584.mockapi.io/items'),
          axios.get('https://62a04d7a202ceef7086a2584.mockapi.io/cart'),
          axios.get('https://62a04d7a202ceef7086a2584.mockapi.io/favorite'),
          axios.get('https://62a04d7a202ceef7086a2584.mockapi.io/orders')
        ]);

        setItems(itemsResponse.data);
        setCartItems(cartResponse.data);
        setFavoriteItems(favoriteResponse.data);
        setOrderItems(orderItemsResponse.data);
        onLogin('iseadmin', '12345', '173.21.1');

      } catch (error) {
        console.log('error by response');
      }

      setIsLoading(false);
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
        alert(error);
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
        alert(error);
      }
    }
    else {
      onRemoveFavoriteItem(obj.id);
    }

  };

  const onRemoveItem = async (id) => {

    const item = cartItems.filter(item => Number(item.id) === Number(id))[0];

    try {
      await axios.delete(`https://62a04d7a202ceef7086a2584.mockapi.io/cart/${item.key}`);
      setCartItems(prev => prev.filter(item => Number(item.id) !== Number(id)));
    } catch (error) {
      console.log(error);
      alert(error);
    }

  };

  const onRemoveFavoriteItem = async (id) => {

    const item = favoriteItems.filter(item => Number(item.id) === Number(id))[0];

    try {

      await axios.delete(`https://62a04d7a202ceef7086a2584.mockapi.io/favorite/${item.key}`);
      setFavoriteItems(prev => prev.filter(item => Number(item.id) !== Number(id)));

    } catch (error) {
      console.log(error);
      alert(error);
    }

  };

  const onBuy = async (items = []) => {

    const date = formateDate( new Date());

    try {
      const { data } = await axios.post(`https://62a04d7a202ceef7086a2584.mockapi.io/orders/`, { dateTime: date, items: items });
      //console.log(data)
      setOrderId(data.key)
      setOrderItems(prev => [...prev, data]);

      items.forEach(item => onRemoveItem(item.id))

    }
    catch (error) {
      console.log(error);
      alert(error);
    }

  };

  const onLogin = async (login, password, ipAddress) => {

    if (MyCiscoIse === null) {
      MyCiscoIse = new CiscoISE(login, password, ipAddress);
      
    }

   /*  if (MyMeraki === null){
      let apiKey = '9c990e550487dcfdcfe02e65b40f77035bd45d86';
      apiKey = '6bec40cf957de430a6f1f2baa056b99a4fac9ea0';
      MyMeraki = new MyDashboard(apiKey);
      const orgs = await MyMeraki.getOrganizations();
      console.log('organizations', orgs);
      const org = orgs[6];
      console.log('organization', org);
      const networks = await MyMeraki.getNetworks(org['id']);
      console.log('networks', networks);
    } */

  }

  const isItemInCart = (id) => {
    return cartItems.find(item => Number(item.id) === Number(id));
  };

  const isItemInFavorite = (id) => {
    return favoriteItems.find(item => Number(item.id) === Number(id));
  };

  const onCloseCart = () => {
    setCartOpened(false);
  };

  const onRemoveOrder = async (orderId) => {

    try {
      await axios.delete(`https://62a04d7a202ceef7086a2584.mockapi.io/orders/${orderId}`);
      setOrderItems(prev => prev.filter(item => Number(item.key) !== Number(orderId)));
    }
    catch (error) {
      alert(error);
      console.log(error);
    }
  };

  return (
    <AppContext.Provider value={{
      items, cartItems, favoriteItems, orderItems,  setOrderId, isItemInCart,
      isItemInFavorite, setCartOpened, orderId, onAdd2Cart, onAdd2Favorite
    }}>
      <div className='wrapper clear'>

        <CartShop items={cartItems} onCloseCart={onCloseCart} onRemoveItem={onRemoveItem} onBuy={onBuy} opened={cartOpened}/>
        <Header onClickCart={() => setCartOpened(true)} items={cartItems} favorites={favoriteItems} />

        <Routes>
          <Route path="react-sneakers" exact element={
            <Home
              items={items}
              cartItems={cartItems}
              favoriteItems={favoriteItems}
              onAdd2Cart={onAdd2Cart}
              onAdd2Favorite={onAdd2Favorite}
              isLoading={isLoading}
            />}>
          </Route>
          <Route path="react-sneakers/favorites" exact element={
            <Favorite
              cartItems={cartItems}
              favoriteItems={favoriteItems}
              onAdd2Cart={onAdd2Cart}
              onAdd2Favorite={onAdd2Favorite}
            />}>
          </Route>
          <Route path='react-sneakers/orders' exact element={
            <Orders
              items={orderItems}
              cartItems={cartItems}
              favoriteItems={favoriteItems}
              onAdd2Cart={onAdd2Cart}
              onAdd2Favorite={onAdd2Favorite}
              onRemoveOrder={onRemoveOrder}
            />
          }>
          </Route>
          <Route path='react-sneakers/orders/*' element={
            <OrderDetails />
          }>

          </Route>
        </Routes>

      </div>
    </AppContext.Provider>
  )
}

export default App;
