import styles from './Info.module.scss'

function Info({imgUrl, title, description, showBtn=true, onClose}) {

    return (
        <div className={styles.cartEmpty}>
            <img className='mb-20' with="120px" height="120px" src={imgUrl} alt="empty cart"></img>
            <h2>{title}</h2>
            <p className='opacity-6'>{description}</p>
           
           {showBtn && 
            <button className={styles.greenButton} onClick={onClose}>
                <img src="img/arrow.svg" alt="Arrow"></img>
                Return
            </button>
          }
        </div>
    )
}

export default Info;
