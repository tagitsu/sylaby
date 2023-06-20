
import styles from '../Menu/Menu.module.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Menu = () => {

  const [ toggleMenu, setToggleMenu ] = useState(false);

  console.log('menu btn', toggleMenu);
  return(
      <div className={styles.menu}>
        <button className={styles.menu__button} onClick={() => setToggleMenu(!toggleMenu)}>
          {/* <span className={styles.menu__bar} />
          <span className={styles.menu__bar} />
          <span className={styles.menu__bar} /> */}
          <FontAwesomeIcon icon={faBars} />
        </button>
        <ul className={clsx(styles.menu__list, toggleMenu && styles.active)}>
          <Link className={styles.menu__item} to='/'>strona główna</Link>
          <Link className={styles.menu__item} to='/playerslist'>lista graczy</Link>
          <Link className={styles.menu__item} to='/howtoplay'>jak grać</Link>
          <Link className={styles.menu__item} to='/about'>o autorze</Link>
        </ul>
      </div>
  );
};

export default Menu;