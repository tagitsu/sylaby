import styles from './PlayerIcon.module.scss';

const PlayerIcon = (props) => {
  return(
    <div className={styles.icon__container}>
      <div className={styles.icon__background}>
        <img className={styles.icon__image} src={`${process.env.PUBLIC_URL}/images/${props.icon}`} alt={`${props.name} icon`} />
      </div>
    </div>
  );
};

export default PlayerIcon;