import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxHeight: "90vh",
  overflowY: "auto",
};

export default function MyModal({
  children,
  open,
  setOpen,
  className,
  defaultState = false,
  openType2,
  handleClose = () => setOpen(defaultState),
}) {
  return (
    <div>
      <Modal
        open={open || (openType2 && openType2.show)}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className={className}>
          {children}
        </Box>
      </Modal>
    </div>
  );
}
