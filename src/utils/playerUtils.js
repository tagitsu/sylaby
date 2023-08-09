import { doc, updateDoc, arrayUnion, increment, deleteDoc } from "firebase/firestore";
import { db } from "../firebase-config";

const playerUtils = {};

playerUtils.addPointToPlayer = async (userId, playerId) => {
  const activePlayerDocRef = doc(db, 'users', `${userId}`, 'players', `${playerId}`);
  await updateDoc(activePlayerDocRef, {
    xp: increment(1)
  });
};

playerUtils.levelUp = async (userId, playerId, nextLevel) => {
  const activePlayerDocRef = doc(db, 'users', `${userId}`, 'players', `${playerId}`);
  const badge = {
    name: nextLevel.badge,
    text: nextLevel.title
  };
  await updateDoc(activePlayerDocRef, {
    badges: arrayUnion(badge),
    level: nextLevel.id,
    xp: 0
  })
};

playerUtils.changeActiveStatus = async (userId, playerId) => {
    const playerRef = doc(db, 'users', `${userId}`, 'players', `${playerId}`);
    await updateDoc(playerRef, { isActive: true });
}

playerUtils.changeColor = async (userId, playerId, color) => {
  const playerRef = doc(db, 'users', `${userId}`, 'players', `${playerId}`);
  await updateDoc(playerRef, { color: color });
};

playerUtils.deletePlayerProfile = async (userId, playerId) => {
  const playerRef = doc(db, 'users', `${userId}`, 'players', `${playerId}`);
  await deleteDoc(playerRef);
}

playerUtils.characters = [
  { id: 1, name: 'Pikachu', icon: 'pikachu.png' },
  { id: 2, name: 'Curious George', icon: 'curious_george.png' },
  { id: 3, name: 'Sponge Bob', icon: 'spongebob.png' },
  { id: 4, name: 'Elsa', icon: 'elsa.png' },
  { id: 5, name: 'George the Pig', icon: 'george_pig.png' },
  { id: 6, name: 'C3PO and R2D2', icon: 'r2d2_c3po.png' },
  { id: 7, name: '341B', icon: 'storybots.png' },
  { id: 8, name: 'Lemmings', icon: 'lemmings.png'},
  { id: 9, name: 'Vaiana', icon: 'vaiana.png'},
  { id: 10, name: 'Maui', icon: 'maui.png'},
  { id: 11, name: 'Hei Hei', icon: 'heihei.png'},
  { id: 12, name: 'Rapunzel', icon: 'rapunzel.png'},
  { id: 14, name: 'Dipper and Mabel', icon: 'gravity_falls.png'},
  { id: 15, name: 'AJ and Blaze', icon: 'blaze.png'},
  { id: 16, name: 'Grizzly', icon: 'grizzly.png'},
  { id: 17, name: 'Mavis and Dracula', icon: 'transylvania.png'}
]

export default playerUtils;