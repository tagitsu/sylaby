const levelUp = {};

levelUp.levelUp = (updatePlayer, activePlayer, nextLevel) => {
  updatePlayer({ ...activePlayer, level: activePlayer.level + 1, xp: 0, badges: [ ...activePlayer.badges, nextLevel.badge ] })
}


export default levelUp;