import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  players: [
    {
      id: "1",
      name: "1",
      title: "",
      badge: '<FontAwesomeIcon icon="fa-solid fa-face-smile" />',
      xpToLvlUp: 0
    },
    {
      id: "2",
      name: "2",
      title: "",
      badges: '<FontAwesomeIcon icon="fa-solid fa-ghost" />',
      xpToLvlUp: 10
    },
  ],
};

export const levelsSlice = createSlice({
  name: 'levels',
  initialState,
  reducers: {

  }
});

export default levelsSlice.reducer;