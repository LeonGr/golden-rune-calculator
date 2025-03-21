import { useContext } from "react";
import { MdAdd, MdRemove } from "react-icons/md";
import NumberInput from "components/atoms/NumberInput";
import Button from "components/atoms/Button";
import { SoulCounterContext } from "context/SoulCounter";
import styles from "./styles.module.scss";

const RuneList: React.FC<{ runes: Rune[] }> = ({ runes }) => {
  const { increase, decrease, runeCount, setExactCount } =
    useContext(SoulCounterContext);
  return (
    <div className={styles.Container}>
      {runes.map(({ name, souls }) => {
        const totalRunes = runeCount.find((r) => r.name === name)!.count;
        return (
          <div key={name} className={styles.Row}>
            <div>
              <div>{name}</div>
              <div className={styles.SubLabel}>{souls} Runes</div>
            </div>
            <div>
              <div className={styles.Controls}>
                <Button
                  className={styles.Button}
                  onClick={decrease(name)}
                  disabled={!totalRunes}
                >
                  <MdRemove />
                </Button>
                <NumberInput
                  className={styles.Input}
                  onChange={setExactCount(name)}
                  value={totalRunes}
                />
                <Button className={styles.Button} onClick={increase(name)}>
                  <MdAdd />
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RuneList;
