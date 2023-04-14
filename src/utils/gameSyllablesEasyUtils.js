
const utils = {};

utils.setGameTurn = (e, syllables, syllables2, setWord, setSyllable1, setSyllable1Words, setHidden) => {
  const randomSyllableId = Math.floor(Math.random() * syllables.length);
  const [ randomSyllableObj ] = syllables.filter( syllable => syllable.id == randomSyllableId);

  if(randomSyllableObj.words.length > 0) {
    console.log('game easy syllables - pierwsze losowanie sylaby');
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
    console.log('game easy syllables - ponowne losowanie sylaby');
    utils.setGameTurn(e, syllables, syllables2, setWord, setSyllable1, setSyllable1Words) 
  }

  setHidden(true);
};

utils.submitSolution = (e, syllable1Words, answer, setAnswer, setSyllable1, setSyllable1Words, setSyllables2, setWord, setHidden, points, setPoints, activePlayer, updatePlayer) => {
  e.preventDefault();
  if (syllable1Words.includes(answer)) {
    let turnPoints = points + 1;
    setPoints(turnPoints);
    let playerPoints = activePlayer.xp + 1;
    updatePlayer({ ...activePlayer, xp: playerPoints });
    alert(`Stworzyłeś słowo ${answer}. To dobra odpowiedź :) Dostajesz 1 punkt! `);
  } else {
    alert(`Stworzyłeś słowo ${answer}, którego nie ma w słowniku. Spróbuj jeszcze raz :) `);
  }
  setSyllable1('');
  setSyllable1Words([]);
  setSyllables2([]);
  setWord('');
  setAnswer('')
  setHidden(false);

};

export default utils;