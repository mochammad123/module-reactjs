import { Button } from "@mui/material";
import React from "react";

interface DataButtonResponse {
  title: string;
  handleButton?: () => void;
}

const CreateButton: React.FC<DataButtonResponse> = ({
  title,
  handleButton,
}) => {
  return (
    <>
      <Button
        variant="contained"
        className="md:w-auto w-full text-xs"
        size="small"
        disableElevation
        sx={{ textTransform: "none" }}
        onClick={handleButton}
      >
        {title}
      </Button>
    </>
  );
};

export default CreateButton;
