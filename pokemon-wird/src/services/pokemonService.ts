import axios from 'axios';
import { PokemonBasic, PokemonDetailed } from '../interface/interfaces'

const API_BASE_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemonList = async (): Promise<PokemonBasic[]> => {
  const response = await axios.get(`${API_BASE_URL}/pokemon?limit=151`);
  return response.data.results;
};

export const fetchPokemonDetails = async (url: string): Promise<PokemonDetailed> => {
  const response = await axios.get(url);
  return response.data;
};