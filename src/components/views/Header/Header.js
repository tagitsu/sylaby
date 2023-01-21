import Logo from "../Logo/Logo";
import CurrentPlayer from "../../features/CurrentPlayer/CurrentPlayer";
import styles from '../Header/Header.module.scss';
import { Link } from 'react-router-dom';

const Header = () => {

  return(
    <div className={styles.header}>
      <Link to='/'>
        <Logo />
      </Link>
      {/* <CurrentPlayer /> */}
    </div>
  );
};

export default Header;