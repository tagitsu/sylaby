import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const getPlayersAsync = createAsyncThunk(
  'players/getPlayersAsync',
  async () => {
    const res = await fetch('http://localhost:3131/players');
    if (res.ok) {
      const players = await res.json();
      return { players }
    }
  }
);

export const addPlayerAsync = createAsyncThunk(
  'players/addPlayerAsync',
  async (payload) => {
    const res = await fetch('http://localhost:3131/players', {
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

// TODO - usuwanie gracza
// TODO - dodawanie punktów xp (zmiana w obiekcie gracza)
export const addPointsAsync = createAsyncThunk(
  'players/addPointsAsync',
  async (payload, { getState }) => {
    const state = getState();
    const res = await fetch(
      `http://localhost:3131/players/${payload.id}`, 
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: payload.id, xp: payload.xp })
      });

      if (res.ok) {
        const player = await res.json();
        return ({ id: player.id, xp: player.xp })
      }
  }
)
// TODO - levelowanie (zmiana w obiekcie gracza)


 const initialState = {
  players: [],
};

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    // chooseCurrentPlayer: (state, action) => {
    //   state.currentPlayer = action.payload
    // },
    // addPoints: (state, action) => {
    //   state.players.map( player => {if(player.id === state.currentPlayer) {player.xp =+ action.payload + player.xp}} )
    // },
    // levelUp: (state, action) => {
    //   state.players.map( player => 
    //     {if(player.id === state.currentPlayer) {
    //       player.level++;
    //       player.badges.push(action.payload)
    //     }
    //   })
    // },
    // addNewPlayer: (state, action) => {
    //   console.log('reducer - dodaje nowego gracza');
    //   state.players.push(action.payload);
  // }
  },
  extraReducers: (builder) => {
    builder.addCase(addPointsAsync.fulfilled, (state, action) => {
      const activePlayer = state;
      activePlayer.xp += action.payload.xp + activePlayer.xp;
    });
    builder.addCase(getPlayersAsync.fulfilled, (state, action) => {
      return action.payload;
    })
  },
  // extraReducers: {
  //   // [getPlayersAsync.fulfilled]: (state, action) => {
  //   //   return action.payload;
  //   // },
  //   [addPlayerAsync.fulfilled]: (state, action) => {
  //     state.players.push(action.payload);
  //   },
  //   // [addPointsAsync.fulfilled]: (state, action) => {
  //   //   const activePlayer = state;
  //   //   activePlayer.xp =+ action.payload.xp;
  //   // }
  // }
});
export const { chooseCurrentPlayer, addPoints, levelUp, addNewPlayer } = playerSlice.actions;

export default playerSlice.reducer;