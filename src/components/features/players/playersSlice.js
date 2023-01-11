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
      badges: [faFaceSmile, ],
      xp: 0
    },
    {
      id: "2",
      name: "George",
      icon: "curious_george.png",
      color: "green",
      level: 1,
      title: "",
      badges: [],
      xp: 0
    }
  ],
};

export const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {

  }
});

export default playersSlice.reducer;