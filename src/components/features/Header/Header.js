import Logo from "../../views/Logo/Logo";
import CurrentPlayer from "../CurrentPlayer/CurrentPlayer";
import styles from '../Header/Header.module.scss';

const Header = () => {

  return(
    <div className={styles.header}>
      <Logo />
      <CurrentPlayer />
    </div>
  );
};

export default Header;