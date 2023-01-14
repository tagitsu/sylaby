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
    {
      id: "3",
      value: 3,
      title: "",
      badge: '<FontAwesomeIcon icon="fa-solid fa-ghost" />',
      xpToLvlUp: 45
    },
    {
      id: "4",
      value: 4,
      title: "",
      badge: '<FontAwesomeIcon icon="fa-solid fa-ghost" />',
      xpToLvlUp: 70
    },
    {
      id: "5",
      value: 5,
      title: "",
      badge: '<FontAwesomeIcon icon="fa-solid fa-ghost" />',
      xpToLvlUp: 120
    },
    {
      id: "6",
      value: 6,
      title: "",
      badge: '<FontAwesomeIcon icon="fa-solid fa-ghost" />',
      xpToLvlUp: 180
    },
    {
      id: "7",
      value: 7,
      title: "",
      badge: '<FontAwesomeIcon icon="fa-solid fa-ghost" />',
      xpToLvlUp: 260
    },
    {
      id: "8",
      value: 8,
      title: "",
      badge: '<FontAwesomeIcon icon="fa-solid fa-ghost" />',
      xpToLvlUp: 400
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