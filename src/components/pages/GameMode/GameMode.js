import { Link } from 'react-router-dom';

const  GameMode = () => {
  return(
    <>
      <h1> GameMode</h1>
      <Link to='/player/:id/game/easy'>łatwy</Link>
      <Link to='/player/:id/game/hard'>trudny</Link>

    </>
    
  );
};

export default  GameMode;