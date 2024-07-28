import { ArrowLeftIcon } from "../../../../assets/arrow";
import { PokeballIconBig } from "../../../../assets/pokeball";
import { PokemonDetailed } from "../../../../interface/interfaces";

import styles from "./styles.module.scss";

interface Props {
  pokemon: PokemonDetailed | null;
  handleBack: () => void;
  onAddToBattleTeam: () => void; // Añade esta línea
}

export const Header = ({ pokemon, handleBack, onAddToBattleTeam }: Props) => {
  return (
    <header className={styles.header}>
      <PokeballIconBig className={styles.pokeball} />
      <div className={styles.left}>
        <ArrowLeftIcon onClick={handleBack} className={styles.backArrow} />
        <span>{pokemon?.name}</span>
      </div>
      <div className={styles.right}>
        <p>#{pokemon?.id}</p>
        <button 
          className={styles.addToBattleTeamBtn}
          onClick={onAddToBattleTeam}
        >
          Add to Battle Team
        </button>
      </div>
    </header>
  );
};