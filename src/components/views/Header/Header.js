import Logo from "../Logo/Logo";
import Auth from '../Auth/Auth';
import styles from '../Header/Header.module.scss';
import { Link } from 'react-router-dom';

const Header = () => {

  return(
    <div className={styles.header}>
      <Link to='/'>
        <Logo />
      </Link>
      <Auth />
    </div>
  );
};

export default Header;