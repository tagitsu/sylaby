import { configureStore } from "@reduxjs/toolkit";
import playersReducer from "../components/features/players/playersSlice";

const store = configureStore({
  reducer: {
    players: playersReducer,
  }
});

export default store;