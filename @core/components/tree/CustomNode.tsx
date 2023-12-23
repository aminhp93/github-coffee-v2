// Import libraries
import { Typography, Box, Checkbox } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { NodeModel } from "@minoru/react-dnd-treeview";
import { styled } from "webpmp-themes";

// Import local files
import { CustomData } from "./types";
import TypeIcon from "./TypeIcon";

type Props = {
  node: NodeModel<CustomData>;
  depth: number;
  isOpen: boolean;
  isSelected: boolean;
  isIndeterminate?: boolean;
  onToggle: (id: NodeModel["id"]) => void;
  onSelect: (node: NodeModel) => void;
  hideCheckbox?: boolean;
};

const CustomNode = (props: Props) => {
  const { droppable, id, text } = props.node;
  const indent = props.depth * 24;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    props.onToggle(id);
  };

  const handleSelect = () => props.onSelect(props.node);

  return (
    <StyledBoxRoot
      className={props.isSelected ? "isSelected" : ""}
      style={{ paddingInlineStart: indent }}
    >
      <StyledBoxIcon className={props.isOpen ? "isOpen" : ""}>
        {droppable && (
          <Box onClick={handleToggle}>
            <KeyboardArrowRightIcon />
          </Box>
        )}
      </StyledBoxIcon>
      {!props.hideCheckbox && (
        <Box>
          <Checkbox
            indeterminate={props.isIndeterminate}
            color="primary"
            size="small"
            checked={props.isSelected}
            onClick={handleSelect}
          />
        </Box>
      )}
      <StyledBoxTypeIcon>
        <TypeIcon
          type={droppable ? (props.isOpen ? "folder-open" : "folder") : null}
        />
      </StyledBoxTypeIcon>
      <StyledBoxText>
        <StyledText variant="body2">{text}</StyledText>
      </StyledBoxText>
    </StyledBoxRoot>
  );
};

export default CustomNode;

const StyledBoxRoot = styled(Box)(({ theme }) => ({
  alignItems: "center",
  display: "grid",
  gridTemplateColumns: "auto auto auto 1fr",
  height: "32px",
  paddingInlineEnd: "8px",

  ":hover": {
    backgroundColor: theme.palette.action.hover,
  },

  "&.isSelected": {
    backgroundColor: theme.palette.action.selected,
  },
}));

const StyledBoxIcon = styled(Box)(() => ({
  alignItems: "center",
  fontSize: 0,
  cursor: "pointer",
  display: "flex",
  height: "24px",
  justifyContent: "center",
  width: "24px",
  transition: "transform linear 0.1s",
  transform: "rotate(0deg)",

  "&.isOpen": {
    transform: "rotate(90deg)",
  },
}));

const StyledBoxText = styled(Box)(() => ({
  paddingInlineStart: "8px",
  overflow: "hidden",
  whiteSpace: "nowrap",
}));

const StyledText = styled(Typography)(() => ({
  textOverflow: "ellipsis",
}));

const StyledBoxTypeIcon = styled(Box)(() => ({
  alignItems: "center",
  display: "flex",
}));
