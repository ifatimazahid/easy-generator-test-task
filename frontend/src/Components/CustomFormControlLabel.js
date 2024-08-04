import React from "react";
import Typography from "@mui/material/Typography";
import { FormControlLabel, Radio } from "@mui/material";

export const CustomFormControlLabel = ({ value, label, disabled }) => {
  return (
    <FormControlLabel
      value={value}
      control={<Radio />}
      label={
        <Typography variant="body1" color={disabled ? "grey" : "black"}>
          {label}
        </Typography>
      }
      disabled={disabled}
    />
  );
};
