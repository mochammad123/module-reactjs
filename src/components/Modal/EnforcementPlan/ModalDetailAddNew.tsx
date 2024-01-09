import React, { useEffect, useState } from "react";
import Modal from "../../../modules/modal/Modal";
import useEnfocementPlanApi from "../../../apis/budget/enforcementPlanApi";
import ReactLoading from "react-loading";
import Table from "../../../modules/table/agGrid/Table";
import ApprovalButton from "../../../modules/button/ApprovalButton";
import AvatarInitialBudgetPlan from "../BudgetPlan/AvatarInitialBudgetPlan";
import ModalDetailApproval from "../../../modules/modal/ModalDetailApproval";
import ButtonApproval from "./Button/ButtonApproval";
import Swal from "sweetalert2";
import ModalRejectApproval from "../../../modules/modal/ModalRejectApproval";
import useDeliberationApi from "../../../apis/budget/deliberationApi";
import useApprovalApi from "../../../apis/approval/approvalApi";

interface IModalDetailAddNew {
  setShowDetailAddNew?: any;
  enforcementId?: number;
}

const columnDefs = [
  {
    headerName: "Item Name",
    field: "investName",
    minWidth: 150,
    flex: 1,
    resizable: true,
    cellStyle: { fontSize: "12px" },
    suppressToolTips: false,
    tooltipField: "investName",
  },
  {
    headerName: "Supplier",
    field: "supplierName",
    minWidth: 150,
    flex: 1,
    resizable: true,
    cellStyle: { fontSize: "12px" },
    suppressToolTips: false,
    tooltipField: "supplierName",
  },
  {
    headerName: "Invest Number",
    field: "investDetailNumber",
    minWidth: 130,
    flex: 1,
    resizable: true,
    cellStyle: { fontSize: "12px" },
    suppressToolTips: false,
    tooltipField: "investDetailNumber",
  },
  {
    headerName: "Completion Plan",
    field: "completionDatePlan",
    minWidth: 80,
    maxWidth: 130,
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
  {
    headerName: "Currency",
    field: "currency",
    minWidth: 90,
    flex: 1,
    resizable: true,
    cellStyle: { fontSize: "12px" },
    suppressToolTips: false,
    tooltipField: "currency",
    cellRenderer: (params: any) => {
      if (params.node.data.currency === "idr") {
        return "IDR"; // Indonesian Rupiah
      } else if (params.node.data.currency === "eur") {
        return "EUR"; // Euro
      } else if (params.node.data.currency === "jpy") {
        return "JPY"; // Japanese Yen
      } else if (params.node.data.currency === "sgd") {
        return "SGD"; // Singapore Dollar
      } else if (params.node.data.currency === "usd") {
        return "USD"; // US Dollar
      }
    },
  },
  {
    headerName: "Exchange Rate",
    field: "currencyRates",
    minWidth: 100,
    flex: 1,
    resizable: true,
    cellStyle: { fontSize: "12px" },
    cellClass: "text-right",
    suppressToolTips: false,
    tooltipField: "currencyRates",
    cellRenderer: (params: any) => {
      var formattedValue = new Intl.NumberFormat(undefined, {
        minimumFractionDigits: 2,
      }).format(params.value);
      return formattedValue;
    },
  },
  {
    headerName: "Price",
    field: "unitPrice",
    minWidth: 150,
    flex: 1,
    resizable: true,
    cellStyle: { fontSize: "12px" },
    cellClass: "text-right",
    suppressToolTips: false,
    tooltipField: "unitPrice",
    cellRenderer: (params: any) => {
      return params.value.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    },
  },
  {
    headerName: "Qty",
    field: "qty",
    minWidth: 50,
    flex: 1,
    resizable: true,
    cellStyle: { fontSize: "12px" },
    cellClass: "text-right",
    suppressToolTips: false,
    tooltipField: "qty",
  },
  {
    headerName: "Total (USD)",
    field: "totalAmountUsd",
    minWidth: 150,
    flex: 1,
    resizable: true,
    cellStyle: { fontSize: "12px" },
    cellClass: "text-right",
    suppressToolTips: false,
    tooltipField: "totalAmountUsd",
    cellRenderer: (params: any) => {
      var formattedValue = new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
      }).format(params.value);
      return formattedValue;
    },
  },
];

