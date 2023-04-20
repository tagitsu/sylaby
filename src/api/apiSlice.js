import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3131' }),
  endpoints: (builder) => ({
    getPlayers: builder.query({
      query: () => '/players'
    }),
    getPlayer: builder.query({
      query: (player) => ({
        url: `/players/${player.id}`,
        method: 'GET',
        body: player
      })
    }),
    addPlayer: builder.mutation({
      query: (player) => ({
        url: '/players',
        method: 'POST',
        body: player
      })
    }),
    updatePlayer: builder.mutation({
      query: (player) => ({
        url: `/players/${player.id}`,
        method: 'PATCH',
        body: player
      })
    }),
    deletePlayer: builder.mutation({
      query: (id) => ({
        url: `/players/${id}`,
        method: 'DELETE',
        body: id
      })
    }),
    getSyllables: builder.query({
      query: () => '/syllables',
    }),
    getLevels: builder.query({
      query: () => '/levels',
    })
  })
});

// TRK Query tworzy customowe hooki na podstawie metod które wprowadzamy
export const {
  useGetPlayersQuery,
  useGetPlayerQuery,
  useAddPlayerMutation,
  useUpdatePlayerMutation,
  useDeletePlayerMutation,
  useGetSyllablesQuery,
  useGetLevelsQuery
} = apiSlice