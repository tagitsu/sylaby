import { useParams } from "react-router";
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PlayerIcon from "../../views/PlayerIcon/PlayerIcon";

const PlayerProfile = () => {
  const choosenPlayer = useParams();
  console.log('Player profile - param id', choosenPlayer.id);
  const { players } = useSelector(state => state.players);
  console.log('player profile - players', players);
  const player = players.filter( player => player.id === choosenPlayer.id)
  console.log('Player Profile - player', player);

  return(
    <div>
      <h1>Karta postaci</h1>
      {player.map(player => 
      <div key={player.id}>
        <PlayerIcon icon={player.icon} name={player.name} />
        <p>Imię gracza: {player.name}</p>
        <p>LVL: {player.level}</p>
        <div></div>
        <div>Odznaki: {player.badges.map( badge => <FontAwesomeIcon icon={badge} />)}</div>
      </div>
      )}
    </div>
    
  );
};

export default PlayerProfile;