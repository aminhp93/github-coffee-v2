// @ts-expect-error Import remote module
import listItems from "items/listItems";

export const getListItems = () => {
  return listItems
    .createAssetsStructure(listItems.getItems(), {})
    .flatMap((item: { content: object }) => item.content);
};
