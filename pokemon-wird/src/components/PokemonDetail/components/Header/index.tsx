
import { ArrowLeftIcon } from "../../../../assets/arrow";
import { PokeballIconBig } from "../../../../assets/pokeball";
import { PokemonDetailed } from "../../../../interface/interfaces";

import styles from "./styles.module.scss";

interface Props {
  pokemon: PokemonDetailed | null;
  handleBack : () => void
}

export const Header = ({ pokemon , handleBack}: Props) => {
  

  return (
    <header>
      <PokeballIconBig className={styles.pokeball} />
      <div className={styles.left}>
        <ArrowLeftIcon onClick={handleBack} />

        <span>{pokemon?.name}</span>
      </div>
      <p>#{pokemon?.id}</p>
    </header>
  );
};