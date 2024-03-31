import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { ReactNode } from "react";

export interface SimpleDialogProps {
  title: string;
  open: boolean;
  onClose: () => void;
  children: ReactNode | string;
}

function AppDialog(props: SimpleDialogProps) {
  const { onClose, open, title, children } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <div>
      <Dialog onClose={handleClose} open={open} fullWidth>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </div>
  );
}

export default AppDialog;
