import { Avatar } from "@mui/material";
import React from "react";
type wait = "#FF9800";
type approv = "#508D69";
type cancel = "#BF3131";
type Color = "gray" | wait | cancel | approv;

interface DataAvatar {
  index?: number;
  item?: string;
  color?: Color;
}

const AvatarInitial: React.FC<DataAvatar> = ({ index, item, color }) => {
  return (
    <Avatar
      className="-mr-1.5"
      sx={{
        width: "30px",
        height: "30px",
        bgcolor: color ? color : "gray",
        zIndex: index ? 1 + index : 1,
      }}
    >
      <p className="text-xs">{item}</p>
    </Avatar>
  );
};

export default AvatarInitial;
