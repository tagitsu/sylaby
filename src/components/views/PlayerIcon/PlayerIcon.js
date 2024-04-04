import clsx from 'clsx';
import styles from './PlayerIcon.module.scss';

const PlayerIcon = ({ user, player }) => {

  return(
    <img className={clsx(styles.icon)} src={`${process.env.PUBLIC_URL}/images/characters/${player?.icon}`} alt={`cartoon monster ${player?.icon} icon`} />
  );
};

export default PlayerIcon;