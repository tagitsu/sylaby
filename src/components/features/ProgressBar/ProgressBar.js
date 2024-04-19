import styles from '../ProgressBar/ProgressBar.module.scss';

const ProgressBar = ({ points, nextLevel }) => {

  const barWidth = (((points) / (nextLevel)) * 100) + '%';
  const root = document.querySelector(':root');
  root.style.setProperty('--player-xp', barWidth);

  return(
    <div className={styles.prog}>
      <div className={styles.prog__bar}>
        <span className={styles.prog__points}>{points}</span>
      </div>
    </div>
  );
};

export default ProgressBar;