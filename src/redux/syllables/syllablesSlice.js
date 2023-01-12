import { createSlice } from "@reduxjs/toolkit";
import initialState from './initialStateSyllables';

const syllables = initialState.syllables;
console.log('random syllable - number',  Math.floor(Math. random() * syllables.length));

export const syllablesSlice = createSlice({
  name: 'syllables',
  initialState,
  reducers: {

  }
});

export default syllablesSlice.reducer;