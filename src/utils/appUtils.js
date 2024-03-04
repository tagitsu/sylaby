import { db } from '../firebase-config';
import { query, onSnapshot, collection, doc, getDoc, updateDoc, where } from 'firebase/firestore';

const appUtils = {};

// appUtils.getPlayersFromUser = (userId, setPlayers) => {
//   const q = query(collection(db, 'users', `${userId}`, 'players'));
//   onSnapshot(q, (querySnapshot) => {
//     const players = [];
//     querySnapshot.forEach((doc) => {
//       players.push(doc.data())
//     });
//     setPlayers(players);
//   })
// };

appUtils.getPlayerFromUser = async (userId, setPlayer) => {

  const docRef = doc(db, 'users', `${userId}`);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    //console.log("Document data:", docSnap.data());
    setPlayer(docSnap.data());
  } else {
    //console.log("No such document!");
  }
};

appUtils.getPointsFromUser = async (userId, setPoints) => {

  onSnapshot(doc(db, 'users', `${userId}`), (doc) => {
    console.log("points: ", doc.data().points);
    setPoints(doc.data().points);
  })

  // if (docSnap.exists()) {
  //   const player = docSnap.data();
  //   console.log("Document data:", player);
  //   //setPoints(docSnap.data());
  // } else {
  //   // docSnap.data() will be undefined in this case
  //   console.log("No such document!");
  // }
};


// appUtils.getActivePlayer = (userId, setActivePlayer) => {
//   const q = query(collection(db, 'users', `${userId}`, 'players'), where( 'isActive', '==', true ));
//   onSnapshot(q, (querySnapshot) => {
//     let activePlayer;
//     querySnapshot.forEach( (doc) => {
//       activePlayer = doc.data();
//       setActivePlayer(activePlayer);
//     });
//   })
// }

// appUtils.inactiveAllPlayers = (players, userId) => {
//   players?.map( (player) => {
//     const playerRef = doc(db, 'users', `${userId}`, 'players', `${player.id}`);
//     updateDoc(playerRef, { isActive: false })
//   })
// };

appUtils.refreshPage = () => {
  window.location.reload(false);
};


export default appUtils;