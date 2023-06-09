import { useState } from "react";
import { useDrop } from "react-dnd";
import { useGetPlayersQuery, useUpdatePlayerMutation, useGetLevelsQuery } from "../../../api/apiSlice";

import utils from '../../../utils/gameNumberUtils';
import playerUtils from '../../../utils/playerUtils';

import ActivePlayer from "../../features/ActivePlayer/ActivePlayer";
import Button from "../../common/Button/Button";
import ButtonOK from '../../common/ButtonOK/ButtonOK';
import Sign from "../../common/Sign/Sign";

import clsx from "clsx";
import styles from './GameNumber.module.scss';


const GameNumber = () => {

  const { data: players, isSuccess: playersOK } = useGetPlayersQuery();
  const { data: levels, isSuccess: levelsOK } = useGetLevelsQuery();
  const [ updatePlayer ] = useUpdatePlayerMutation();

  let activePlayer, playerLevel, nextLevel;
  if (playersOK && levelsOK) {
    [ activePlayer ] = players.filter( player => player.isActive);
    [ playerLevel ] = levels.filter( level => activePlayer.level === level.id);
    [ nextLevel ] = levels.filter( level => activePlayer.level + 1 === level.id);
    if (activePlayer.xp >= playerLevel.nextLevel) { playerUtils.levelUp(updatePlayer, activePlayer, nextLevel) }
  }

  const [ number1, setNumber1 ] = useState('');
  const [ number2, setNumber2 ] = useState('');
  const [ solution, setSolution ] = useState('');
  const [ answer, setAnswer ] = useState();
  const [ isCorrect, setIsCorrect ] = useState();
  const [ isWrong, setIsWrong ] = useState();
  const [ mathSigns, setMathSigns ] = useState();
  const [ help, setHelp ] = useState(false);

  console.log('help', help);
  let help1 = [], help2 = [];

  for ( let i = 0; i < number1; i++) {
    help1.push(i);
  }
  for ( let i = 0; i < number2; i++) {
    help2.push(i);
  }

  const [ { isOverSign }, dropSign ] = useDrop({
    accept: 'sign',
    drop: (item) => {
      setAnswer([item]);
      setMathSigns([]);
      utils.submitSolution(item.name, solution, setIsCorrect, setIsWrong);
    },
    collect: monitor => ({
      isOverSign: !!monitor.isOver(),
    })
  });

  return(
    <div className={styles.number}>
      <div className={styles.number__info}>
        <ActivePlayer />
        <Button content='?' type='button' onClick={() => setHelp(!help)} />
      </div>
      <div className={styles.number__board}>
        <div className={styles.number__help}>
          {help ? help1.map( item => <div key={item} className={styles.number__item} /> ) : null}
        </div>
        <div className={styles.number__game}>
          <Button 
            content='losuj' 
            onClick={ () => utils.setGameTurn(setNumber1, setNumber2, setSolution, setAnswer, setIsCorrect, setIsWrong, setMathSigns, setHelp) }
          />
          <div className={styles.number__box}>
            <div key={1} className={styles.number__number}> {number1} </div>
            <div key={2} className={clsx(styles.number__sign, isCorrect ? styles.correct : '', isWrong ? styles.wrong : '' )} ref={dropSign}>
              { answer?.map( sign => <Sign key={sign.name} name={sign.name} icon={sign.icon}/>) }
            </div>
            <div key={3} className={styles.number__number}> {number2} </div>
          </div>
          <div className={styles.number__box}>
            { mathSigns?.map( sign => { 
              return(
                <Sign key={sign.name} name={sign.name} icon={sign.icon} />
              )}
            )}
          </div>
          <ButtonOK onClick={() => utils.addPoints(isCorrect, updatePlayer, activePlayer)}/>
        </div>
        <div className={styles.number__help}>
          {help ? help2.map( item => <div key={item} className={styles.number__item} /> ) : null}
        </div>
      </div>
    </div>
  );
};

export default GameNumber;