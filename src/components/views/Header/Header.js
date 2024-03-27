import Logo from "../Logo/Logo";
import styles from '../Header/Header.module.scss';
import { Link } from 'react-router-dom';
import ActivePlayer from "../../features/ActivePlayer/ActivePlayer";
import LoginPanel from "../LoginPanel/LoginPanel";
import ProgressBar from "../../features/ProgressBar/ProgressBar";

const Header = ({ user, player }) => {

  console.log(user, player);

  return(
    <div className={styles.header}>
      <Link to='/'>
        <Logo />
      </Link>
      { player && <ActivePlayer player={player} /> }
      <LoginPanel user={user} player={player} />
    </div>
  );
};

export default Header;