import Card from './components/Card';
import Header from './components/Header'
import CartShop from './components/CartShop'

function App() {
  return (
    <div className='wrapper clear'>

      <CartShop />
      <Header />

      <div className="content">
        <div className="d-flex align-center justify-between">
          <h1>All sneakers</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input placeholder="Search..."></input>
          </div>
        </div>

        <div className="d-flex">
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </div>
  )
}

export default App;
