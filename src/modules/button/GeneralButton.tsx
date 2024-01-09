import { Button } from "@mui/material";
import React from "react";

type VariantGeneralButton = "text" | "contained" | "outlined";
type ColorGeneralButton =
  | "error"
  | "info"
  | "inherit"
  | "primary"
  | "secondary"
  | "success"
  | "warning";

interface DataGeneralButton {
  title: string;
  variantButton: VariantGeneralButton;
  colorButton: ColorGeneralButton;
  handleClick?: any;
  paddingButton?: string;
}

const GeneralButton: React.FC<DataGeneralButton> = ({
  title,
  variantButton,
  colorButton,
  handleClick,
  paddingButton,
}) => {
  return (
    <>
      <div>
        <Button
          size="small"
          color={colorButton}
          fullWidth
          sx={{
            fontSize: "12px",
            textTransform: "none",
            width: "100%",
            padding: paddingButton ? paddingButton : null,
          }}
          variant={variantButton}
          onClick={handleClick}
        >
          {title}
        </Button>
      </div>
    </>
  );
};

export default GeneralButton;
