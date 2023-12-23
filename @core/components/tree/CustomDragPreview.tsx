// Import libraries
import { Box } from "@mui/material";
import { DragLayerMonitorProps } from "@minoru/react-dnd-treeview";
import { styled } from "webpmp-themes";

// Import local files
import { CustomData } from "./types";
import TypeIcon from "./TypeIcon";

type Props = {
  monitorProps: DragLayerMonitorProps<CustomData>;
};

const CustomDragPreview = (props: Props) => {
  const item = props.monitorProps.item;

  return (
    <StyledBoxRoot>
      <StyledBoxIcon>
        <TypeIcon
          type={"folder-open"}
          // droppable={!!item.droppable}
          // fileType={item?.data?.fileType}
        />
      </StyledBoxIcon>
      <StyledBoxText>{item.text}</StyledBoxText>
    </StyledBoxRoot>
  );
};

export default CustomDragPreview;

const StyledBoxRoot = styled(Box)(({ theme }) => ({
  alignItems: "center",
  backgroundColor: theme.palette.action.selected,
  borderRadius: "4px",
  boxShadow: theme.shadows[4],
  display: "inlineGrid",
  fontSize: "14px",
  gap: "8px",
  gridTemplateColumns: "auto auto",
  padding: "4px 8px",
  pointerEvents: "none",
}));

const StyledBoxIcon = styled(Box)(() => ({
  alignItems: "center",
  display: "flex",
}));

const StyledBoxText = styled(Box)(() => ({
  alignItems: "center",
  display: "flex",
}));
