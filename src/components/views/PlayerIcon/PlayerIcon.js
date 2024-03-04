import clsx from 'clsx';
import styles from './PlayerIcon.module.scss';

const PlayerIcon = ({ user, player }) => {

  return(
    <div key={user.id} className={styles.icon}>
      <div className={styles.icon__background}>
        <img className={clsx(styles.icon__image)} src={`${process.env.PUBLIC_URL}/images/characters/${player.icon}`} alt={`cartoon monster ${user.icon} icon`} />
      </div>
    </div>
  );
};

export default PlayerIcon;