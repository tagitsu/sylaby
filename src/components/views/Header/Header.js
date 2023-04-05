import Logo from "../Logo/Logo";
import Menu from '../Menu/Menu';
import ActivePlayer from "../../features/ActivePlayer/ActivePlayer";
import styles from '../Header/Header.module.scss';
import { Link } from 'react-router-dom';

const Header = () => {

  return(
    <div className={styles.header}>
      <Link to='/'>
        <Logo />
      </Link>
      <Menu />
      <ActivePlayer />

    </div>
  );
};

export default Header;