import { configureStore } from "@reduxjs/toolkit";
import playerReducer from './player/playerSlice';
import levelsReducer from './levels/levelsSlice';
import syllablesReducer from './syllables/syllablesSlice';

const store = configureStore({
  reducer: {
    player: playerReducer,
    levels: levelsReducer,
    syllables: syllablesReducer,
  }
});

export default store;









