
const utils = {};

utils.setGameTurn = (e, syllables, syllables2, setWord, setSyllable1, setSyllable1Words) => {
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
};

utils.createAnswer = (e, answers, setAnswers, syllable1) => {
  if(e.target.checked) {
    console.log('game easy - to jest zaznaczona odpowiedź', e.target.value);
    setAnswers( answers => [...answers, `${syllable1}${e.target.value}`]);
  } else {
    const uncheckedAnswer = `${syllable1}${e.target.value}`;
    setAnswers( answers.filter( el => el !== uncheckedAnswer));
  }
};

export default utils;