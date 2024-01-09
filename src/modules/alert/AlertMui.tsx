import { Alert } from "@mui/material";
import React from "react";

type Severity = "error" | "warning" | "info" | "success";

interface IAlert {
  title?: string;
  severity?: Severity;
}

const AlertMui: React.FC<IAlert> = ({ title, severity }) => {
  return (
    <div>
      <Alert severity={severity}>{title}</Alert>
    </div>
  );
};

export default AlertMui;
