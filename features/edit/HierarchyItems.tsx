// Import local components
import { mapView } from "@/features/view/View.utils";
import { DEFAULT_VIEW } from "@/features/view/View.constants";
import useEditStore from "./store";

// @ts-expect-error Import remote module
import listItems from "items/listItems";

const HierarchyItems = () => {
  const mappedView = mapView(DEFAULT_VIEW);
  // const list = listItems.getItems();
  const selectedItems = useEditStore((state) => state.selectedItems);
  const setSelectedItems = useEditStore((state) => state.setSelectedItems);

  return (
    <div>
      <div>HierarchyItems</div>
      {mappedView.map((i) => {
        let content;
        if (i.type === "legacy-item" && listItems.getItem) {
          const ItemComponent = listItems.getItem(i.legacy.itemType).component;

          content = <ItemComponent {...i.legacy.itemProperties} />;
        }

        return (
          <div
            key={i.id}
            onClick={() => {
              setSelectedItems([...selectedItems, i.id]);
            }}
          >
            {content}
          </div>
        );
      })}
    </div>
  );
};

export default HierarchyItems;
