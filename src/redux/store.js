import { configureStore } from "@reduxjs/toolkit";
import playersReducer from "../components/features/players/playersSlice";
import levelsReducer from '../components/features/levels/levelsSlice';

const store = configureStore({
  reducer: {
    players: playersReducer,
    levels: levelsReducer
  }
});

export default store;