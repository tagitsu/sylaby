import Logo from "../Logo/Logo";
import Menu from '../Menu/Menu';
import CurrentPlayer from "../../features/CurrentPlayer/CurrentPlayer";
import styles from '../Header/Header.module.scss';
import { Link } from 'react-router-dom';

const Header = () => {

  return(
    <div className={styles.header}>
      <Link to='/'>
        <Logo />
      </Link>
      <Menu />
      <CurrentPlayer />

    </div>
  );
};

export default Header;