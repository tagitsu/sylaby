import { useParams } from 'react-router-dom';
import styles from './GameMode.module.scss';
import ActivePlayer from '../../features/ActivePlayer/ActivePlayer';
import { useGetPlayersQuery } from "../../../api/apiSlice";
import GameButton from '../../common/GameButton/GameButton';

const GameMode = () => {

  const { data: players, isSuccess } = useGetPlayersQuery();
  const activePlayerParam = useParams();
  let activePlayer;
  if (isSuccess) {
      console.log('game mode', players, activePlayerParam.id);
      [ activePlayer ] = players.filter( player => player.isActive);
      console.log('game mode - active', activePlayer);
  }

  const games = [
    { name: 'rainbow', title: 'tęcza', difficulty: '4+' },
    { name: 'dots', title: 'kolorowe bańki', difficulty: '5+' },
    { name: 'grocery', title: 'warzywniaczek', difficulty: '5+' },
    { name: 'syllables', title: 'sylaby', difficulty: '6+', },
    { name: 'number', title: 'dodawanie', difficulty: '7+' },
  ];

  return(
    <div className={styles.mode}>
      <ActivePlayer activePlayer={activePlayer} />
      <h1 className={styles.mode__title}>Którą grę wybierasz?</h1>
      <div className={styles.mode__games}>
        {games.map( game => <GameButton key={game.name} game={game} activePlayerID={activePlayerParam.id} /> )}
      </div>
    </div>
    
  );
};

export default  GameMode;