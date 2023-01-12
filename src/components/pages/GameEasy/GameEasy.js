import { useSelector } from "react-redux";
import { useState } from 'react';

const  GameEasy = () => {

  const { syllables } = useSelector(state => state.syllables);

  const [ randomSyllable, setRandomSyllable ] = useState('');
  const [ word, setWord ] = useState('');

  const getRandomSyllable = () => {
    const randomSyllableId = Math.floor(Math.random() * syllables.length);
    const [ randomSyllableObj ] = syllables.filter( syllable => syllable.id == randomSyllableId);
    console.log('random syl obj', randomSyllableObj);
    if(randomSyllableObj.words.length > 0) {
      setRandomSyllable(randomSyllableObj.name);
      const wordIndex = Math.floor(Math.random() * randomSyllableObj.words.length);
      console.log('index wyrazu', wordIndex);
      const word = randomSyllableObj.words[wordIndex];
      setWord(word);
      console.log('wylosowane słowo', word);
      const lastSyllable = word.substring(2);
      console.log('druga sylaba', lastSyllable);
    } else { getRandomSyllable() }
  }
  

  
  return(
    <div>
      <button onClick={() => getRandomSyllable()}>Losuj sylabę</button>
      <div>wylosowana sylaba {randomSyllable}</div>
      <div>słowo {word}</div>
    </div>
  );
};

export default  GameEasy;