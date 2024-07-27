import { PokemonCard } from "../PokemonCard";
import styles from "./styles.module.scss";
import { PokemonDetailed } from "../../interface/interfaces"

interface Props {
  pokemonsUrls: string[];
  onAddToBattleTeam: (pokemon: PokemonDetailed) => void;
  onSelectPokemon: (url: string) => void;
}

export const PokemonList = ({ pokemonsUrls, onAddToBattleTeam, onSelectPokemon }: Props) => {
  return (
    <div className={styles.pokemons}>
      {pokemonsUrls.map((pokemonUrl) => (
        <PokemonCard 
          key={pokemonUrl} 
          url={pokemonUrl} 
          onAddToBattleTeam={onAddToBattleTeam}
          onSelectPokemon={onSelectPokemon}
        />
      ))}
    </div>
  );
};