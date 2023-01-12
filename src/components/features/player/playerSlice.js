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
      xp: 4,
    },
    {
      id: "2",
      name: "George",
      icon: "curious_george.png",
      color: "green",
      level: 1,
      title: "",
      badges: [faFaceSmile],
      xp: 0,
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
    }

  }
});
export const { chooseCurrentPlayer } = playerSlice.actions;

export default playerSlice.reducer;