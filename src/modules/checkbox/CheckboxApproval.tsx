import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import React from "react";

interface Checkbox {
  label: string;
  defaultChecked?: boolean;
  disabled: boolean;
  checked?: boolean;
  handleChange?: any;
}

const CheckboxApproval: React.FC<Checkbox> = ({
  label,
  defaultChecked,
  disabled,
  checked,
  handleChange,
}) => {
  return (
    <>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={(e) => handleChange(e.target.checked)}
              defaultChecked={defaultChecked ? true : false}
              disabled={disabled ? true : false}
              sx={{
                color: "orange",
                "&.Mui-checked": {
                  color: "orange",
                },
              }}
            />
          }
          label={label}
        />
      </FormGroup>
    </>
  );
};

export default CheckboxApproval;
