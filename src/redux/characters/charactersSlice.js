import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  characters: [
    {
      id: '1',
      name: 'Pikachu',
      icon: 'pikachu.png',
    },
    {
      id: '2',
      name: 'Curious George',
      icon: 'curious_george.png',
    },
    {
      id: '3',
      name: 'Sponge Bob',
      icon: 'spongebob.png',
    },

  ],
};

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {

  }
});

export default charactersSlice.reducer;