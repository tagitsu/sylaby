import { useState, useEffect } from 'react';
import styles from './GameMode.module.scss';
import ActivePlayer from '../../features/ActivePlayer/ActivePlayer';
import GameButton from '../../common/GameButton/GameButton';
import appUtils from '../../../utils/appUtils';

const GameMode = ({ user }) => {

  const [ activePlayer, setActivePlayer ] = useState();

  useEffect( () => {
    appUtils.getActivePlayer(user, setActivePlayer);
  }, [user]);

  return(
    <div className={styles.mode}>
      <ActivePlayer user={user} activePlayer={activePlayer} />
      <h1 className={styles.mode__title}>Którą grę wybierasz?</h1>
      <div className={styles.mode__games}>
        {appUtils.games.map( game => <GameButton key={game.name} game={game} id={activePlayer?.id} /> )}
      </div>
    </div>
  );
};

export default  GameMode;