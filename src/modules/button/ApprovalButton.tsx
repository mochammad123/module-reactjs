import { Button } from "@mui/material";
import React from "react";

interface DataApprovalButton {
  title: string;
  handleClick?: () => void;
}

const ApprovalButton: React.FC<DataApprovalButton> = ({
  title,
  handleClick,
}) => {
  return (
    <>
      <Button
        sx={{
          height: "20px",
          fontSize: "12px",
          textTransform: "none",
          borderRadius: "25px",
        }}
        variant="outlined"
        onClick={handleClick}
      >
        {title}
      </Button>
    </>
  );
};

export default ApprovalButton;
