import React, { forwardRef } from "react";
import { TextField, InputAdornment, TextFieldProps } from "@mui/material";

type FormInputProps = TextFieldProps & {
  adornment?: React.ReactNode;
  adornmentPosition?: "start" | "end";
};

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      adornment,
      adornmentPosition = "start",
      InputProps: muiInputProps,
      ...rest
    },
    ref
  ) => (
    <TextField
      {...rest}
      inputRef={ref}
      fullWidth
      variant="filled"
      InputProps={{
        ...muiInputProps,
        [adornmentPosition === "start" ? "startAdornment" : "endAdornment"]:
          adornment ? (
            <InputAdornment position={adornmentPosition}>
              {adornment}
            </InputAdornment>
          ) : undefined,
      }}
    />
  )
);

export default FormInput;
