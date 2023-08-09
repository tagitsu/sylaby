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
      const randomSyllableId = Math.floor(Math.random() * syllables.length);
      const [ randomSyllableObj ] = syllables.filter( syllable => syllable.id == randomSyllableId);
      syllables2.push(randomSyllableObj.name);
    }
    syllables2.sort();
  } else if(randomSyllableObj.words.length === 0){ 
    utils.setGameTurn(e, syllables, syllables2, setWord, setSyllable1, setSyllable1Words) 
  }
};

utils.submitSolution = (syllable1Words, answer, setAnswer, setSyllable1, setSyllable1Words, setSyllables2, setWord, userId, activePlayerId) => {
  if (syllable1Words.includes(answer)) {
    playerUtils.addPointToPlayer(userId, activePlayerId);
  }
  setSyllable1('');
  setSyllable1Words([]);
  setSyllables2([]);
  setWord('');
  setAnswer('')
};

export default utils;