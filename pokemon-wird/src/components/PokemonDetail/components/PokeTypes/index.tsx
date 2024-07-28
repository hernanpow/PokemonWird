import { PokemonDetailed } from "../../../../interface/interfaces";
import { background } from "../../../../utils/BackgroundsByType";

import styles from "./styles.module.scss";

interface Props {
  pokemon: PokemonDetailed | null;
}

export const PokeTypes = ({ pokemon }: Props) => {
  return (
    <div className={styles.types}>
      {/* @ts-ignore */}
      {pokemon?.types.map(({ type: { name } }) => (
        <div
          key={name}
          /* @ts-ignore */
          style={{ background: background[name] }}
          className={styles.type}
        >
          {name}
        </div>
      ))}
    </div>
  );
};