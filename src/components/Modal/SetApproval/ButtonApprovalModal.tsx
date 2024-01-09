import React from "react";
import GeneralButton from "../../../modules/button/GeneralButton";

interface IButtonApproval {
  handleClick?: any;
}

const ButtonApprovalModal: React.FC<IButtonApproval> = ({ handleClick }) => {
  return (
    <div className="flex justify-end items-center gap-4 mt-3">
      <div className="w-28">
        <GeneralButton
          title="Set"
          variantButton="contained"
          colorButton="info"
          handleClick={handleClick}
        />
      </div>
    </div>
  );
};

export default ButtonApprovalModal;
