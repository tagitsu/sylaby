const levelUp = {};

levelUp.levelUp = (updatePlayer, activePlayer, nextLevel) => {
  const badge = {
    name: nextLevel.badge,
    text: nextLevel.title
  };
  updatePlayer({ ...activePlayer, level: activePlayer.level + 1, xp: 0, badges: [ ...activePlayer.badges, badge ] })
}


export default levelUp;