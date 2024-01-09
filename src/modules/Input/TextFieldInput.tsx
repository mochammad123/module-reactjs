import { TextField } from "@mui/material";
import React from "react";

interface DataTextField {
  multiline: boolean;
  rows?: number;
  value?: any;
  handleChange?: any;
  readonly?: any;
  type: string;
  label: string;
  required: boolean;
  textAlign?: boolean;
}

const TextFieldInput: React.FC<DataTextField> = ({
  multiline,
  rows,
  value,
  handleChange,
  readonly,
  type,
  label,
  required,
  textAlign,
}) => {
  return (
    <TextField
      fullWidth
      id="outlined-multiline-static"
      label={label}
      type={type}
      size="small"
      multiline={multiline ? true : false}
      rows={multiline ? rows : 0}
      value={value}
      onChange={handleChange}
      variant="outlined"
      InputLabelProps={{
        style: { fontWeight: "normal" },
        shrink: type == "date" ? true : undefined,
      }}
      required={required ? true : false}
      inputProps={{
        readOnly: readonly,
        style: { textAlign: textAlign ? "right" : "left" },
      }}
    />
  );
};

export default TextFieldInput;
