import { doc, updateDoc, arrayUnion, increment, deleteDoc } from "firebase/firestore";
import { db } from "../firebase-config";

const playerUtils = {};

playerUtils.addPointToPlayer = async (userId) => {
  console.log(userId);
  const playerDocRef = doc(db, 'users', `${userId}`);
  await updateDoc(playerDocRef, {
    points: increment(1)
  });
};

playerUtils.levelUp = async (userId, nextLevel) => {
  const playerDocRef = doc(db, 'users', `${userId}`);
  const badge = {
    name: nextLevel.badge,
    text: nextLevel.title
  };
  await updateDoc(playerDocRef, {
    badges: arrayUnion(badge),
    level: nextLevel.id,
    points: 0
  })
};


playerUtils.deletePlayerProfile = async (userId) => {
  const playerRef = doc(db, 'users', `${userId}`);
  await deleteDoc(playerRef);
}

playerUtils.characters = [
  { id: 1, name: 'Bu', icon: 'mon_01.png' },
  { id: 2, name: 'Uo', icon: 'mon_02.png' },
  { id: 3, name: 'Bo', icon: 'mon_03.png' },
  { id: 4, name: 'Io', icon: 'mon_04.png' },
  { id: 5, name: 'Grr', icon: 'mon_05.png' },
  { id: 6, name: 'Pi', icon: 'mon_06.png' },
]

export default playerUtils;