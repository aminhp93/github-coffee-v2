import Box, { BoxProps } from "@mui/material/Box";
import { styled } from "webpmp-themes";

const DialogWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  "& .react-draggable": {
    color: theme.palette.primary.main,
  },
}));

export default DialogWrapper;
