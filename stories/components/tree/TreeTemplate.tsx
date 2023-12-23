// Import libraries

// Import local files
import Tree from "../../../@core/components/tree/Tree";
import "../../../styles/globals.css";
import * as argTypes from "./Tree.types";
import SampleData from "./sample_data.json";

const TreeTemplate = (props: typeof argTypes) => {
  return (
    <Tree initTreeData={SampleData} enableCheckbox={props.enableCheckbox} />
  );
};

export default TreeTemplate;
