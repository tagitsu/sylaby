
import styles from '../Header/Header.module.scss';
import { Link } from 'react-router-dom';

const Menu = () => {

  return(
    <div className={styles.header}>
      <ul className={styles.menu}>
            <Link to='/'>strona główna</Link>
            <Link to='/players'>lista graczy</Link>
            <Link to='/instruction'>jak grać</Link>
            <Link to='/about'>o autorze</Link>
          </ul>
    </div>
  );
};

export default Header;