import Card from './components/Card';
import Header from './components/Header';
import CartShop from './components/CartShop';
import React, {useState, useEffect} from 'react';
import axios from 'axios';

const data = [
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
]

function App() {
// https://restcountries.com/v2/all
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  
  useEffect(() => {
    async function fetchData(){

      try {
        const [itemsResponse, cartResponse, favoriteResponse] = await Promise.all([
          axios.get('https://62a04d7a202ceef7086a2584.mockapi.io/items'),
          axios.get('https://62a04d7a202ceef7086a2584.mockapi.io/cart'),
          axios.get('https://62a04d7a202ceef7086a2584.mockapi.io/favorite')
        ]);
        
        setItems(itemsResponse.data);
        setCartItems(cartResponse.data);
        setFavoriteItems(favoriteResponse.data);
      } catch(error){
        console.log('error by response');
      }
    }

    fetchData();
  }, []);

  async function onAdd2Cart(obj, added){

    if (added){
      const res = await axios.post(`https://62a04d7a202ceef7086a2584.mockapi.io/cart/`, obj);
      setCartItems(prev => [...prev, res.data]);
    }
    else{
      onRemoveItem(obj.id);
      setCartItems(prev => prev.filter(item => item.id !== obj.id ));
    }
       
  };

  async function onAdd2Favorite(obj, added){

    if (added){
      const res = await axios.post(`https://62a04d7a202ceef7086a2584.mockapi.io/favorite/`, obj);
      setFavoriteItems(prev => [...prev, res.data]);
    }
    else{
      onRemoveFavoriteItem(obj.id);
      setFavoriteItems(prev => prev.filter(item => item.id !== obj.id ));
    }

  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const onRemoveItem = (id) => {

    //console.log(id);
    //console.log(cartItems);
    const item = cartItems.filter(item => item.id === id)[0];
    //console.log(item);
    axios.delete(`https://62a04d7a202ceef7086a2584.mockapi.io/cart/${item.key}`)
    setCartItems(prev => prev.filter(item => item.id !== id));
    setItems(prev => prev);
  };

  const onRemoveFavoriteItem = (id) => {

    const item = favoriteItems.filter(item => item.id === id)[0];
    axios.delete(`https://62a04d7a202ceef7086a2584.mockapi.io/favorite/${item.key}`)
    setFavoriteItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className='wrapper clear'>

      {/* { cartOpened ? <CartShop  onCloseCart={() => setCartOpened(false)} /> : null } */}
      {cartOpened && <CartShop items={cartItems} onCloseCart={() => setCartOpened(false)} onRemoveItem={onRemoveItem} />}
      <Header onClickCart={() => setCartOpened(true)} />

      <div className="content">
        <div className="d-flex align-center justify-between">
          <h1>{searchValue ? `Search: "${searchValue}"` : "All sneakers"}</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input placeholder="Search..." value={searchValue} onChange={onChangeSearchInput}></input>
            { searchValue && <img className='clear cu-p' src='/img/btn-remove.svg' alt='remove' onClick={() => setSearchValue('')}/>}
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {items
          .filter(item => item.title.toUpperCase().includes(searchValue.toUpperCase()))
          .map(item => (
             <Card
              key={item.id}
              id={item.id}
              title={item.title}
              price={item.price}
              unit={item.unit}
              added={cartItems.filter(obj => obj.id === item.id).length > 0 ? true : false}
              imageUrl={item.imageUrl}
              onClickPlus={onAdd2Cart}
              onClickFavorite={onAdd2Favorite}
            />
          ))}

        </div>
      </div>
    </div>
  )
}

export default App;
