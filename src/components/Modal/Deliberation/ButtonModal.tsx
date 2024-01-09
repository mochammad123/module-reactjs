import React from "react";
import GeneralButton from "../../../modules/button/GeneralButton";
import { IButtonModal } from "../../../interface/Deliberation/IDeliberation";

const ButtonModal: React.FC<IButtonModal> = ({
  yourApprovalStatus,
  handleSave,
}) => {
  return (
    <div className="flex justify-end items-center gap-4 mt-3">
      {yourApprovalStatus == "wait" ? (
        <>
          <div className="w-28">
            <GeneralButton
              title="Save"
              variantButton="contained"
              colorButton="info"
              handleClick={handleSave}
            />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default ButtonModal;
