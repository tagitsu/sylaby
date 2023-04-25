
import styles from '../Menu/Menu.module.scss';
import { Link } from 'react-router-dom';

const Menu = () => {

  return(
    <div>
      <ul className={styles.menu}>
        <Link className={styles.menu__item} to='/'>strona główna</Link>
        <Link className={styles.menu__item} to='/playerslist'>lista graczy</Link>
        <Link className={styles.menu__item} to='/howtoplay'>jak grać</Link>
        <Link className={styles.menu__item} to='/about'>o autorze</Link>
      </ul>
    </div>
  );
};

export default Menu;