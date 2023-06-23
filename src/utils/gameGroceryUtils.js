
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
      {
        id: 9,
        title: 'chilli',
        name: 'papryka ostra',
        icon: 'chilli.png',
        color: 'red',
        type: 'vege'
      },
      {
        id: 10,
        title: 'onion',
        name: 'szczypiorek',
        icon: 'onion.png',
        color: 'green',
        type: 'vege'
      },
      {
        id: 11,
        title: 'watermelon',
        name: 'arbuz',
        icon: 'watermelon.png',
        color: 'green',
        type: 'fruit'
      },
      {
        id: 12,
        title: 'lemon',
        name: 'cytryna',
        icon: 'lemon.png',
        color: 'yellow',
        type: 'fruit'
      },
      {
        id: 13,
        title: 'lime',
        name: 'limonka',
        icon: 'lime.png',
        color: 'green',
        type: 'fruit'
      },
      {
        id: 14,
        title: 'strawberry',
        name: 'truskawka',
        icon: 'strawberry.png',
        color: 'red',
        type: 'fruit'
      },
      {
        id: 15,
        title: 'raspberry',
        name: 'malina',
        icon: 'raspberry.png',
        color: 'red',
        type: 'fruit'
      },
      {
        id: 16,
        title: 'melon',
        name: 'melon',
        icon: 'melon.png',
        color: 'yellow',
        type: 'fruit'
      },
      {
        id: 17,
        title: 'lettuce',
        name: 'sałata',
        icon: 'lettuce.png',
        color: 'green',
        type: 'vege'
      },
      {
        id: 18,
        title: 'tangerine',
        name: 'mandarynka',
        icon: 'tangerine.png',
        color: 'orange',
        type: 'fruit'
      },
      {
        id: 19,
        title: 'pumpkin',
        name: 'dynia',
        icon: 'pumpkin.png',
        color: 'orange',
        type: 'vege'
      },
    ];

utils.setGameTurn = (setFruits, setVegetables, setHidden) => {

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

    setHidden(true);
};

utils.submitSolution = (e, vegetables, fruits, cart, activePlayer, updatePlayer, setCart, setFruits, setVegetables, setHidden) => {
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
  setHidden(false);
};

export default utils;