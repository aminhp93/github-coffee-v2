import { NodeModel } from "@minoru/react-dnd-treeview";

export const getChildrenIdHelper = (node: NodeModel, treeData: NodeModel[], idList: (string | number)[] = []) => {
	idList.push(node.id);
	treeData.forEach((treeNode) => {
		if (treeNode.parent === node.id) {
			getChildrenIdHelper(treeNode, treeData, idList);
		}
	})
	return idList;
};

// Retrieve parent node's all children ids
export const getChildrenIds = (parent: NodeModel, treeData: NodeModel[], excludeParent = false) => {
	const results = getChildrenIdHelper(parent, treeData);
	if (excludeParent) {
		const index = results.indexOf(parent.id);
		results.splice(index, 1);
	}
	return results;
};

// Retrieve child node's all parent ids
export const getParentIds = (child: NodeModel, treeData: NodeModel[], idList: (string | number)[] = []) => {
	if (child.parent == null) return;
	const parentNode = treeData.find((node) => node.id === child.parent);
	if (parentNode) {
		idList.push(parentNode.id);
		getParentIds(parentNode, treeData, idList);
	}
	return idList;
}

export const getDirectChildrenIds = (parentId: string | number, treeData: NodeModel[]) => {
	const results: (string | number)[] = [];
	treeData.forEach((treeNode) => {
		if (treeNode.parent === parentId) {
			results.push(treeNode.id);
		}
	})
	return results;
};
