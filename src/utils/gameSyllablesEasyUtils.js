import Button from "../components/common/Button/Button";

const utils = {};

utils.setGameTurn = (e, syllables, syllables2, setWord, setSyllable1, setSyllable1Words, setIsHidden) => {
  const randomSyllableId = Math.floor(Math.random() * syllables.length);
  const [ randomSyllableObj ] = syllables.filter( syllable => syllable.id == randomSyllableId);

  if(randomSyllableObj.words.length > 0) {
    console.log('game easy - pierwsze losowanie');
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
    console.log('game easy - ponowne losowanie');
    utils.setGameTurn(e, syllables, syllables2, setWord, setSyllable1, setSyllable1Words) 
  }

  setIsHidden(true);
};

utils.createAnswer = (e, setAnswer, syllable1) => {
  let syllable = syllable1
  e.preventDefault();
  console.log(syllable + e.target.value);
  setAnswer(`${syllable1}${e.target.value}`);
};

utils.submitSolution = (e, syllable1Words, answer, setSyllable1, setSyllable1Words, setSyllables2, setWord, setIsHidden) => {
  e.preventDefault();

  if (syllable1Words.includes(answer)) {
    console.log(`game easy - moja odpowiedź ${answer} jest poprawna`);
    /* dodaj punkty */
  } else {
    console.log(`game easy - moja odpowiedź ${answer} jest błędna`)
  }
  setSyllable1('');
  setSyllable1Words([]);
  setSyllables2([]);
  setWord('');
  setIsHidden(false);

};


export default utils;