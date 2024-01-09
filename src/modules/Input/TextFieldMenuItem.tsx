import { MenuItem, TextField } from "@mui/material";
import React from "react";

interface DataTextField {
  disabled?: boolean;
  required: boolean;
  valueSelect?: any;
  handleSelect?: any;
  data?: any;
  label?: string;
  valueTextField?: any;
  handleTextField?: any;
}

const TextFieldMenuItem: React.FC<DataTextField> = ({
  disabled,
  required,
  valueSelect,
  handleSelect,
  data,
  label,
  valueTextField,
  handleTextField,
}) => {
  return (
    <div className="flex">
      <TextField
        id="outlined-select-currency"
        size="small"
        select
        disabled={disabled ? true : false}
        required={required ? true : false}
        value={valueSelect}
        onChange={handleSelect}
        className="w-28 bg-slate-300"
      >
        {data?.map((option: any) => (
          <MenuItem key={option?.id} value={option}>
            {option?.currency?.toUpperCase()}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        className=""
        id="outlined-basic"
        label={label}
        variant="outlined"
        size="small"
        fullWidth
        disabled={disabled ? true : false}
        value={valueTextField}
        onChange={(e) => {
          const numericValue = e.target.value.replace(/[^\d.,]/g, "");
          const parts = numericValue.split(".");
          parts[0] = parts[0]
            .replace(/\D/g, "")
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          const formattedValue = parts.join(".");
          if (handleTextField) {
            handleTextField(formattedValue);
          }
        }}
        inputProps={{
          min: 0,
          style: { textAlign: "right" },
        }}
        InputLabelProps={{
          style: { fontWeight: "normal" },
          shrink: true,
        }}
        required
      />
    </div>
  );
};

export default TextFieldMenuItem;
