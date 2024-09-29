// ConfirmDialog.js
import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import Lottie from "lottie-react";
import animationData from "../../assets/data/animationData/alert.json";

import '../Dialog/confirmdialog.css'

const ConfirmDialog = ({ open, handleClose, handleConfirm, message}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <Box className="dialog_box" display="flex" alignItems="center">
          {<Lottie className="animation" animationData={animationData} />}
          {"Logout"}
        </Box>
      </DialogTitle>
      <DialogContent className="dialog_content">
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions >
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="primary" autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
