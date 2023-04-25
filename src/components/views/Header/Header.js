import Logo from "../Logo/Logo";
import Menu from '../Menu/Menu';
import styles from '../Header/Header.module.scss';
import { Link, useParams } from 'react-router-dom';

const Header = () => {

  return(
    <div className={styles.header}>
      <Link to='/'>
        <Logo />
      </Link>
      <Menu />
    </div>
  );
};

export default Header;