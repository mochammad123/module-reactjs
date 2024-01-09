import React, { useEffect, useState } from "react";
import Modal from "../../../modules/modal/Modal";
import { IModalDeliberation } from "../../../interface/Deliberation/IDeliberation";
import TextFieldTotalAmount from "../../../modules/Input/TextFieldTotalAmount";
import CheckboxApproval from "../../../modules/checkbox/CheckboxApproval";
import TextFieldInput from "../../../modules/Input/TextFieldInput";
import numeral from "numeral";
import useDeliberationApi from "../../../apis/budget/deliberationApi";
import ButtonModal from "./ButtonModal";
import AlertMui from "../../../modules/alert/AlertMui";
import ChipMui from "../../../modules/chip/ChipMui";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Swal from "sweetalert2";

const ModalDeliberation: React.FC<IModalDeliberation> = ({
  dataDeliberation,
}) => {
  const {
    setShow,
    createDeliberation,
    getDeliberationPagination,
    dataDeliberationPagination,
    isLoading,
  } = useDeliberationApi();

  const [approveAmount, setApproveAmount] = useState<string>("0");
  const [comment, setComment] = useState<string>("");
  const [approvalStatus, setApprovalStatus] = useState<
    "approved" | "postpone" | "rejected" | null
  >(null);
  const [amount, setAmount] = useState<boolean>(false);

  useEffect(() => {
    if (amount) {
      const fullAmt = numeral(dataDeliberation?.totalAmountUsd).format(
        "0,0.00"
      );
      setApproveAmount(fullAmt);
    } else {
      setApproveAmount("0");
    }
    //   console.clear();
  }, [amount]);

  useEffect(() => {
    if (dataDeliberation?.approvedAmmountUsd) {
      const amountApprove = parseFloat(
        dataDeliberation?.approvedAmmountUsd
      ).toLocaleString();
      setApproveAmount(amountApprove.toString());
    }

    if (dataDeliberation?.comment) {
      setComment(dataDeliberation?.comment);
    }
  }, [dataDeliberation]);

  const handleClose = () => {
    setShow(false);
  };

  const handleStatusChange = (
    newStatus: "approved" | "postpone" | "rejected"
  ) => {
    setApprovalStatus(newStatus);
  };

  const resetSaveData = () => {
    setApproveAmount("0");
    setComment("");
    setApprovalStatus(null);
    setAmount(false);
    setShow(false);
  };

  const handleValidateSaveData = () => {
    if (!approveAmount || approveAmount == " " || approveAmount == "") {
      Swal.fire({
        icon: "error",
        title: "Opss...",
        text: "Please input Approve Amount",
      });

      return false;
    } else if (!comment || comment == " " || comment == "") {
      Swal.fire({
        icon: "error",
        title: "Opss...",
        text: "Please input Comment",
      });

      return false;
    } else if (!approvalStatus) {
      Swal.fire({
        icon: "error",
        title: "Opss...",
        text: "Please select Approval Status",
      });

      return false;
    }

    return true;
  };

  const handleSaveData = async (e: any) => {
    e.preventDefault();

    if (!handleValidateSaveData()) {
      return;
    }

    const approvedAmountUsd = parseFloat(approveAmount?.replace(/,/g, ""));

    const data = {
      budgetPlanId: parseInt(dataDeliberation?.id),
      approvedAmountUsd: approvedAmountUsd,
      comment: comment,
      approvalStatus: approvalStatus,
    };

    const response = await createDeliberation(data);

    if (response?.success) {
      resetSaveData();
      getDeliberationPagination(dataDeliberationPagination);
    }
  };

  return (
    <>
      <Modal
        name={`Budget Approval - ${dataDeliberation?.proposalCatName}`}
        size="3xl"
        setShow={handleClose}
        group={
          <ButtonModal
            yourApprovalStatus={dataDeliberation?.yourApprovalStatus}
            handleSave={handleSaveData}
          />
        }
        loading={isLoading}
      >
        <div className="flex flex-col gap-1 mt-3">
          <p className="font-semibold">{dataDeliberation?.fiscalYearName}</p>
          <p className="font-semibold">{dataDeliberation?.sectionName}</p>
          <p className="font-semibold">{dataDeliberation?.investGroupName}</p>
          <hr />
          <div className="flex flex-row gap-2 mt-2">
            <p className="text-sm">Description : </p>
            <p className="text-sm">{dataDeliberation?.description}</p>
          </div>
          <div className="flex flex-row gap-4 mt-2">
            <div className="md:w-1/3 w-full">
              <p className="text-sm">Amount</p>
              <p className="font-bold mt-3">
                US$ {numeral(dataDeliberation?.totalAmountUsd).format("0,0.00")}
              </p>
            </div>
            <div className="md:w-1/3 w-full">
              <p className="text-sm">Approve Amount</p>
              <div className="w-full mt-2">
                <TextFieldTotalAmount
                  value={approveAmount}
                  setValue={setApproveAmount}
                  disabled={
                    amount || dataDeliberation?.yourApprovalStatus != "wait"
                      ? true
                      : false
                  }
                />
              </div>
            </div>
            <div className="md:w-1/3 w-full mt-4">
              <div className="flex items-center">
                <CheckboxApproval
                  label=""
                  disabled={
                    dataDeliberation?.yourApprovalStatus != "wait"
                      ? true
                      : false
                  }
                  checked={amount}
                  handleChange={setAmount}
                />
                <p className="text-sm -mt-2">Full AMT</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <div className="w-full">
              <TextFieldInput
                label="Comment"
                multiline={true}
                rows={3}
                type="text"
                readonly={
                  dataDeliberation?.yourApprovalStatus != "wait" ? true : false
                }
                required={true}
                value={comment}
                handleChange={(e: any) => setComment(e.target.value)}
              />
            </div>
          </div>
          {dataDeliberation?.yourApprovalStatus != "wait" ? null : (
            <div className="flex gap-4 mt-3">
              <div className="md:w-28 w-full">
                <ChipMui
                  label="Approve"
                  size="small"
                  color={approvalStatus == "approved" ? "success" : "default"}
                  handleClick={() => handleStatusChange("approved")}
                  icon={<CheckCircleOutlineIcon />}
                />
              </div>
              <div className="md:w-28 w-full">
                <ChipMui
                  label="Postpone"
                  size="small"
                  color={approvalStatus == "postpone" ? "warning" : "default"}
                  handleClick={() => handleStatusChange("postpone")}
                  icon={<AccessTimeIcon />}
                />
              </div>
              <div className="md:w-28 w-full">
                <ChipMui
                  label="Cancel"
                  size="small"
                  color={approvalStatus == "rejected" ? "error" : "default"}
                  handleClick={() => handleStatusChange("rejected")}
                  icon={<HighlightOffIcon />}
                />
              </div>
            </div>
          )}

          <div className="w-full mt-3">
            {dataDeliberation?.approvalStatus == "approved" ? (
              <AlertMui title="Budget Approved" severity="success" />
            ) : dataDeliberation?.approvalStatus == "postpone" ? (
              <AlertMui title="Budget Postpone" severity="warning" />
            ) : dataDeliberation?.approvalStatus == "rejected" ? (
              <AlertMui title="Budget Rejected" severity="error" />
            ) : null}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalDeliberation;
