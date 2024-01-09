import React, { useState } from "react";
import Table from "../../../modules/table/agGrid/Table";
import Check from "../../../assets/img/status/check.png";
import Schedule from "../../../assets/img/status/schedule.png";
import Pending from "../../../assets/img/status/pending.png";
import Cancel from "../../../assets/img/status/cancel.png";
import useDeliberationApi from "../../../apis/budget/deliberationApi";
import useMenuApi from "../../../apis/menu/menuApi";
import useEnfocementPlanApi from "../../../apis/budget/enforcementPlanApi";

const TableEnforcementPlan = () => {
  const [isAsc, setIsAsc] = useState<boolean | null>(true);

  const columnDefs = [
    {
      headerName: "Status",
      field: "approvalStatus",
      minWidth: 70,
      flex: 1,
      resizable: true,
      cellStyle: { fontSize: "12px" },
      suppressToolTips: false,
      tooltipField: "approvalStatus",
      cellRenderer: (params: any) => {
        const icon =
          params?.value == "approved" ? (
            <img src={Check} alt="Status Image" className="icon-status" />
          ) : params?.value == "wait" ? (
            <img src={Schedule} alt="Status Image" className="icon-status" />
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
      minWidth: 220,
      flex: 1,
      resizable: true,
      cellStyle: { fontSize: "12px" },
      suppressToolTips: false,
      tooltipField: "sectionName",
    },
    {
      headerName: "Fiscal Year",
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
      minWidth: 250,
      flex: 1,
      resizable: true,
      cellStyle: { fontSize: "12px" },
      suppressToolTips: false,
      tooltipField: "investPlanName",
    },
    {
      headerName: "Investment Group",
      field: "investGroupName",
      minWidth: 250,
      flex: 1,
      resizable: true,
      cellStyle: { fontSize: "12px" },
      suppressToolTips: false,
      tooltipField: "investGroupName",
    },
    {
      headerName: "Proposal Category",
      field: "proposalCatName",
      minWidth: 140,
      flex: 1,
      resizable: true,
      cellStyle: { fontSize: "12px" },
      suppressToolTips: false,
      tooltipField: "proposalCatName",
    },
    {
      headerName: "Currency",
      field: "currency",
      minWidth: 100,
      flex: 1,
      resizable: true,
      cellStyle: { fontSize: "12px" },
      suppressToolTips: false,
      tooltipField: "currency",
      cellRenderer: (params: any) => {
        const currency = params?.value ? params?.value?.toUpperCase() : "";
        return currency;
      },
    },
    {
      headerName: "Original Currency Amount",
      field: "totalAmount",
      cellRenderer: (params: any) => {
        const formattedValue = new Intl.NumberFormat("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(params.value);
        return formattedValue;
      },
      cellClass: "text-right",
      minWidth: 120,
      flex: 1,
      resizable: true,
      cellStyle: { fontSize: "12px" },
      suppressToolTips: false,
      tooltipField: "totalAmount",
    },
    {
      headerName: "Original Currency Amount (USD)",
      field: "totalAmountUsd",
      cellRenderer: (params: any) => {
        const formattedValue = new Intl.NumberFormat("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
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
    {
      headerName: "Approved Amount (USD)",
      field: "approvedAmmountUsd",
      minWidth: 150,
      flex: 1,
      resizable: true,
      cellStyle: { fontSize: "12px" },
      suppressToolTips: false,
      tooltipField: "approvedAmmountUsd",
      cellClass: "text-right",
      cellRenderer: (params: any) => {
        var formattedValue = new Intl.NumberFormat("en-US", {
          minimumFractionDigits: 2,
        }).format(params.value);
        return formattedValue;
      },
      sortable: true,
    },
    {
      headerName: "Balance (USD)",
      field: "epBalance",
      minWidth: 150,
      flex: 1,
      resizable: true,
      cellStyle: { fontSize: "12px" },
      suppressToolTips: false,
      tooltipField: "epBalance",
      cellClass: "text-right",
      cellRenderer: (params: any) => {
        var formattedValue = new Intl.NumberFormat("en-US", {
          minimumFractionDigits: 2,
        }).format(params.value);
        return formattedValue;
      },
      sortable: true,
    },
    {
      headerName: "Proposal Date",
      field: "proposeDatePlan",
      minWidth: 130,
      flex: 1,
      resizable: true,
      cellStyle: { fontSize: "12px" },
      suppressToolTips: false,
      tooltipField: "proposeDatePlan",
      cellRenderer: (params: any) => {
        var date = params.value.split("-");
        var month = date[1];
        var monthName =
          month == "01"
            ? "Jan"
            : month == "02"
            ? "Feb"
            : month == "03"
            ? "Mar"
            : month == "04"
            ? "Apr"
            : month == "05"
            ? "May"
            : month == "06"
            ? "Jun"
            : month == "07"
            ? "Jul"
            : month == "08"
            ? "Aug"
            : month == "09"
            ? "Sep"
            : month == "10"
            ? "Oct"
            : month == "11"
            ? "Nov"
            : "Dec";
        return date[2] + "-" + monthName + "-" + date[0];
      },
    },
    {
      headerName: "Completion Date",
      field: "completionDatePlan",
      minWidth: 130,
      flex: 1,
      resizable: true,
      cellStyle: { fontSize: "12px" },
      suppressToolTips: false,
      tooltipField: "completionDatePlan",
      cellRenderer: (params: any) => {
        var date = params.value.split("-");
        var month = date[1];
        var monthName =
          month == "01"
            ? "Jan"
            : month == "02"
            ? "Feb"
            : month == "03"
            ? "Mar"
            : month == "04"
            ? "Apr"
            : month == "05"
            ? "May"
            : month == "06"
            ? "Jun"
            : month == "07"
            ? "Jul"
            : month == "08"
            ? "Aug"
            : month == "09"
            ? "Sep"
            : month == "10"
            ? "Oct"
            : month == "11"
            ? "Nov"
            : "Dec";
        return date[2] + "-" + monthName + "-" + date[0];
      },
    },
  ];

  const { dataDeliberation, isLoadingDeliberation, getDeliberationPagination } =
    useDeliberationApi();

  const { setShow, setDataDoubleClick, dataEpPagination } =
    useEnfocementPlanApi();

  const { menus } = useMenuApi();

  const dataDeliberationIndex = dataDeliberation?.data?.map(
    (deliberation: any, index: number) => ({
      ...deliberation,
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
        case "totalAmount":
          sortBy = "totalamount";
          break;
        case "totalAmountUsd":
          sortBy = "totalamountUsd";
          break;
        case "approvedAmmountUsd":
          sortBy = "totalamountapproved";
          break;

        default:
          sortBy = "";
          break;
      }

      if (isAsc) {
        getDeliberationPagination({
          ...dataEpPagination,
          sortBy: sortBy,
          sortDirection: "desc",
        });
      } else {
        getDeliberationPagination({
          ...dataEpPagination,
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
        rowData={dataDeliberationIndex}
        isLoading={isLoadingDeliberation}
        sizeTable={400}
        doubleClick={(params: any) => {
          const data = params?.data;
          const budgetNumber = data?.budgetNumber;
          const investPlanName = data?.investPlanName;
          const fiscalYearId = data?.fiscalYearId;
          const approvalItems = data?.approval?.approvalItems;
          setDataDoubleClick({
            budgetNumber,
            investPlanName,
            fiscalYearId,
            approvalItems,
          });
          setShow(true);
        }}
        onSortChanged={dataEpPagination?.perPage == 0 ? null : onSortChanged}
      />
    </>
  );
};

export default TableEnforcementPlan;
