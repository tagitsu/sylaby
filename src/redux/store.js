import { configureStore } from "@reduxjs/toolkit";
import playerReducer from './player/playerSlice';
import levelsReducer from './levels/levelsSlice';
import syllablesReducer from './syllables/syllablesSlice';
import charactersReducer from './characters/charactersSlice';

const store = configureStore({
  reducer: {
    player: playerReducer,
    levels: levelsReducer,
    syllables: syllablesReducer,
    characters: charactersReducer,
  }
});

export default store;