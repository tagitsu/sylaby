
const utils = {};

utils.getRandomSyllable = (e, syllables, randomLastSyllables, setWord, setRandomFirstSyllable, setFirstSyllableWords) => {
  const randomSyllableId = Math.floor(Math.random() * syllables.length);
  const [ randomSyllableObj ] = syllables.filter( syllable => syllable.id == randomSyllableId);

  if(randomSyllableObj.words.length > 0) {
    console.log('game easy - pierwsze losowanie');
    setRandomFirstSyllable(randomSyllableObj.name);
    setFirstSyllableWords(randomSyllableObj.words);
    const wordIndex = Math.floor(Math.random() * randomSyllableObj.words.length);
    const word = randomSyllableObj.words[wordIndex];
    setWord(word);
    const lastSyllable = word.substring(2);
    randomLastSyllables.push(lastSyllable);
    for (let i = 0; i < 4; i++) {
      const randomSyllableId = Math.floor(Math.random() * syllables.length);
      const [ randomSyllableObj ] = syllables.filter( syllable => syllable.id == randomSyllableId);
      randomLastSyllables.push(randomSyllableObj.name);
    }
    randomLastSyllables.sort();
  } else if(randomSyllableObj.words.length === 0){ 
    console.log('game easy - ponowne losowanie');
    utils.getRandomSyllable(e, syllables, randomLastSyllables, setWord, setRandomFirstSyllable, setFirstSyllableWords) 
  }
  //console.log('po kliknięciu na losowanie - to jest e.target', e.target, e.target.setAttribute('disabled', true));
};

utils.createAnswer = (e, answers, setAnswers, randomFirstSyllable) => {
  if(e.target.checked) {
    console.log('game easy - to jest zaznaczona odpowiedź', e.target.value);
    setAnswers( answers => [...answers, `${randomFirstSyllable}${e.target.value}`]);
  } else {
    const uncheckedAnswer = `${randomFirstSyllable}${e.target.value}`;
    setAnswers( answers.filter( el => el !== uncheckedAnswer));
  }
};




export default utils;
