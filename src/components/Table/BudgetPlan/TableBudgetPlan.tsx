import React, { useEffect, useState } from "react";
import useBudgetPlanApi from "../../../apis/budget/budgetPlanApi";
import Table from "../../../modules/table/agGrid/Table";
import Check from "../../../assets/img/status/check.png";
import Schedule from "../../../assets/img/status/schedule.png";
import Pending from "../../../assets/img/status/pending.png";
import Cancel from "../../../assets/img/status/cancel.png";

interface ITableBudgetPlan {
  perPage?: number;
}

const TableBudgetPlan: React.FC<ITableBudgetPlan> = ({ perPage }) => {
  const {
    dataBudgetPlan,
    getBudgetPlanPagination,
    isLoadingGetBudgetPlan,
    setApproval,
    setDataDoubleClick,
    dataBudgetPlanPagination,
    setShow,
  } = useBudgetPlanApi();

  const [isAsc, setIsAsc] = useState<boolean | null>(true);

  useEffect(() => {
    setApproval({
      rejectCount: dataBudgetPlan?.yourApprovalRejectedCount,
      waitCount: dataBudgetPlan?.yourApprovalWaitCount,
    });
  }, [dataBudgetPlan]);

  var columnDefs = [
    {
      headerName: "Status",
      marryChildren: true,
      children: [
        {
          headerName: "Budget",
          field: "approval.accountingApproved",
          minWidth: 100,
          maxWidth: 100,
          flex: 1,
          cellRenderer: (params: any) => {
            const icon = params?.value ? (
              <img src={Check} alt="Status Image" className="icon-status" />
            ) : (
              <img src={Schedule} alt="Status Image" className="icon-status" />
            );
            return (
              <div style={{ display: "flex", justifyContent: "center" }}>
                {icon}
              </div>
            );
          },
          cellStyle: { fontSize: "12px" },
          suppressToolTips: true,
          tooltipValueGetter: function (params: any) {
            return params.value ? "Approved" : "Wait";
          },
        },
        {
          headerName: "Deliberation",
          field: "approvalStatus",
          minWidth: 110,
          maxWidth: 110,
          flex: 1,
          cellRenderer: (params: any) => {
            const icon =
              params?.value == "approved" ? (
                <img src={Check} alt="Status Image" className="icon-status" />
              ) : params?.value == "wait" ? (
                <img
                  src={Schedule}
                  alt="Status Image"
                  className="icon-status"
                />
              ) : params?.value == "postpone" ? (
                <img src={Pending} alt="Status Image" className="icon-status" />
              ) : (
                <img src={Cancel} alt="Status Image" className="icon-status" />
              );
            return (
              <div style={{ display: "flex", justifyContent: "center" }}>
                {icon}
              </div>
            );
          },
          cellStyle: { fontSize: "12px" },
          suppressToolTips: false,
          tooltipField: "approvalStatus",
          align: "center",
        },
      ],
      headerClass: "custom-header-group",
    },
    {
      headerName: "Budget No.",
      field: "budgetNumber",
      minWidth: 100,
      flex: 1,
      resizable: true,
      cellStyle: { fontSize: "12px" },
      suppressToolTips: false,
      tooltipField: "budgetNumber",
    },
    {
      headerName: "Section",
      field: "sectionName",
      minWidth: 150,
      flex: 1,
      resizable: true,
      cellStyle: { fontSize: "12px" },
      suppressToolTips: false,
      tooltipField: "sectionName",
    },
    {
      headerName: "Fiscal Years",
      field: "fiscalYearName",
      minWidth: 70,
      flex: 1,
      resizable: true,
      cellStyle: { fontSize: "12px" },
      suppressToolTips: false,
      tooltipField: "fiscalYearName",
    },
    {
      headerName: "Invest Plan Name",
      field: "investPlanName",
      minWidth: 205,
      flex: 1,
      resizable: true,
      cellStyle: { fontSize: "12px" },
      suppressToolTips: false,
      tooltipField: "investPlanName",
    },
    {
      headerName: "Investment Group",
      field: "investGroupName",
      minWidth: 140,
      flex: 1,
      resizable: true,
      cellStyle: { fontSize: "12px" },
      suppressToolTips: false,
      tooltipField: "investGroupName",
    },
    {
      headerName: "Total Amount (USD)",
      field: "totalAmountUsd",
      cellRenderer: function (params: any) {
        const formattedValue = new Intl.NumberFormat("en-US", {
          minimumFractionDigits: 2,
        }).format(params.value);
        return formattedValue;
      },
      cellClass: "text-right",
      minWidth: 120,
      flex: 1,
      resizable: true,
      cellStyle: { fontSize: "12px" },
      suppressToolTips: false,
      tooltipField: "totalAmountUsd",
    },
  ];

  const dataBudgetPlanIndex = dataBudgetPlan?.data?.map(
    (budgetPlan: any, index: number) => ({
      ...budgetPlan,
      index: index + 1,
    })
  );

  const onSortChanged = (e: any) => {
    setIsAsc(!isAsc);

    const columnState = e?.columnApi?.getColumnState();
    const sortColumns = columnState?.filter((col: any) => col?.sort !== null);

    if (sortColumns?.length > 0) {
      const sortCol = sortColumns[0]?.colId;

      columnState?.forEach((col: any) => {
        if (col?.colId != sortCol) {
          col.sort = null;
        }
      });

      let sortBy = "";
      switch (sortCol) {
        case "budgetNumber":
          sortBy = "budgetNumber";
          break;
        case "sectionName":
          sortBy = "section";
          break;
        case "fiscalYearName":
          sortBy = "fiscalyear";
          break;
        case "investGroupName":
          sortBy = "investgroup";
          break;
        case "description":
          sortBy = "description";
          break;
        case "totalAmountUsd":
          sortBy = "totalamount";
          break;

        default:
          sortBy = "";
          break;
      }

      if (isAsc) {
        getBudgetPlanPagination({
          ...dataBudgetPlanPagination,
          sortBy: sortBy,
          sortDirection: "desc",
        });
      } else {
        getBudgetPlanPagination({
          ...dataBudgetPlanPagination,
          sortBy: sortBy,
          sortDirection: "asc",
        });
      }
    }
  };

  return (
    <>
      <Table
        columnDefs={columnDefs}
        rowData={dataBudgetPlanIndex}
        isLoading={isLoadingGetBudgetPlan}
        doubleClick={(params: any) => {
          setDataDoubleClick(params?.data);
          setShow(true);
        }}
        onSortChanged={perPage == 0 ? null : onSortChanged}
      />
    </>
  );
};

export default TableBudgetPlan;
