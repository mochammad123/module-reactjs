import CreateButton from "../../../modules/button/CreateButton";
import RejectButton from "../../../modules/button/RejectButton";
import WaitButton from "../../../modules/button/WaitButton";
import SearchButton from "../../../modules/button/SearchButton";
import useBudgetPlanApi from "../../../apis/budget/budgetPlanApi";
import useMenuApi from "../../../apis/menu/menuApi";
import React from "react";
import GeneralButton from "../../../modules/button/GeneralButton";

interface IHeaderButton {
  reject?: string;
  setReject?: any;
  waiting?: boolean;
  setWaiting?: any;
  search?: string;
  setSearch?: any;
}

const HeaderButton: React.FC<IHeaderButton> = ({
  reject,
  setReject,
  waiting,
  setWaiting,
  search,
  setSearch,
}) => {
  const {
    setShow,
    approval,
    setDataDoubleClick,
    getBudgetPlanPagination,
    dataBudgetPlanPagination,
  } = useBudgetPlanApi();
  const { stateMenuData } = useMenuApi();

  const handleShow = () => {
    setShow(true);
    setDataDoubleClick(null);
  };

  const handleReject = () => {
    if (reject == "rejected") {
      setReject("");
      getBudgetPlanPagination({
        ...dataBudgetPlanPagination,
        approvalStatus: "",
        isWaitApproval: false,
      });
    } else {
      setReject("rejected");
      getBudgetPlanPagination({
        ...dataBudgetPlanPagination,
        approvalStatus: "rejected",
        isWaitApproval: false,
      });
    }
  };

  const handleWait = () => {
    if (waiting) {
      setWaiting(false);
      getBudgetPlanPagination({
        ...dataBudgetPlanPagination,
        approvalStatus: "",
        isWaitApproval: false,
      });
    } else {
      setWaiting(true);
      getBudgetPlanPagination({
        ...dataBudgetPlanPagination,
        approvalStatus: "",
        isWaitApproval: true,
      });
    }
  };

  const handleSearch = (e: any) => {
    e.preventDefault();

    getBudgetPlanPagination({
      ...dataBudgetPlanPagination,
      keyWord: search,
    });
  };

  const handleReset = (e: any) => {
    e.preventDefault();

    getBudgetPlanPagination({
      ...dataBudgetPlanPagination,
      page: 1,
      perPage: 25,
      keyWord: "",
      sortBy: "",
      sortDirection: "",
      isWaitApproval: false,
    });
  };

  return (
    <div className="flex justify-between items-center my-1">
      <div className="flex items-center gap-4">
        {stateMenuData?.employee?.position?.positionLevel == 2 ? (
          <CreateButton title="Add New" handleButton={handleShow} />
        ) : undefined}

        {approval?.rejectCount > 0 ? (
          <RejectButton
            title="Rejected Budget"
            count={approval?.rejectCount}
            reject={reject}
            handleReject={handleReject}
          />
        ) : undefined}
        {approval?.waitCount > 0 ? (
          <WaitButton
            title="Waiting Budget"
            count={approval?.waitCount}
            waiting={waiting}
            handleWaiting={handleWait}
          />
        ) : undefined}
      </div>
      <div className="flex">
        <div>
          <GeneralButton
            title="Reset"
            colorButton="info"
            variantButton="outlined"
            paddingButton="4px"
            handleClick={handleReset}
          />
        </div>
        <form onSubmit={handleSearch}>
          <SearchButton value={search} setValue={setSearch} />
        </form>
      </div>
    </div>
  );
};

export default HeaderButton;
