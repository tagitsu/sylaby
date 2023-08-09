import { db } from '../firebase-config';
import { query, onSnapshot, collection, doc, updateDoc, where } from 'firebase/firestore';

const appUtils = {};

appUtils.getPlayersFromUser = (userId, setPlayers) => {
  const q = query(collection(db, 'users', `${userId}`, 'players'));
  onSnapshot(q, (querySnapshot) => {
    const players = [];
    querySnapshot.forEach((doc) => {
      players.push(doc.data())
    });
    setPlayers(players);
  })
};

appUtils.getActivePlayer = (userId, setActivePlayer) => {
  const q = query(collection(db, 'users', `${userId}`, 'players'), where( 'isActive', '==', true ));
  onSnapshot(q, (querySnapshot) => {
    let activePlayer;
    querySnapshot.forEach( (doc) => {
      activePlayer = doc.data();
      setActivePlayer(activePlayer);
    });
  })
}

appUtils.inactiveAllPlayers = (players, userId) => {
  players?.map( (player) => {
    const playerRef = doc(db, 'users', `${userId}`, 'players', `${player.id}`);
    updateDoc(playerRef, { isActive: false })
  })
};

appUtils.refreshPage = () => {
  window.location.reload(false);
};

appUtils.games = [
  { name: 'dots', title: 'kolorowe bańki', difficulty: '5+', status: 'done' },
  { name: 'grocery', title: 'warzywniaczek', difficulty: '5+', status: 'done' },
  { name: 'syllables', title: 'sylaby', difficulty: '6+', status: 'done' },
  { name: 'number', title: 'mniej więcej', difficulty: '7+', status: 'done' },
  { name: 'rainbow', title: 'tęcza', difficulty: '4+', status: 'in progress' },
];


export default appUtils;