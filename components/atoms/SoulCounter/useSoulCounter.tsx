import { useReducer, useState } from "react";
import { getRuneById } from "../../../constants/runes";
import { replaceRune } from "../../../utils/runeUtils";

export type RuneCount = { [id: number]: number };

export default () => {
  const [total, dispatch] = useReducer((state: number, action: any) => {
    if (action === "reset") {
      return 0;
    }
    if (state <= 0 && action <= 0) {
      return 0;
    }
    return state + action;
  }, 0);

  const [runeCount, setCount] = useState<InventoryRune[]>([]);

  const increment = (souls: number, id: number) => () => {
    dispatch(souls);
    const foundRune = runeCount.find((r) => r.id === id);
    if (foundRune) {
      const editedRune = { ...foundRune, count: foundRune.count + 1 };
      setCount(replaceRune(id, runeCount, editedRune));
    } else {
      const rune: InventoryRune = { ...getRuneById(id), count: 1 };
      setCount([...runeCount, rune]);
    }
  };

  const decrease = (souls: number, id: number) => () => {
    if (!total) return;
    dispatch(-souls);
    const foundRune = runeCount.find((r) => r.id === id);
    if (foundRune) {
      const editedRune = { ...foundRune, count: foundRune.count - 1 };
      setCount(replaceRune(id, runeCount, editedRune));
    }
    // if (runeCount[id] <= 0) {
    //   const newCounts = { ...runeCount };
    //   setCount(newCounts);
    // }
  };

  const reset = () => {
    dispatch("reset");
    setCount([]);
  };

  return { total, reset, decrease, increment, runeCount };
};
