import React from "react";
import GeneralButton from "./GeneralButton";

interface IRejectButton {
  handleReject?: any;
}

const RejectApprovalButton: React.FC<IRejectButton> = ({ handleReject }) => {
  return (
    <div className="flex justify-end items-center mt-3">
      <GeneralButton
        title="Reject"
        variantButton="contained"
        colorButton="info"
        handleClick={handleReject}
      />
    </div>
  );
};

export default RejectApprovalButton;
