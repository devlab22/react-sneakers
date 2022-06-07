import styles from './Header.module.scss'

function Header(props){
    return(
        <header className={styles.mainHeader}>
        <div className="d-flex align-center">
          <img width={40} height={40} src="/img/logo.png" alt="logo" />
          <div>
            <h3 className="text-uppercase">React Sneakers</h3>
            <p className="opacity-5">Sneakers Shop</p>
          </div>
        </div>
        <ul className="d-flex">
          <li className='cu-p' onClick={props.onClickCart}>
            <img  width={18} height={18} src="/img/cart.svg" alt="logo" />
            <span>0 €</span>
          </li>
          <li>
            <img width={18} height={18} src="/img/user.svg" alt="logo" />
          </li>
        </ul>
      </header>
    )
}

export default Header;