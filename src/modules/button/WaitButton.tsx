import { Badge, Button } from "@mui/material";
import React from "react";

interface DataWaitButton {
  title?: string;
  count?: number;
  waiting?: boolean;
  handleWaiting?: () => void;
}

const WaitButton: React.FC<DataWaitButton> = ({
  title,
  count,
  waiting,
  handleWaiting,
}) => {
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <Button
        variant={waiting ? "contained" : "outlined"}
        className="md:w-auto w-full text-xs"
        size="small"
        color="warning"
        disableElevation
        sx={{ textTransform: "none" }}
        onClick={handleWaiting}
      >
        {title}
      </Button>
      <Badge
        badgeContent={count}
        color="warning"
        className="absolute -top-3 start-100 translate-middle"
      />
    </div>
  );
};

export default WaitButton;
