import { Badge, Button } from "@mui/material";
import React from "react";

interface DataRejectButton {
  title?: string;
  count?: number;
  reject?: string;
  handleReject?: () => void;
}

const RejectButton: React.FC<DataRejectButton> = ({
  title,
  count,
  reject,
  handleReject,
}) => {
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <Button
        variant={reject == "rejected" ? "contained" : "outlined"}
        className="md:w-auto w-full text-xs"
        size="small"
        color="error"
        disableElevation
        sx={{ textTransform: "none" }}
        onClick={handleReject}
      >
        {title}
      </Button>
      <Badge
        badgeContent={count}
        color="error"
        className="absolute -top-3 start-100 translate-middle"
      />
    </div>
  );
};

export default RejectButton;
