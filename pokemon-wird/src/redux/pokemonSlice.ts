import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { PokemonState, PokemonBasic, PokemonDetailed } from '../interface/interfaces'
import { fetchPokemonList, fetchPokemonDetails } from '../services/pokemonService';

const initialState: PokemonState = {
  list: [],
  detailedList: [],
  battleTeam: [],
  searchTerm: '',
  loading: false,
  error: null,
  selectedPokemon: null,
};

export const fetchPokemons = createAsyncThunk(
  'pokemon/fetchPokemons',
  async (_, { rejectWithValue }) => {
    try {
      const pokemons = await fetchPokemonList();
      return pokemons;
    } catch (error) {
      return rejectWithValue('Failed to fetch Pokemons');
    }
  }
);

export const fetchPokemonDetail = createAsyncThunk(
  'pokemon/fetchPokemonDetail',
  async (url: string, { rejectWithValue }) => {
    try {
      const pokemon = await fetchPokemonDetails(url);
      return pokemon;
    } catch (error) {
      return rejectWithValue('Failed to fetch Pokemon details');
    }
  }
);

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    addToBattleTeam: (state, action: PayloadAction<PokemonDetailed>) => {
      if (state.battleTeam.length < 6) {
        state.battleTeam.push(action.payload);
      }
    },
    removeFromBattleTeam: (state, action: PayloadAction<number>) => {
      state.battleTeam = state.battleTeam.filter(pokemon => pokemon.id !== action.payload);
    },
    setSelectedPokemon: (state, action: PayloadAction<PokemonDetailed | null>) => {
        state.selectedPokemon = action.payload;
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemons.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPokemons.fulfilled, (state, action: PayloadAction<PokemonBasic[]>) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchPokemons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchPokemonDetail.fulfilled, (state, action: PayloadAction<PokemonDetailed>) => {
        const existingIndex = state.detailedList.findIndex(p => p.id === action.payload.id);
        if (existingIndex >= 0) {
          state.detailedList[existingIndex] = action.payload;
        } else {
          state.detailedList.push(action.payload);
        }
      });
  },
});

export const { setSearchTerm, addToBattleTeam, removeFromBattleTeam , setSelectedPokemon} = pokemonSlice.actions;
export default pokemonSlice.reducer;