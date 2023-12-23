import Box, { BoxProps } from "@mui/material/Box";
import { styled } from "webpmp-themes";

const TreeWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  color: theme.palette.text.primary,
  height: "100%",
  ".MuiSvgIcon-root": {
    verticalAlign: "middle",
    color: theme.palette.action.active,
  },
  ".MuiCheckbox-root": {
    padding: 4,
  },
}));

export default TreeWrapper;
