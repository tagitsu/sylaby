import styles from '../ProgressBar/ProgressBar.module.scss';

const ProgressBar = (props) => {

  const barWidth = (((props.xp) / (props.levelUp)) * 100) + '%';
  const root = document.querySelector(':root');
  root.style.setProperty('--player-xp', barWidth);

  return(
    <div className={styles.prog}>
      <div className={styles.prog__bar} />
      <p className={styles.prog__points}>{props.content}</p>
    </div>
  );
};

export default ProgressBar;