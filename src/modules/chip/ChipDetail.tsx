import { Chip } from "@mui/material";
import React from "react";

interface IChip {
  title: string;
  color?: string;
}

const ChipDetail: React.FC<IChip> = ({ title, color }) => {
  return (
    <>
      <Chip
        size="small"
        label={title}
        variant="filled"
        className="font-light w-20"
        sx={{
          margin: 0,
          padding: 0,
          height: 15,
          color: "white",
          bgcolor: color ? color : "gray",
          fontSize: "10px",
        }}
      />
    </>
  );
};

export default ChipDetail;
