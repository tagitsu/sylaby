import Logo from "../../views/Logo/Logo";
import PlayerIcon from "../../views/PlayerIcon/PlayerIcon";
import styles from '../Header/Header.module.scss';

const Header = () => {

  return(
    <div className={styles.header}>
      <Logo />
      <PlayerIcon />
    </div>
  );
};

export default Header;