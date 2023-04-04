import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import initialState from './initialStateSyllables';

export const getSyllablesAsync = createAsyncThunk(
  'syllables/getSyllablesAsync',
  async () => {
    const response = await fetch(`http://localhost:3131/syllables`);
    if (response.ok) {
      const syllables = await response.json();
      return { syllables }
    }
  }
);

export const syllablesSlice = createSlice({
  name: 'syllables',
  initialState,
  reducers: {
  },
  extraReducers: {
    [getSyllablesAsync.pending]: (state, action) => {
      console.log('syllables slice - pobieram sylaby')
    },
    [getSyllablesAsync.fulfilled]: (state, action) => {
      return action.payload;
    }
  }
});

export default syllablesSlice.reducer;