const ModalDetailAddNew: React.FC<IModalDetailAddNew> = ({
  setShowDetailAddNew,
  enforcementId,
}) => {
  const {
    isLoadingEnforcementDetail,
    getEnforcementDetail,
    dataEnforcementDetail,
    setShow,
    dataEpPagination,
  } = useEnfocementPlanApi();

  const { getDeliberationPagination } = useDeliberationApi();

  const { approvalEnforcement, rejectEnforcement, isLoadingApproval } =
    useApprovalApi();

  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [showReject, setShowReject] = useState<boolean>(false);
  const [note, setNote] = useState<string | null>(null);

  useEffect(() => {
    if (enforcementId) {
      getEnforcementDetail(enforcementId);
    }
  }, [enforcementId]);

  const data = (
    <div className="flex flex-row gap-4">
      <p>Fiscal Year : {dataEnforcementDetail?.data?.fiscalYearName}</p>
      <p>Budget Number : {dataEnforcementDetail?.data?.budgetNumber}</p>
    </div>
  );

  console.log(dataEnforcementDetail);

  const handleClose = () => {
    setShowDetailAddNew(false);
  };

  const handleShowDetail = () => {
    setShowDetail(true);
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
  };

  const handleApproval = async () => {
    const isConfirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve it!",
    }).then((result) => {
      return result.isConfirmed;
    });

    if (!isConfirm) {
      return;
    }

    const response = await approvalEnforcement(dataEnforcementDetail?.data?.id);
    if (response?.success) {
      setShowDetailAddNew(false);
      setShow(false);

      getDeliberationPagination(dataEpPagination);
    }
  };

  const handleShowReject = () => {
    setShowReject(true);
  };

  const handleValidate = () => {
    if (!note || note == " " || note == "") {
      Swal.fire({
        icon: "error",
        title: "Opss...",
        text: "Please Note",
      });

      return false;
    }

    return true;
  };

  const handleReject = async (e: any) => {
    e.preventDefault();

    if (!handleValidate()) {
      return;
    }

    const data = {
      enforcementId: dataEnforcementDetail?.data?.id,
      note: note,
    };

    const isConfirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject it!",
    }).then((result) => {
      return result.isConfirmed;
    });

    if (!isConfirm) {
      return;
    }

    const response = await rejectEnforcement(data);
    if (response?.success) {
      setShowReject(false);
      setShowDetailAddNew(false);
      setShow(false);

      getDeliberationPagination(dataEpPagination);
    }
  };

  const handleCloseReject = () => {
    setShowReject(false);
  };

  return (
    <>
      <Modal
        name={data}
        size="6xl"
        setShow={handleClose}
        group={
          <ButtonApproval
            data={dataEnforcementDetail?.data?.yourApprovalStatus}
            handleApproval={handleApproval}
            handleReject={handleShowReject}
          />
        }
        loading={isLoadingApproval}
      >
        {isLoadingEnforcementDetail ? (
          <div className="h-96">
            <div className="flex h-full">
              <div className="m-auto">
                <ReactLoading type="spin" color="#0B2447" />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col mt-3">
            <div className="flex flex-row mb-2">
              <div className="w-full md:w-1/2">
                <div className="flex flex-col md:flex-row gap-11">
                  <div>
                    <p className="text-sm font-bold">Section</p>
                    <p className="text-sm font-bold">Invest Group</p>
                    <p className="text-sm font-bold">Invest Group Item</p>
                  </div>
                  <div>
                    <p className="text-sm">
                      {dataEnforcementDetail?.data?.sectionName}
                    </p>
                    <p className="text-sm">
                      {dataEnforcementDetail?.data?.invesmentGroupName}
                    </p>
                    <p className="text-sm">
                      {dataEnforcementDetail?.data?.invesmentGroupItemName}
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="flex gap-4">
                  <div>
                    <p className="text-sm font-bold">Proposal Category</p>
                    <p className="text-sm font-bold">Description</p>
                  </div>
                  <div>
                    <p className="text-sm">
                      {dataEnforcementDetail?.data?.proposalCatName}
                    </p>
                    <p className="text-sm">
                      {dataEnforcementDetail?.data?.budgetDescription}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="flex flex-row mt-2">
              <div className="flex gap-4">
                <div>
                  <p className="text-sm font-bold">Invest Number</p>
                  <p className="text-sm font-bold">Enforcement Plan Exp</p>
                  <p className="text-sm font-bold">Over Budget Reason</p>
                </div>
                <div>
                  <p className="text-sm">
                    {dataEnforcementDetail?.data?.investNumber}
                  </p>
                  <p className="text-sm">
                    {dataEnforcementDetail?.data?.enfPlanExplain}
                  </p>
                  <p className="text-sm">
                    {dataEnforcementDetail?.data?.overBudgetReason}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <Table
                columnDefs={columnDefs}
                isLoading={isLoadingEnforcementDetail}
                rowData={
                  dataEnforcementDetail?.data?.investment?.investmentDetails
                }
                sizeTable={200}
                // doubleClick={(params: any) => {
                //   setDoubleClickItem(params?.data);
                //   setShowAddItem(true);
                // }}
              />

              <div className="flex flex-row items-center gap-4 mt-2">
                <div>
                  <label
                    htmlFor="example1"
                    className="text-xs font-normal text-gray-700 m-0"
                  >
                    Status Approval
                  </label>
                </div>
                <div>
                  <ApprovalButton
                    title="Detail"
                    handleClick={handleShowDetail}
                  />
                </div>
              </div>
              <div className="flex flex-row items-center mb-2">
                <AvatarInitialBudgetPlan
                  data={dataEnforcementDetail?.data?.approval}
                />
              </div>
            </div>
          </div>
        )}
      </Modal>

      {showDetail ? (
        <ModalDetailApproval
          setShow={handleCloseDetail}
          data={dataEnforcementDetail?.data?.approval?.approvalItems}
        />
      ) : null}

      {showReject ? (
        <ModalRejectApproval
          note={note}
          setNote={setNote}
          handleReject={handleReject}
          setShow={handleCloseReject}
          loading={isLoadingApproval}
        />
      ) : null}
    </>
  );
};

export default ModalDetailAddNew;
