import Logo from "../../views/Logo/Logo";
import CurrentPlayer from "../CurrentPlayer/CurrentPlayer";
import styles from '../Header/Header.module.scss';
import { Link } from 'react-router-dom';
import { chooseCurrentPlayer } from "../../../redux/player/playerSlice";
import { useDispatch } from 'react-redux';

const Header = () => {

  const dispatch = useDispatch();
  dispatch(chooseCurrentPlayer(''));


  return(
    <div className={styles.header}>
      <Link to='/'>
        <Logo />
      </Link>
      <CurrentPlayer />
    </div>
  );
};

export default Header;