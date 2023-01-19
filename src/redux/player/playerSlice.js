import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getPlayersAsync = createAsyncThunk(
  'players/getPlayerAsync',
  async () => {
    const res = await fetch(' http://localhost:3131/players');
    if (res.ok) {
      const players = await res.json();
      return { players }
    }
  }
);

export const addPlayerAsync = createAsyncThunk(
  'players/addPlayerAsync',
  async (payload) => {
    const res = await fetch(' http://localhost:3131/players', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: payload.id,
        name: payload.name,
        icon: payload.icon,
        color: payload.color,
        level: 1,
        title: payload.title,
        badges: [],
        xp: 0,
        isCurrent: false
      })
    });

    if (res.ok) {
      const player = await res.json();
      return { player };
    }
  }
);

 const initialState = {
  players: [],
  currentPlayer: ''
};

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    chooseCurrentPlayer: (state, action) => {
      state.currentPlayer = action.payload
    },
    addPoints: (state, action) => {
      state.players.map( player => {if(player.id === state.currentPlayer) {player.xp =+ action.payload + player.xp}} )
    },
    levelUp: (state, action) => {
      state.players.map( player => 
        {if(player.id === state.currentPlayer) {
          player.level++;
          player.badges.push(action.payload)
        }
      })
    },
    addNewPlayer: (state, action) => {
      console.log('reducer - dodaje nowego gracza');
      state.players.push(action.payload);
    }
  },
  extraReducers: {
    [getPlayersAsync.fulfilled]: (state, action) => {
      return action.payload;
    },
    [addPlayerAsync.fulfilled]: (state, action) => {
      state.push(action.payload);
    }
  }
});
export const { chooseCurrentPlayer, addPoints, levelUp, addNewPlayer } = playerSlice.actions;

export default playerSlice.reducer;