import { InputAdornment, TextField } from "@mui/material";
import React from "react";

interface DataTextField {
  label?: string;
  value?: any;
  setValue?: any;
  disabled?: any;
}

const TextFieldTotalAmountStyle: React.FC<DataTextField> = ({
  label,
  value,
  setValue,
  disabled,
}) => {
  return (
    <>
      <TextField
        disabled={disabled ? disabled : undefined}
        id="outlined-start-adornment"
        size="small"
        fullWidth
        label={label}
        value={value}
        sx={{
          input: {
            height: 14,
            fontSize: 15,
          },
        }}
        onChange={(e) => {
          const numericValue = e.target.value.replace(/[^\d.,]/g, "");
          const parts = numericValue.split(".");
          parts[0] = parts[0]
            .replace(/\D/g, "")
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          const formattedValue = parts.join(".");
          if (setValue) {
            setValue(formattedValue);
          }
        }}
        InputProps={{
          startAdornment: <InputAdornment position="start">USD</InputAdornment>,
        }}
        inputProps={{
          min: 0,
          style: { textAlign: "right" },
        }}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </>
  );
};

export default TextFieldTotalAmountStyle;
