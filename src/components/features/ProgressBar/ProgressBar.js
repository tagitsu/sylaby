import styles from '../ProgressBar/ProgressBar.module.scss';
import { useGetPlayersQuery } from "../../../api/apiSlice";

const ProgressBar = (props) => {

  const { data: players, isSuccess: playersOK } = useGetPlayersQuery();
  
  let activePlayer;
  if (playersOK) {
    [ activePlayer ] = players.filter( player => player.isActive)
  }

  const barWidth = (((props.xp) / (props.levelUp)) * 100) + '%';
  const root = document.querySelector(':root');
  root.style.setProperty('--player-xp', barWidth);
  root.style.setProperty('--player-color', activePlayer.color);

  return(
    <div className={styles.prog}>
      <div className={styles.prog__container}>
        <div className={styles.prog__bar}>
          <span className={styles.prog__points}>{props.content}</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;