import { Chip } from "@mui/material";
import React from "react";

type Color =
  | "default"
  | "error"
  | "info"
  | "primary"
  | "secondary"
  | "success"
  | "warning";
type Size = "medium" | "small";
type Variant = "filled" | "outlined";

interface IChip {
  label?: string;
  variant?: Variant;
  color?: Color;
  size?: Size;
  icon?: any;
  handleClick?: () => void;
}

const ChipMui: React.FC<IChip> = ({
  label,
  variant,
  color,
  size,
  icon,
  handleClick,
}) => {
  return (
    <>
      <Chip
        label={label}
        variant={variant}
        color={color}
        size={size}
        clickable
        icon={icon}
        onClick={handleClick}
        className="w-full"
      />
    </>
  );
};

export default ChipMui;
