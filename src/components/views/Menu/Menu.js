
import styles from '../Menu/Menu.module.scss';
import { Link } from 'react-router-dom';

const Menu = () => {

  return(
    <div>
      <ul className={styles.menu}>
        <Link to='/'>strona główna</Link>
        <Link to='/playerslist'>lista graczy</Link>
        <Link to='/howtoplay'>jak grać</Link>
        <Link to='/about'>o autorze</Link>
      </ul>
    </div>
  );
};

export default Menu;