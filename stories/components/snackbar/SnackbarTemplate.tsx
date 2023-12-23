import { Button } from "@mui/material";
import { SnackbarProvider, useSnackbar } from "notistack";

const SnackbarTemplate = () => {
  return (
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={3000}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <SnackbarConsumer />
    </SnackbarProvider>
  );
};

const SnackbarConsumer = () => {
  const { enqueueSnackbar } = useSnackbar();

  return (
    <>
      <Button
        variant="outlined"
        onClick={() =>
          enqueueSnackbar({ message: "Notification!", variant: "default" })
        }
      >
        Click me!
      </Button>
    </>
  );
};

export default SnackbarTemplate;
