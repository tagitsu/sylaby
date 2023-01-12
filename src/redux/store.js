import { configureStore } from "@reduxjs/toolkit";
import playerReducer from './player/playerSlice';
import levelsReducer from './levels/levelsSlice';

const store = configureStore({
  reducer: {
    player: playerReducer,
    levels: levelsReducer
  }
});

export default store;