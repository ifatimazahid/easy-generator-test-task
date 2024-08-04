import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export const CustomHeader = ({ header }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" noWrap>
          {header}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
