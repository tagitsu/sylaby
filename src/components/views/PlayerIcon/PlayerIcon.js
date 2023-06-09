import styles from './PlayerIcon.module.scss';

const PlayerIcon = (props) => {

  const root = document.querySelector(':root');
  root.style.setProperty('--player-color', props.color);
  root.style.setProperty('--size', `${props.size}px`);


  return(
    <div key={props.id} className={styles.icon}>
      <div className={styles.icon__background} style={{ backgroundColor: props.color }}>
        <img className={styles.icon__image} src={`${process.env.PUBLIC_URL}/images/characters/${props.icon}`} alt={`${props.name} icon`} />
      </div>
      <div className={styles.icon__level} style={{ backgroundColor: props.color }}>
        <div className={styles.icon__levelValue}>
          {props.level}
        </div>
      </div>
    </div>
  );
};

export default PlayerIcon;