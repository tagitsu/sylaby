
const utils = {};

utils.shop = [
      {
        id: 1,
        title: 'tomato',
        name: 'pomidor',
        icon: 'tomato.png',
        color: 'red',
        type: 'vege'
      },
      {
        id: 2,
        title: 'cucumber',
        name: 'ogórek',
        icon: 'cucumber.png',
        color: 'green',
        type: 'vege'
      },
      {
        id: 3,
        title: 'carrot',
        name: 'marchewka',
        icon: 'carrot.png',
        color: 'orange',
        type: 'vege'
      },
      {
        id: 4,
        title: 'apple',
        name: 'jabłko',
        icon: 'apple.png',
        color: 'red',
        type: 'fruit'
      },
      {
        id: 5,
        title: 'banana',
        name: 'banan',
        icon: 'banana.png',
        color: 'yellow',
        type: 'fruit'
      },
      {
        id: 6,
        title: 'grapes',
        name: 'winogrona',
        icon: 'grape.png',
        color: 'green',
        type: 'fruit'
      },
      {
        id: 7,
        title: 'orange',
        name: 'pomarańcza',
        icon: 'orange.png',
        color: 'orange',
        type: 'fruit'
      },
      {
        id: 8,
        title: 'pepper',
        name: 'papryka',
        icon: 'pepper.png',
        color: 'yellow',
        type: 'vege'
      },
    ];

utils.setGameTurn = (setFruits, setVegetables) => {

    const amountOfFruits = Math.floor(Math.random() * 5 + 1);
    const amountOfVegetables = Math.floor(Math.random() * 5 + 1);
    const fruitColorNumber = Math.floor(Math.random() * 4);
    const vegeColorNumber = Math.floor(Math.random() * 4);

    const colors = [ 'red', 'orange', 'yellow', 'green' ];

    const fruitColor = colors[fruitColorNumber];
    const vegeColor = colors[vegeColorNumber];

    const fruit = [
      amountOfFruits,
      fruitColor,
    ];
    setFruits(fruit);

    const vege = [
      amountOfVegetables,
      vegeColor
    ];
    setVegetables(vege);

};

utils.submitSolution = (e, vegetables, fruits, cart, activePlayer, updatePlayer, setCart, setFruits, setVegetables) => {
  e.preventDefault();

  const correctAnswer = { 
    vegeAmount: vegetables[0], 
    vegeColor: vegetables[1], 
    fruitAmount: fruits[0], 
    fruitColor: fruits[1] 
  };

  let correctVegetables = 0, correctFruits = 0;

  for (let i = 0; i < cart.length; i++) {
    const cartProduct = cart[i];
    if (cartProduct.type === 'vege' && cartProduct.color === vegetables[1]) {
      correctVegetables++;
    }
    if (cartProduct.type === 'fruit' && cartProduct.color === fruits[1]) {
      correctFruits++;
    }
  }

  console.log(`prawidłowa odpowiedź`, correctAnswer);
  console.log('zawartość koszyka', cart);
  console.log(`ilość prawidłowo wrzuconych do koszyka warzyw to ${correctVegetables}`);
  console.log(`ilość prawidłowo wrzuconych do koszyka owoców to ${correctFruits}`);

  if ( vegetables[0] === correctVegetables && fruits[0] === correctFruits ) {
    console.log('punkt dla gracza');
    let playerPoints = activePlayer.xp + 1;
    updatePlayer({ ...activePlayer, xp: playerPoints });
  } else {
    console.log('bez punktu')
  }

  setCart([]);
  setFruits([]);
  setVegetables([]);

};

export default utils;