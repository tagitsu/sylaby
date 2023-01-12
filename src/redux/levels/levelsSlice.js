import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  levels: [
    {
      id: "1",
      value: 1,
      title: "",
      badge: '<FontAwesomeIcon icon="fa-solid fa-face-smile" />',
      xpToLvlUp: 10
    },
    {
      id: "2",
      value: 2,
      title: "",
      badge: '<FontAwesomeIcon icon="fa-solid fa-ghost" />',
      xpToLvlUp: 25
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