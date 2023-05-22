import { useState } from "react";
import { useGetPlayersQuery, useUpdatePlayerMutation, useGetLevelsQuery } from "../../../api/apiSlice";
import ActivePlayer from "../../features/ActivePlayer/ActivePlayer";
import styles from './GameNumber.module.scss';
import Button from "../../common/Button/Button";
import utils from '../../../utils/gameNumberUtils';
import levelUp from '../../../utils/levelUpUtils';

const GameNumber = () => {

  const { data: players, isSuccess: playersOK } = useGetPlayersQuery();
  const { data: levels, isSuccess: levelsOK } = useGetLevelsQuery();
  const [ updatePlayer ] = useUpdatePlayerMutation();


  let activePlayer, playerLevel, nextLevel;
  if (playersOK && levelsOK) {
    [ activePlayer ] = players.filter( player => player.isActive);
    [ playerLevel ] = levels.filter( level => activePlayer.level === level.id);
    [ nextLevel ] = levels.filter( level => activePlayer.level + 1 === level.id);
    if (activePlayer.xp >= playerLevel.nextLevel) { levelUp.levelUp(updatePlayer, activePlayer, nextLevel) }
  }

  const [ number1, setNumber1 ] = useState('');
  const [ number2, setNumber2 ] = useState('');
  const [ equationResult, setEquationResult ] = useState('');
  const [ playerAnswer, setPlayerAnswer ] = useState('');

  return(
    <div className={styles.missing}>
      <ActivePlayer />
      <section className={styles.missing__board}>
        <Button 
          content='losuj równanie' 
          onClick={() => utils.setGameTurn(setNumber1, setNumber2, setEquationResult)}
        />
        <div className={styles.missing__equation}>
          <div className={styles.missing__item}> {number1} </div>
          <div className={styles.missing__item}>+</div>
          <div className={styles.missing__item}> {number2} </div>
          <div className={styles.missing__item}>=</div>
          <input 
            className={styles.missing__item}
            defaultValue={playerAnswer}
            onChange={ (e) => setPlayerAnswer(e.target.value)}
          />
        </div>
        <Button 
          content='OK' 
          onClick={ (e) => utils.submitSolution(e, playerAnswer, equationResult, updatePlayer, activePlayer, setPlayerAnswer) }
        />
      </section>
    </div>
  );
};

export default GameNumber;