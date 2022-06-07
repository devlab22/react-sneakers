import Card from './components/Card';
import Header from './components/Header';
import CartShop from './components/CartShop';
import React, {useState, useEffect} from 'react';
import axios from 'axios';

const data = [
  {id:1, title: 'Nike Blazer Mid Suede', price: '120', unit: "€", imageUrl: '/img/sneakers/1.jpg' },
  {id:2, title: 'Nike Air Max 270', price: '45', unit: "€", imageUrl: '/img/sneakers/2.jpg' },
  {id:3, title: 'Nike Blazer Mid Suede', price: '35', unit: "€", imageUrl: '/img/sneakers/3.jpg' },
  {id:4, title: 'Boku Future Rider', price: '53,99', unit: "€", imageUrl: '/img/sneakers/4.jpg' },
  {id:5, title: 'Nike Kyrie 7', price: '55', unit: "€", imageUrl: '/img/sneakers/5.jpg' },
  {id:6, title: 'Nike LeBrone XVIII', price: '45', unit: "€", imageUrl: '/img/sneakers/6.jpg' },
  {id:7, title: 'Puma X Aka Boku Future Rider', price: '35', unit: "€", imageUrl: '/img/sneakers/7.jpg' },
  {id:8, title: 'Puma X Aka', price: '53,99', unit: "€", imageUrl: '/img/sneakers/8.jpg' },
  {id:9, title: 'Nike Air Max 70', price: '35', unit: "€", imageUrl: '/img/sneakers/7.jpg' },
  {id:10, title: 'Puma X Aka', price: '53,99', unit: "€", imageUrl: '/img/sneakers/8.jpg' }
]

function App() {

  const [items, setItems] = useState(data);
  const [cartItems, setCartItems] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  
 /*  useEffect(() => {
    async function fetchData(){

      try {
        const [cartResponse] = await Promise.all([
          axios.get('https://60d62397943aa60017768e77.mockapi.io/items')
        ]);
        
        console.log(cartResponse);
        setItems(cartResponse.data);
      } catch(error){
        alert('error by response')
      }
    }

    fetchData();
  }) */

 /*  useEffect(() => {
    axios.get("https://restcountries.com/v2/all")
      .then(response => {
        return response.data;
      })
      .then(json => {
        //setItems(json);
        //setItems(data)
        console.log(json)
      });
  }); */

  const onAdd2Cart = (obj) => {
    obj.added ? setCartItems(prev => [...prev, obj]) : setCartItems(prev => prev.filter(item => item.id !== obj.id));
  };

  const onAdd2Favorite = (obj) => {
    console.log(obj);
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className='wrapper clear'>

      {/* { cartOpened ? <CartShop  onCloseCart={() => setCartOpened(false)} /> : null } */}
      {cartOpened && <CartShop items={cartItems} onCloseCart={() => setCartOpened(false)} />}
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
