import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './redux/store';
import { 
  fetchPokemons, 
  setSearchTerm, 
  addToBattleTeam, 
  removeFromBattleTeam,
  setSelectedPokemon,
  fetchPokemonDetail 
} from './redux/pokemonSlice';
import { PokemonList } from './components/PokemonList';
import { PokemonDetail } from './components/PokemonDetail'; // Importa PokemonDetail
import { PokemonDetailed } from './interface/interfaces';
import styles from './styles.module.scss'
import { PokeballIconSmall } from './assets/pokeball';
import Sidebar from './components/SideBar';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { 
    list, 
    battleTeam, 
    searchTerm, 
    loading, 
    error, 
    selectedPokemon,
  } = useSelector((state: RootState) => state.pokemon);
  const [isBattleTeamVisible, setIsBattleTeamVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchPokemons());
  }, [dispatch]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(event.target.value));
  };

  const handleAddToBattleTeam = (pokemon: PokemonDetailed) => {
    if (battleTeam.length < 6 && !battleTeam.some(p => p.name === pokemon.name)) {
      dispatch(addToBattleTeam(pokemon));
      setIsBattleTeamVisible(true);
    }
  };

  const handleRemoveFromBattle = (id: number) => {
    dispatch(removeFromBattleTeam(id));
  };

  const handleBackToList = () => {
    dispatch(setSelectedPokemon(null));
  };

  const handleSelectPokemon = (url: string) => {
    dispatch(fetchPokemonDetail(url)).then((action) => {
      if (fetchPokemonDetail.fulfilled.match(action)) {
        dispatch(setSelectedPokemon(action.payload));
      }
    });
  };

  const filteredList = list.filter(pokemon => 
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.home}>
      <header>
        <div>
          <PokeballIconSmall />
          <span>Pokedex</span>
        </div>
        <input
          type="text"
          placeholder="Search Pokémon"
          value={searchTerm}
          onChange={handleSearch}
        />
      </header>
      <div style={{ display: 'flex', height: 'calc(100vh - 80px)' }}>
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          {selectedPokemon ? (
            <PokemonDetail 
              pokemon={selectedPokemon} 
              handleBack={handleBackToList}  
              onAddToBattleTeam={handleAddToBattleTeam}
            />
          ) : (
            <PokemonList 
              pokemonsUrls={filteredList.map(pokemon => pokemon.url)}
              onAddToBattleTeam={handleAddToBattleTeam}
              onSelectPokemon={handleSelectPokemon}
            />
          )}
        </div>
        <Sidebar 
          isBattleTeamVisible={isBattleTeamVisible}
          setIsBattleTeamVisible={setIsBattleTeamVisible}
          battleTeam={battleTeam}
          handleRemoveFromBattle={handleRemoveFromBattle}
        />
      </div>
    </div>
  );
};

export default App;
