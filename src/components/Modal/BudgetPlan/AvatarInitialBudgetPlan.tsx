import React from "react";
import AvatarInitial from "../../../modules/avatar/AvatarInitial";

interface IAvatarInitial {
  data?: any;
}

const AvatarInitialBudgetPlan: React.FC<IAvatarInitial> = ({ data }) => {
  return (
    <>
      {data?.id && data?.approvalItems?.length > 0
        ? data?.approvalItems?.map((item: any, index: number) => {
            return (
              <>
                <AvatarInitial
                  index={index}
                  item={item?.employee?.initial}
                  color={
                    item?.approvalStatus == "approved"
                      ? "#508D69"
                      : item?.approvalStatus == "wait"
                      ? "#FF9800"
                      : item?.approvalStatus == "none"
                      ? "gray"
                      : "#BF3131"
                  }
                />
              </>
            );
          })
        : data?.length > 0
        ? data?.map((item: any, index: number) => {
            if (!item?.initial) return null;

            return (
              <>
                <AvatarInitial index={index} item={item?.initial} />
              </>
            );
          })
        : null}
    </>
  );
};

export default AvatarInitialBudgetPlan;
