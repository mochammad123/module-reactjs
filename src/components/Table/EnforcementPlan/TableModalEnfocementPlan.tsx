import Table from "../../../modules/table/agGrid/Table";
import Check from "../../../assets/img/status/check.png";
import Schedule from "../../../assets/img/status/schedule.png";
import useEnfocementPlanApi from "../../../apis/budget/enforcementPlanApi";

const TableModalEnfocementPlan = () => {
  const { dataEpByBudget, isLoadingEpByBudget } = useEnfocementPlanApi();

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
      <Table
        columnDefs={columnDefs}
        isLoading={isLoadingEpByBudget}
        rowData={dataEpByBudgetIndex}
        sizeTable={350}
      />
    </>
  );
};

export default TableModalEnfocementPlan;
