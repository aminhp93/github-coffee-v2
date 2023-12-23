// Import libraries
import {
  DndProvider,
  DragLayerMonitorProps,
  DropOptions,
  MultiBackend,
  NodeModel,
  Tree,
  getBackendOptions,
} from "@minoru/react-dnd-treeview";
import { useEffect, useState } from "react";

// Import local files
import CustomDragPreview from "./CustomDragPreview";
import CustomNode from "./CustomNode";
import TreeWrapper from "./TreeWrapper";
import { CustomData } from "./types";
import { getChildrenIds, getDirectChildrenIds, getParentIds } from "./utils";
import styles from "./Tree.module.css";

type Props = {
  initTreeData: NodeModel[];
  enableCheckbox?: boolean;
  onChangeTreeData?: (newTree: NodeModel[]) => void;
  onSelectNodes?: (selectedNodes: (string | number)[]) => void;
  onDropNode?: (newTree: NodeModel[], options?: DropOptions) => void;
};

const DndTree = ({
  initTreeData,
  enableCheckbox = false,
  onChangeTreeData,
  onSelectNodes,
  onDropNode,
}: Props) => {
  const [treeData, setTreeData] = useState<NodeModel[]>(initTreeData);
  const [selectedNodes, setSelectedNodes] = useState<(string | number)[]>([]);

  useEffect(() => {
    onChangeTreeData && onChangeTreeData(treeData);
  }, [treeData, onChangeTreeData]);

  useEffect(() => {
    onSelectNodes && onSelectNodes(selectedNodes);
  }, [selectedNodes, onSelectNodes]);

  const handleDrop = (newTree: NodeModel[], options: DropOptions) => {
    setTreeData(newTree);
    // check if drag source's old parent is checked (in case drag source was the only child that wasn't checked)
    const { dragSource } = options;
    const selectedNodesSet = new Set(selectedNodes);
    if (dragSource && !selectedNodesSet.has(dragSource.id)) {
      const oldParentChildrenIds = getDirectChildrenIds(
        dragSource.parent,
        newTree
      );
      const oldParentIsChecked = oldParentChildrenIds.every((childId) =>
        selectedNodesSet.has(childId)
      );

      if (oldParentIsChecked) {
        const oldParentNode = newTree.find(
          (treeNode) => treeNode.id === dragSource.parent
        );
        oldParentNode && handleSelect(oldParentNode);
      }
    }
    onDropNode && onDropNode(newTree, options);
  };

  const handleSelect = (node: NodeModel) => {
    const childrenIds = getChildrenIds(node, treeData);
    const parentIds = getParentIds(node, treeData) ?? [];
    if (selectedNodes.includes(node.id)) {
      // de-check all children and parent nodes
      const parentAndChildrenIds = new Set([...childrenIds, ...parentIds]);
      setSelectedNodes((prevSelected) =>
        prevSelected.filter((id) => !parentAndChildrenIds.has(id))
      );
    } else {
      // check all children nodes and every parent node that has all its children checked
      const willBeChecked = [...childrenIds];
      parentIds.forEach((parentId) => {
        if (areAllChildrenChecked(parentId, willBeChecked)) {
          willBeChecked.push(parentId);
        }
      });
      setSelectedNodes((prevSelected) => [...prevSelected, ...willBeChecked]);
    }
  };

  const areAllChildrenChecked = (
    parentId: string | number,
    willBeChecked: (string | number)[]
  ) => {
    const parentNode = treeData.find((treeNode) => treeNode.id === parentId);
    if (!parentNode) return false;
    const childrenIds = getChildrenIds(parentNode, treeData, true);
    const checkedList = new Set([...selectedNodes, ...willBeChecked]);
    return childrenIds.every((id) => checkedList.has(id));
  };

  const isParentIndeterminate = (parentNode: NodeModel) => {
    const childrenIds = getChildrenIds(parentNode, treeData, true);
    const childrenSet = new Set(childrenIds);
    let hasCheckedChildren = false;
    selectedNodes.forEach((id) => {
      if (childrenSet.has(id)) {
        hasCheckedChildren = true;
        childrenSet.delete(id);
      }
    });
    const hasUncheckedChildren = childrenSet.size > 0;

    return hasCheckedChildren && hasUncheckedChildren;
  };

  const handleClear = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedNodes([]);
    }
  };

  return (
    <TreeWrapper>
      <DndProvider backend={MultiBackend} options={getBackendOptions()}>
        <Tree
          classes={{
            root: styles.treeRoot,
            draggingSource: styles.draggingSource,
            dropTarget: styles.dropTarget,
          }}
          tree={treeData}
          rootId={0}
          // @ts-expect-error TODO: fix this
          render={(
            node: NodeModel<CustomData>,
            { depth, isOpen, onToggle }
          ) => {
            const isSelected = !!selectedNodes.find(
              (nodeId) => nodeId === node.id
            );
            const isIndeterminate = isParentIndeterminate(node);

            return (
              <CustomNode
                node={node}
                depth={depth}
                isOpen={isOpen}
                hideCheckbox={!enableCheckbox}
                isIndeterminate={isIndeterminate}
                isSelected={isSelected}
                onToggle={onToggle}
                onSelect={handleSelect}
              />
            );
          }}
          // @ts-expect-error TODO: fix this
          dragPreviewRender={(
            monitorProps: DragLayerMonitorProps<CustomData>
          ) => <CustomDragPreview monitorProps={monitorProps} />}
          onDrop={handleDrop}
          rootProps={{
            onClick: handleClear,
          }}
        />
      </DndProvider>
    </TreeWrapper>
  );
};

export default DndTree;
