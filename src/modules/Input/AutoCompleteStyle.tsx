import { Autocomplete, TextField } from "@mui/material";
import React from "react";

interface DataAutoCompleteResponse {
  readonly?: any;
  options?: any;
  value?: any;
  setChange?: any;
  getOptionLabel?: any;
  isOptionEqualToValue?: any;
  label: string;
  required: boolean;
}

const AutoCompleteStyle: React.FC<DataAutoCompleteResponse> = ({
  readonly,
  options,
  value,
  setChange,
  getOptionLabel,
  isOptionEqualToValue,
  label,
  required,
}) => {
  return (
    <>
      <Autocomplete
        className="w-full"
        disablePortal
        readOnly={readonly ? true : false}
        id="combo-box-demo"
        options={options || []}
        getOptionLabel={getOptionLabel}
        value={value}
        onChange={setChange}
        isOptionEqualToValue={isOptionEqualToValue}
        size="small"
        sx={{
          input: {
            height: 14,
            fontSize: 15,
          },
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            InputLabelProps={{
              style: {
                fontWeight: "normal",
                fontSize: 14,
                marginTop: -3,
              },
            }}
            required={required ? true : false}
          />
        )}
      />
    </>
  );
};

export default AutoCompleteStyle;
