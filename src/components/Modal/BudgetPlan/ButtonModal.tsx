import React, { useEffect } from "react";
import GeneralButton from "../../../modules/button/GeneralButton";
import { IButtonModal } from "../../../interface/BudgetPlan/IBudgetPlan";
import useMenuApi from "../../../apis/menu/menuApi";
import useBudgetPlanApi from "../../../apis/budget/budgetPlanApi";

const ButtonModal: React.FC<IButtonModal> = ({
  data,
  handleSave,
  handleUpdate,
  handleDelete,
  handleApproval,
  handleReject,
}) => {
  const { menus } = useMenuApi();
  const { hasPic, setHasPic, countApprovedItem, setCountApprovedItem } =
    useBudgetPlanApi();

  useEffect(() => {
    const isHasPic = data?.approval?.approvalItems?.some((item: any) => {
      if (item?.employee == null) {
        return false;
      }

      return (
        item?.employee?.id == menus?.data?.employee?.id &&
        item?.empPositition?.positionLevel == 2 &&
        item?.isAccounting == false
      );
    });

    if (isHasPic) {
      setHasPic(isHasPic);
    }

    const approvedItem = data?.approval?.approvalItems?.filter(
      (item: any) => item.isApproved == true
    );
    const isCountApprovedItem = approvedItem?.length;

    if (isCountApprovedItem) {
      setCountApprovedItem(isCountApprovedItem);
    }
  }, [data, menus]);
  return (
    <div className="flex justify-between items-center gap-4 mt-3">
      <div>
        {data ? (
          hasPic && countApprovedItem == 1 ? (
            <div className="w-28">
              <GeneralButton
                title="Delete"
                variantButton="outlined"
                colorButton="error"
                handleClick={handleDelete}
              />
            </div>
          ) : null
        ) : null}
      </div>
      <div className="flex gap-3">
        {data ? (
          <>
            {data?.yourApprovalStatus == "wait" ? (
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

            {hasPic && countApprovedItem == 1 ? (
              <div className="w-28">
                <GeneralButton
                  title="Update"
                  variantButton="contained"
                  colorButton="info"
                  handleClick={handleUpdate}
                />
              </div>
            ) : null}
          </>
        ) : (
          <div className="w-28">
            <GeneralButton
              title="Save"
              variantButton="contained"
              colorButton="info"
              handleClick={handleSave}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ButtonModal;
