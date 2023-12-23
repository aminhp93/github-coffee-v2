import Dialog from "../../..//@core/components/dialog/Dialog";
import DialogWrapper from "../../..//@core/components/dialog/DialogWrapper";

const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
  background: "#f0f0f0",
} as const;

const DialogTemplate = () => {
  return (
    <DialogWrapper>
      <Dialog
        style={style}
        default={{
          x: 300,
          y: 300,
          width: 200,
          height: 200,
        }}
      >
        ReactRnd
      </Dialog>
    </DialogWrapper>
  );
};

export default DialogTemplate;
