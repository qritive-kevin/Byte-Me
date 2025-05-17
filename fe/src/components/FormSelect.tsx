import React from "react";
import {
  TextField,
  InputAdornment,
  TextFieldProps,
  MenuItem,
} from "@mui/material";

type FormSelectProps = TextFieldProps & {
  adornment?: React.ReactNode;
  adornmentPosition?: "start" | "end";
  options: { value: string | number; label: React.ReactNode }[];
};

const FormSelect: React.FC<FormSelectProps> = ({
  adornment,
  adornmentPosition = "start",
  InputProps,
  options,
  ...props
}) => {
  return (
    <TextField
      select
      {...props}
      InputProps={{
        ...(InputProps || {}),
        [adornmentPosition === "start" ? "startAdornment" : "endAdornment"]:
          adornment ? (
            <InputAdornment position={adornmentPosition}>
              {adornment}
            </InputAdornment>
          ) : undefined,
        ...InputProps,
      }}
    >
      {options.map((opt) => (
        <MenuItem key={opt.value} value={opt.value}>
          {opt.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default FormSelect;
