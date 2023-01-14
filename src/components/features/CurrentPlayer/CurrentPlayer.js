import { useSelector } from "react-redux";
import PlayerIcon from "../../views/PlayerIcon/PlayerIcon";

const CurrentPlayer = () => {

  const currentPlayer = useSelector(state => state.player.currentPlayer);
  const { players } = useSelector(state => state.player);
  const [player] = players.filter( player => player.id === currentPlayer);

  if(!player) {
    return(null);
  } else {
    return(
    <div>
      <PlayerIcon icon={player.icon} name={player.name} />
      <p>{player.xp}</p>
    </div>
    );
  }
  
};

export default CurrentPlayer;