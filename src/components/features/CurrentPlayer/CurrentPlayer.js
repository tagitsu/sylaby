import { useSelector } from "react-redux";
import PlayerIcon from "../../views/PlayerIcon/PlayerIcon";

const CurrentPlayer = () => {

  const currentPlayer = useSelector(state => state.player.currentPlayer);
  console.log('current player number', currentPlayer);
  const { players } = useSelector(state => state.player);
  console.log('all of players', players);
  const [player] = players.filter( player => player.id === currentPlayer);
  console.log('player data', player);

  if(!player) {
    return(null);
  } else {
    return(
    <div>
      <PlayerIcon icon={player.icon} name={player.name} />
    </div>
    );
  }
  
};

export default CurrentPlayer;