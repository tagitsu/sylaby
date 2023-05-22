
const utils = {};

utils.setGameTurn = (setDots, setHidden, setOptions) => {

  const randomNumber = Math.floor(Math.random() * 9 + 1);
    const dots = [];
    for ( let i = 1; i <= randomNumber; i++ ) {
      const randomSize = Math.floor(Math.random() * 80 + 50);
      const randomColorR = Math.floor(Math.random() * 255 + 150);
      const randomColorG = Math.floor(Math.random() * 255 + 150);
      const randomColorB = Math.floor(Math.random() * 255 + 150);
      const randomPositionTop = Math.floor(Math.random() * 70);
      const randomPositionLeft = Math.floor(Math.random() * 70);
      const dotTop = `${randomPositionTop}%`;
      const dotLeft = `${randomPositionLeft}%`;
      const dotColor = `rgb(${randomColorR}, ${randomColorG}, ${randomColorB})`;
      const dotSize = `${randomSize}px`;
      dots.push({ id: i, color: dotColor, size: dotSize, top: dotTop, left: dotLeft });
    }
  setDots(dots);
  setHidden(false);

  const options = [];
  const randomNumber2 = Math.floor(Math.random() * 9 + 1);
  const randomNumber3 = Math.floor(Math.random() * 9 + 1);
  alert(`Liczba baniek to ${randomNumber}, a pozostałe opcje to ${randomNumber2} i ${randomNumber3}`);
  options.push(randomNumber, randomNumber2, randomNumber3);
  options.sort();
  setOptions(options);
};

utils.submitSolution = (
  e, 
  answer, 
  dots, 
  setDots, 
  activePlayer, 
  updatePlayer, 
  setOptions
  ) => {

  e.preventDefault();

  if ( answer == dots.length ) {
    // TODO zamiast alertów chciałabym użyć portalu / modalu 
    alert(`Brawo! Na planszy widać ${answer} kropek. Zdobywasz punkt :)`);
    let playerPoints = activePlayer.xp + 1;
    updatePlayer({ ...activePlayer, xp: playerPoints })
  } else if ( answer < dots.length ) {
      alert(`Na planszy znajduje się ${dots.length} kropek, a Twoja odpowiedź to ${answer}. Może któraś się schowała? Spróbuj jeszcze raz :)`)
  } else if ( answer > dots.length ) {
      alert(`Na planszy znajduje się ${dots.length} kropek, a Twoja odpowiedź to ${answer}. Może któraś kropka została policzona podwójnie? Spróbuj jeszcze raz :)`)

  }
  setDots([]);
  setOptions([]);

};

export default utils;