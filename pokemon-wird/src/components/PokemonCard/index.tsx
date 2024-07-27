import React from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedPokemon } from '../../redux/pokemonSlice';
import { usePokemon } from "../../hooks/usePokemon";
import { background } from "../../utils/BackgroundsByType";
import { Loader } from "../Loader";
import { PokemonDetailed } from "../../interface/interfaces";

import styles from "./styles.module.scss";

interface Props {
  url: string;
  onAddToBattleTeam: (pokemon: PokemonDetailed) => void;
  onSelectPokemon: (url: string) => void; // Añade esta línea
}

export const PokemonCard = ({ url, onAddToBattleTeam, onSelectPokemon }: Props) => {
  const dispatch = useDispatch();
  console.log(url);
  const { pokemon } = usePokemon(url);
  console.log(pokemon);

  console.log(pokemon);
  /* @ts-ignore */
  const backgroundSelected = background[pokemon?.types[0]?.type?.name];

  const handleCardClick = () => {
    if (pokemon) {
      dispatch(setSelectedPokemon(pokemon));
      onSelectPokemon(url);
    }
  };

  const handleAddToBattleTeam = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (pokemon) {
      onAddToBattleTeam(pokemon);
    }
  };

  if (!pokemon) {
    return (
      <div className={styles.pokeCard}>
        <div className={styles.loadingContainer}>
          <Loader color={backgroundSelected} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pokeCard} onClick={handleCardClick}>
      <div style={{ borderColor: backgroundSelected }} className={styles.top}>
        <span style={{ color: backgroundSelected }}>#{pokemon.id}</span>
        {pokemon.sprites?.other?.dream_world?.front_default ||
        pokemon.sprites?.front_default ? (
          <img
            src={
              pokemon.sprites?.other?.dream_world?.front_default ||
              pokemon.sprites?.front_default
            }
            alt={pokemon.name}
          />
        ) : (
          <div className={styles.loadingContainer}>
            <Loader color={backgroundSelected} />
          </div>
        )}
      </div>
      <div style={{ background: backgroundSelected }} className={styles.bottom}>
        {pokemon.name}
      </div>
      <button onClick={handleAddToBattleTeam}>Add to Battle Team</button>
    </div>
  );
};