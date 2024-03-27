import appUtils from './appUtils';
import playerUtils from './playerUtils';

const utils = {};


utils.setGameTurn = (e, syllables, syllables2, setWord, setSyllable1, setSyllable1Words) => {
  const randomSyllableId = Math.floor(Math.random() * syllables.length);
  const [ randomSyllableObj ] = syllables.filter( syllable => syllable.id == randomSyllableId);
  if(randomSyllableObj.words.length > 0) {
    setSyllable1(randomSyllableObj.name);
    setSyllable1Words(randomSyllableObj.words);
    const wordIndex = Math.floor(Math.random() * randomSyllableObj.words.length);
    const word = randomSyllableObj.words[wordIndex];
    setWord(word);
    const lastSyllable = word.substring(2);
    syllables2.push(lastSyllable);
    for (let i = 0; i < 4; i++) {
      // LOSUJE ID SYLABY
      const randomSyllableId = Math.floor(Math.random() * syllables.length);
      // WYBIERA SYLABĘ O WYLOSOWANYM ID
      const [ randomSyllableObj ] = syllables.filter( syllable => syllable.id == randomSyllableId);
      if (randomSyllableObj.name === syllables2[i]) {
        // JEŚLI TAK TO ZMIENIAM ID LOSUJĄC JESZCZE RAZ
        const changeSyllableId = Math.floor(Math.random() * syllables.length);
        const [ changeSyllableObj ] = syllables.filter( syllable => syllable.id == changeSyllableId);
        syllables2.push(changeSyllableObj.name);
      } else {
        // DODAJE NAZWĘ SYLABY DO TABLICY ZADANIA
        syllables2.push(randomSyllableObj.name);
      }
    }
  } else if(randomSyllableObj.words.length === 0){ 
    utils.setGameTurn(e, syllables, syllables2, setWord, setSyllable1, setSyllable1Words) 
  }
  syllables2.sort();
};


utils.submitSolution = (syllable1Words, answer, setAnswer, syllable1, solutionSyllable, setShowResult) => {
  setAnswer(`${syllable1}${solutionSyllable}`);
  console.log(answer, `${syllable1}${solutionSyllable}`);
  if (syllable1Words.includes(`${syllable1}${solutionSyllable}`)) {
    setShowResult('correct');
  } else {
    setShowResult('incorrect');
  }
};

utils.endGameTurn = (userId, setSyllable1, setSyllable1Words, setSyllables2, setAnswer, setWord, showResult, setShowResult) => {
  if (showResult === 'correct') {
    playerUtils.addPointToPlayer(userId);
  } else {
    console.log('nie znam takiego słowa, spróbuj jeszcze raz');
  }
  setSyllable1('');
  setSyllable1Words([]);
  setSyllables2([]);
  setWord('');
  setAnswer('')
  setShowResult('');
};

  export default utils;