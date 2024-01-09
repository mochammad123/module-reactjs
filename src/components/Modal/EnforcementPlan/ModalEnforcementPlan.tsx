import { useEffect, useState } from "react";
import Modal from "../../../modules/modal/Modal";
import useEnfocementPlanApi from "../../../apis/budget/enforcementPlanApi";
import ReactLoading from "react-loading";
import GeneralButton from "../../../modules/button/GeneralButton";
import ModalAddNewItem from "./ModalAddNewItem";
import Check from "../../../assets/img/status/check.png";
import Schedule from "../../../assets/img/status/schedule.png";
import Table from "../../../modules/table/agGrid/Table";
import ModalDetailAddNew from "./ModalDetailAddNew";

const ModalEnforcementPlan = () => {
  const {
    isLoadingEpByBudget,
    isLoading,
    getEnforcementByBudget,
    dataDoubleClick,
    setShow,
    showAddNew,
    setShowAddNew,
    dataEpByBudget,
  } = useEnfocementPlanApi();

  const { budgetNumber, investPlanName } = dataDoubleClick;

  const [showDetailAddNew, setShowDetailAddNew] = useState<boolean>(false);
  const [enforcementId, setEnforcementId] = useState<number>(0);

  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    getEnforcementByBudget(budgetNumber);
  }, [dataDoubleClick]);

  const columnDefs = [
    {
      headerName: "Approval",
      field: "needYorApproval",
      minWidth: 90,
      maxWidth: 90,
      flex: 1,
      resizable: true,
      cellRenderer: (params: any) => {
        const icon = params?.value ? (
          <img src={Schedule} alt="Status Image" className="icon-status" />
        ) : (
          <img src={Check} alt="Status Image" className="icon-status" />
        );
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            {icon}
          </div>
        );
      },
      cellStyle: {
        fontSize: "12px",
        textAlign: "center",
      },
      suppressToolTips: false,
      tooltipValueGetter: (params: any) => {
        return params.value ? "Wait" : "Approved";
      },
    },
    {
      headerName: "Invest Number",
      field: "investNumber",
      minWidth: 130,
      maxWidth: 130,
      resizable: true,
      cellStyle: { fontSize: "12px" },
      suppressToolTips: false,
      tooltipField: "investNumber",
    },
    {
      headerName: "Enforcement Plan Explain",
      field: "enfPlanExplain",
      minWidth: 200,
      flex: 1,
      resizable: true,
      cellStyle: { fontSize: "12px" },
      suppressToolTips: false,
      tooltipField: "enfPlanExplain",
    },
    {
      headerName: "Amount (USD)",
      field: "totalAmountUsd",
      cellRenderer: (params: any) => {
        var formattedValue = new Intl.NumberFormat("en-US", {
          minimumFractionDigits: 2,
        }).format(params.value);
        return formattedValue;
      },
      cellClass: "text-right",
      minWidth: 150,
      maxWidth: 150,
      resizable: true,
      cellStyle: { fontSize: "12px" },
      suppressToolTips: false,
      tooltipField: "totalAmountUsd",
    },
  ];

  const dataEpByBudgetIndex = dataEpByBudget?.data?.map(
    (deliberation: any, index: number) => ({
      ...deliberation,
      index: index + 1,
    })
  );

  return (
    <>
      <Modal
        name="Enfocement Plan"
        size="6xl"
        setShow={handleClose}
        loading={isLoading}
      >
        {isLoadingEpByBudget ? (
          <div className="h-96">
            <div className="flex h-full">
              <div className="m-auto">
                <ReactLoading type="spin" color="#0B2447" />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col mt-3">
            <p className="font-semibold">{budgetNumber}</p>
            <p className="font-normal">{investPlanName}</p>
            <div className="w-28 mt-3">
              <GeneralButton
                colorButton="primary"
                title="Add New"
                variantButton="contained"
                handleClick={() => setShowAddNew(true)}
              />
            </div>
            <div className="mt-3">
              <Table
                columnDefs={columnDefs}
                isLoading={isLoadingEpByBudget}
                rowData={dataEpByBudgetIndex}
                sizeTable={350}
                doubleClick={(params: any) => {
                  setEnforcementId(params?.data?.id);
                  setShowDetailAddNew(true);
                }}
              />
            </div>
          </div>
        )}
      </Modal>

      {showAddNew ? <ModalAddNewItem /> : null}
      {showDetailAddNew ? (
        <ModalDetailAddNew
          setShowDetailAddNew={setShowDetailAddNew}
          enforcementId={enforcementId}
        />
      ) : null}
    </>
  );
};

export default ModalEnforcementPlan;
