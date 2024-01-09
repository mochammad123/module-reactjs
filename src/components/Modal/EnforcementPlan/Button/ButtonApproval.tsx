import React from "react";
import GeneralButton from "../../../../modules/button/GeneralButton";

interface IButton {
  data?: any;
  handleApproval?: any;
  handleReject?: any;
}

const ButtonApproval: React.FC<IButton> = ({
  data,
  handleApproval,
  handleReject,
}) => {
  return (
    <div className="flex justify-between items-center gap-4 mt-3">
      <div></div>
      <div className="flex gap-3">
        {data == "wait" ? (
          <>
            <div className="w-28">
              <GeneralButton
                title="Reject"
                variantButton="contained"
                colorButton="error"
                handleClick={handleReject}
              />
            </div>

            <div className="w-28">
              <GeneralButton
                title="Approval"
                variantButton="contained"
                colorButton="success"
                handleClick={handleApproval}
              />
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default ButtonApproval;
