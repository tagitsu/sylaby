import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "../components/features/player/playerSlice";
import levelsReducer from '../components/features/levels/levelsSlice';

const store = configureStore({
  reducer: {
    player: playerReducer,
    levels: levelsReducer
  }
});

export default store;