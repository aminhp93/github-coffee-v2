import { create } from "zustand";
import { produce } from "immer";
import { uniqBy } from "lodash";

type Item = {
  id: string;
};

export type Store = {
  selectedItems: Item[];
  setSelectedItems: (data: Item[]) => void;
};

const useEditStore = create<Store>((set) => ({
  selectedItems: [],
  setSelectedItems: (data) =>
    set(
      produce<Store>((draft) => {
        // unique by id
        draft.selectedItems = uniqBy([...draft.selectedItems, ...data], "id");
      })
    ),
}));

export default useEditStore;
