import React from 'react';
import { PokemonDetailed } from '../../interface/interfaces';
import styles from './styles.module.scss';

interface SidebarProps {
  isBattleTeamVisible: boolean;
  setIsBattleTeamVisible: (isVisible: boolean) => void;
  battleTeam: PokemonDetailed[];
  handleRemoveFromBattle: (id: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isBattleTeamVisible,
  setIsBattleTeamVisible,
  battleTeam,
  handleRemoveFromBattle
}) => {
  return (
    <div 
      className={isBattleTeamVisible ? styles.sideBar : styles.sideBarCollapsed}
    >
      <button 
        onClick={() => setIsBattleTeamVisible(!isBattleTeamVisible)}
        className={styles.sideBarButton}
      >
        {isBattleTeamVisible ? '>' : '<'}
      </button>
      {isBattleTeamVisible && (
        <div className={styles.sideBarContent}>
          <h2>Battle Team ({battleTeam.length}/6)</h2>
          <div className={styles.battleTeam}>
            {battleTeam.length > 0 ? (
              battleTeam.map(pokemon => (
                <div key={pokemon.id} className={styles.pokemonCard}>
                  <img src={pokemon.sprites?.front_default} alt={pokemon.name} />
                  <p>{pokemon.name}</p>
                  <button onClick={() => handleRemoveFromBattle(pokemon.id)}>Remove</button>
                </div>
              ))
            ) : (
              <p className={styles.noPokemons}>No Pokémon selected for battle team.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;