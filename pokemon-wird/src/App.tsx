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
import { PokemonDetailed } from './interface/interfaces'

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
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
        <h1>Pokédex</h1>
        <input
          type="text"
          placeholder="Search Pokémon"
          value={searchTerm}
          onChange={handleSearch}
        />
        {selectedPokemon ? (
          <div>
            <h2>{selectedPokemon.name}</h2>
            <img src={selectedPokemon.sprites?.front_default} alt={selectedPokemon.name} />
            <p>Height: {selectedPokemon.height}</p>
            <p>Weight: {selectedPokemon.weight}</p>
            <p>Types: {selectedPokemon.types?.map(type => type.type.name).join(', ')}</p>
            <button onClick={handleBackToList}>Back to List</button>
          </div>
        ) : (
          <PokemonList 
            pokemonsUrls={filteredList.map(pokemon => pokemon.url)}
            onAddToBattleTeam={handleAddToBattleTeam}
            onSelectPokemon={handleSelectPokemon} // Añade esta prop
/>
        )}
      </div>
      <div 
        style={{ 
          width: isBattleTeamVisible ? '300px' : '50px', 
          transition: 'width 0.3s ease-in-out',
          backgroundColor: '#f0f0f0',
          overflowX: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <button 
          onClick={() => setIsBattleTeamVisible(!isBattleTeamVisible)}
          style={{ 
            alignSelf: 'flex-start', 
            margin: '10px',
            background: 'none',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer'
          }}
        >
          {isBattleTeamVisible ? '>' : '<'}
        </button>
        {isBattleTeamVisible && (
          <div style={{ padding: '20px' }}>
            <h2>Battle Team ({battleTeam.length}/6)</h2>
            {battleTeam.map(pokemon => (
              <div key={pokemon.id} style={{ marginBottom: '10px' }}>
                <img src={pokemon.sprites?.front_default} alt={pokemon.name} />
                <p>{pokemon.name}</p>
                <button onClick={() => handleRemoveFromBattle(pokemon.id)}>Remove</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;