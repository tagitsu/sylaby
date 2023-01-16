import { createSlice } from '@reduxjs/toolkit';
import { faFaceSmile } from '@fortawesome/free-regular-svg-icons';

const initialState = {
  players: [
    {
      id: "1",
      name: "Pikachu",
      icon: "pikachu.png",
      color: "yellow",
      level: 1,
      title: "",
      badges: [faFaceSmile],
      xp: 8,
      isCurrent: false
    },
    {
      id: "2",
      name: "George",
      icon: "curious_george.png",
      color: "green",
      level: 1,
      title: "",
      badges: [faFaceSmile],
      xp: 6,
      isCurrent: false
    }
  ],
  currentPlayer: '',
};

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    chooseCurrentPlayer: (state, action) => {
      state.currentPlayer = action.payload
    },
    addPoints: (state, action) => {
      state.players.map( player => {if(player.id === state.currentPlayer) {player.xp =+ action.payload + player.xp}} )
    },
    levelUp: (state) => {
      state.players.map( player => {if(player.id === state.currentPlayer) {player.level++}} )
    }
  }
});
export const { chooseCurrentPlayer, addPoints, levelUp } = playerSlice.actions;

export default playerSlice.reducer;