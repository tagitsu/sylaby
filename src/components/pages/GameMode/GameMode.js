import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { chooseCurrentPlayer } from '../../features/player/playerSlice';

const  GameMode = () => {
  const dispatch = useDispatch();

  const player = useParams();
  dispatch(chooseCurrentPlayer(player.id));


  return(
    <>
      <h1> GameMode</h1>
      <Link to='/player/:id/game/easy'>łatwy</Link>
      <Link to='/player/:id/game/hard'>trudny</Link>

    </>
    
  );
};

export default  GameMode;