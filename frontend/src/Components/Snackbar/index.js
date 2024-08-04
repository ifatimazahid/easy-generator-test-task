import React from "react";
import "./styles.css";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export const CustomSnackBar = ({ isOpen, color, message, ...restProps }) => {
  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={1000}
      className="custom-snackbar"
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      {...restProps}
    >
      <Alert elevation={6} variant="filled" severity={color}>
        {message}
      </Alert>
    </Snackbar>
  );
};
