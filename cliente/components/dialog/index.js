import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function AlertDialog({ open, handleShow, content }) {
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{content.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content.description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleShow}
          color="primary"
          variant="contained"
          autoFocus
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}
