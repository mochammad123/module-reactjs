import Modal from "../../../modules/modal/Modal";
import AutoComplete from "../../../modules/Input/AutoComplete";
import useBudgetPlanApi from "../../../apis/budget/budgetPlanApi";
import TextFieldMenuItem from "../../../modules/Input/TextFieldMenuItem";
import TextFieldTotalAmount from "../../../modules/Input/TextFieldTotalAmount";
import TextFieldInput from "../../../modules/Input/TextFieldInput";
import InputFile from "../../../modules/Input/InputFile";
import ApprovalButton from "../../../modules/button/ApprovalButton";
import ButtonModal from "./ButtonModal";
import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import sortData from "../../../modules/function/SortData";
import useFiscalYearApi from "../../../apis/reference/fiscalYearApi";
import {
  CostCenter,
  ExchangeRate,
  FiscalYear,
  IBudgetPlan,
  InvestPriority,
  InvestmentGroup,
  InvestmentGroupItem,
  ProposalCategory,
  Section,
} from "../../../interface/BudgetPlan/IBudgetPlan";
import numeral from "numeral";
import ModalSetApproval from "../../../modules/modal/ModalSetApproval";
import useThresholdApi from "../../../apis/budget/thresholdApi";
import AvatarInitialBudgetPlan from "./AvatarInitialBudgetPlan";
import Swal from "sweetalert2";
import ModalDetailApproval from "../../../modules/modal/ModalDetailApproval";
import useApprovalApi from "../../../apis/approval/approvalApi";
import ModalRejectApproval from "../../../modules/modal/ModalRejectApproval";

const data: ExchangeRate[] = [
  {
    id: 35,
    date: "2026-01-01",
    currency: "eur",
    usdRates: 0.93,
  },
  {
    id: 34,
    date: "2026-01-01",
    currency: "idr",
    usdRates: 14967.25,
  },
  {
    id: 36,
    date: "2026-01-01",
    currency: "jpy",
    usdRates: 139.71,
  },
  {
    id: 38,
    date: "2026-01-01",
    currency: "sgd",
    usdRates: 1.35,
  },
  {
    id: 37,
    date: "2026-01-01",
    currency: "usd",
    usdRates: 1,
  },
];

const ModalBudgetPlan: React.FC<IBudgetPlan> = ({ dataBudgetPlan }) => {
  const {
    show,
    setShow,
    dataPraBudgetPlan,
    getPraBudgetPlan,
    isLoadingGetPraBudgetPlan,
    createBudgetPlan,
    updateBudgetPlan,
    getBudgetPlanPagination,
    dataBudgetPlanPagination,
    isLoading,
    hasPic,
    countApprovedItem,
    deleteBudgetPlan,
  } = useBudgetPlanApi();

  const {
    dataExchangeRateFiscal,
    isLoadingExchangeRateFiscal,
    getExchangeRateFiscalYear,
  } = useFiscalYearApi();

  const { approvalBudgetPlan, rejectBudgetPlan, isLoadingApproval } =
    useApprovalApi();

  const { dataThreshold, isLoadingGetThreshold, getThreshold } =
    useThresholdApi();

  const [fiscalYear, setFiscalYear] = useState<FiscalYear | null>(null);
  const [costCenter, setCostCenter] = useState<CostCenter | null>(null);
  const [section, setSection] = useState<Section | null>(null);
  const [investGroup, setInvestGroup] = useState<InvestmentGroup | null>(null);
  const [proposalCategory, setProposalCategory] =
    useState<ProposalCategory | null>(null);
  const [investPriority, setInvestPriority] = useState<InvestPriority | null>(
    null
  );
  const [dataGroupItems, setDataGroupItems] = useState<InvestmentGroupItem[]>(
    []
  );
  const [groupItem, setGroupItem] = useState<InvestmentGroupItem | null>(null);
  const [exchangeRate, setExchangeRate] = useState<ExchangeRate | null>(null);
  const [totalAmount, setTotalAmount] = useState<string>("0");
  const [currencyRate, setCurrencyRate] = useState(0);
  const [totalAmountUsd, setTotalAmountUsd] = useState<string>("0");
  const [investPlanName, setInvestPlanName] = useState(null);
  const [proposedBudgetDate, setProposedBudgetDate] = useState(null);
  const [completionBudgetDate, setCompletionBudgetDate] = useState(null);
  const [description, setDescription] = useState(null);
  const [attachment, setAttachment] = useState<File | null>(null);
  const [showApproval, setShowApproval] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [showReject, setShowReject] = useState(false);

  const [pic, setPic] = useState(null);
  const [assistantManager, setAssistantManager] = useState(null);
  const [manager, setManager] = useState(null);
  const [generalManager, setGeneralManager] = useState(null);
  const [director, setDirector] = useState(null);

  const [isAssistentManagerChecked, setIsAssistentManagerChecked] =
    useState(false);
  const [isManagerChecked, setIsManagerChecked] = useState(false);
  const [isGeneralManagerChecked, setIsGeneralManagerChecked] = useState(false);

  const [selectedData, setSelectedData] = useState([]);
  const [exchangeRateIdr, setExchangeRateIdr] = useState<number>(0);
  const [fixAmount, setFixAmount] = useState<number>(0);

  const [note, setNote] = useState<string | null>(null);

  // start data
  const dataFiscalYears = sortData(
    "fiscal",
    dataPraBudgetPlan?.data?.fiscalYears,
    "name",
    "name"
  );

  const dataCostCenters = sortData(
    "cost",
    dataPraBudgetPlan?.data?.costs,
    "costCenter",
    "costCenter"
  );

  const dataSections = sortData(
    "sections",
    dataPraBudgetPlan?.data?.sections,
    "name",
    "name"
  );

  const dataInvestmentGroup = sortData(
    "investmentGroup",
    dataPraBudgetPlan?.data?.invesmentGroups,
    "name",
    "name"
  );

  const dataProposalCategories = sortData(
    "proposalCategories",
    dataPraBudgetPlan?.data?.proposalCategories,
    "name",
    "name"
  );

  useEffect(() => {
    if (show) {
      handleGetPraBudgetPlan();
    }
  }, [show]);

  useEffect(() => {
    if (investGroup) {
      setDataGroupItems(investGroup?.investmentGroupItems || []);
    }
    setGroupItem(null);
  }, [investGroup]);

  useEffect(() => {
    if (fiscalYear) {
      getExchangeRateFiscalYear(fiscalYear?.id);
    }
  }, [fiscalYear]);

  useEffect(() => {
    if (dataExchangeRateFiscal) {
      const idrCur: ExchangeRate = dataExchangeRateFiscal?.data?.find(
        (item: ExchangeRate) => {
          return item?.currency === "idr";
        }
      );
      if (idrCur) {
        setExchangeRate(idrCur);
        if (idrCur?.usdRates) {
          setExchangeRateIdr(idrCur?.usdRates);
        }
      }
    }
    console.clear();
  }, [fiscalYear, dataExchangeRateFiscal]);

  useEffect(() => {
    if (!dataBudgetPlan) {
      if (show) {
        if (!fiscalYear) {
          const idrCur = data?.find((item: any) => {
            return item?.currency === "idr";
          });
          if (idrCur) {
            setExchangeRate(idrCur);
          }
        }
      }
    }
  }, [show, fiscalYear, dataExchangeRateFiscal, dataBudgetPlan]);

  useEffect(() => {
    calculateTotalAmountUsd();
    if (totalAmount?.trim() == "") {
      setTotalAmountUsd("0.00");
      setTotalAmount("0");
    }
  }, [totalAmount, exchangeRate]);

  useEffect(() => {
    if (showApproval) {
      if (dataPraBudgetPlan) {
        const deptId = dataPraBudgetPlan?.data?.department?.id;
        getThreshold(deptId);
      }
    }
  }, [showApproval]);

  useEffect(() => {
    setIsAssistentManagerChecked(false);
    setIsManagerChecked(false);
    setIsGeneralManagerChecked(false);
  }, [showApproval]);

  useEffect(() => {
    const amount = 10000000;
    const alertTotalAmount = amount / exchangeRateIdr;
    setFixAmount(alertTotalAmount);
  }, [fiscalYear, exchangeRateIdr]);

  useEffect(() => {
    if (dataBudgetPlan && dataPraBudgetPlan) {
      const fiscalYearUpdate = dataPraBudgetPlan?.data?.fiscalYears?.find(
        (item: any) => item.id === dataBudgetPlan?.fiscalYearId
      );
      const costCenterUpdate = dataPraBudgetPlan?.data?.costs?.find(
        (item: any) => item.id === dataBudgetPlan?.costId
      );
      const sectionUpdate = dataPraBudgetPlan?.data?.sections?.find(
        (item: any) => item.id === dataBudgetPlan?.sectionId
      );
      const investGroupUpdate = dataPraBudgetPlan?.data?.invesmentGroups?.find(
        (item: any) => item.groupNumber === dataBudgetPlan?.investGroupId
      );
      const proposalCategoryUpdate =
        dataPraBudgetPlan?.data?.proposalCategories?.find(
          (item: any) => item.id === dataBudgetPlan?.proposalCatId
        );
      const investPriorityUpdate =
        dataPraBudgetPlan?.data?.investmentPriorities?.find(
          (item: any) => item.id === dataBudgetPlan?.investPriority?.id
        );
      if (fiscalYearUpdate) {
        setFiscalYear(fiscalYearUpdate);
      }

      if (costCenterUpdate) {
        setCostCenter(costCenterUpdate);
      }

      if (sectionUpdate) {
        setSection(sectionUpdate);
      }

      if (investGroupUpdate) {
        setInvestGroup(investGroupUpdate);
      }

      if (proposalCategoryUpdate) {
        setProposalCategory(proposalCategoryUpdate);
      }

      if (investPriorityUpdate) {
        setInvestPriority(investPriorityUpdate);
      }

      if (dataBudgetPlan?.currency == "idr") {
        const formattedTotalAmount = numeral(
          dataBudgetPlan?.totalAmount
        ).format("0,0");
        setTotalAmount(formattedTotalAmount);
      } else {
        const formattedTotalAmount = numeral(
          dataBudgetPlan?.totalAmount
        ).format("0,0.00");
        setTotalAmount(formattedTotalAmount);
      }
      const formattedTotalAmountUsd = numeral(
        dataBudgetPlan?.totalAmountUsd
      ).format("0,0.00");
      setTotalAmountUsd(formattedTotalAmountUsd);
      if (dataExchangeRateFiscal) {
        const exchangeRateUpdate = dataExchangeRateFiscal?.data?.find(
          (item: any) => item.currency === dataBudgetPlan?.currency
        );
        if (exchangeRateUpdate) {
          setExchangeRate(exchangeRateUpdate);
        }
      }
      setInvestPlanName(dataBudgetPlan?.investPlanName);
      setProposedBudgetDate(dataBudgetPlan?.proposeDatePlan);
      setCompletionBudgetDate(dataBudgetPlan?.completionDatePlan);
      setDescription(dataBudgetPlan?.description);
    }
  }, [show, dataBudgetPlan, dataPraBudgetPlan, dataExchangeRateFiscal]);

  useEffect(() => {
    if (dataBudgetPlan && dataGroupItems) {
      const groupItemUpdate = dataGroupItems?.find(
        (item: any) => item.id === dataBudgetPlan?.investGroupItemId
      );
      if (groupItemUpdate) {
        setGroupItem(groupItemUpdate);
      }
    }
  }, [dataBudgetPlan, dataGroupItems]);

  const handleGetPraBudgetPlan = async () => {
    await getPraBudgetPlan();
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleCloseApproval = () => {
    setShowApproval(false);
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
  };

  const handleCloseReject = () => {
    setShowReject(false);
  };

  const calculateTotalAmountUsd = () => {
    if (totalAmount && typeof totalAmount == "string") {
      const priceValue = parseFloat((totalAmount as string).replace(/,/g, ""));
      if (exchangeRate && exchangeRate.usdRates !== undefined) {
        const totalAmountUsdValue = (
          priceValue / exchangeRate?.usdRates
        )?.toFixed(2);
        const formattedTotalAmountUsd =
          numeral(totalAmountUsdValue).format("0,0.00");
        setTotalAmountUsd(formattedTotalAmountUsd);
        setCurrencyRate(exchangeRate?.usdRates);
      }
    }
  };

  const handleShowApproval = () => {
    setShowApproval(true);
  };

  const handleShowDetail = () => {
    setShowDetail(true);
  };

  const sortSelectedData = selectedData?.sort(
    (a: any, b: any) => b.position_id - a.position_id
  );

  const resetSaveData = () => {
    setFiscalYear(null);
    setCostCenter(null);
    setSection(null);
    setInvestGroup(null);
    setProposalCategory(null);
    setInvestPriority(null);
    setDataGroupItems([]);
    setGroupItem(null);
    setExchangeRate(null);
    setTotalAmount("0");
    setCurrencyRate(0);
    setTotalAmountUsd("0");
    setInvestPlanName(null);
    setProposedBudgetDate(null);
    setCompletionBudgetDate(null);
    setDescription(null);
    setAttachment(null);
    setSelectedData([]);
    setShow(false);
  };

  const handleValidateSaveData = () => {
    if (!fiscalYear) {
      Swal.fire({
        icon: "error",
        title: "Opss...",
        text: "Please select Fiscal Year",
      });

      return false;
    } else if (!costCenter) {
      Swal.fire({
        icon: "error",
        title: "Opss...",
        text: "Please select Cost Center",
      });

      return false;
    } else if (!section) {
      Swal.fire({
        icon: "error",
        title: "Opss...",
        text: "Please select Section",
      });

      return false;
    } else if (!investGroup) {
      Swal.fire({
        icon: "error",
        title: "Opss...",
        text: "Please Investment Group",
      });

      return false;
    } else if (!proposalCategory) {
      Swal.fire({
        icon: "error",
        title: "Opss...",
        text: "Please Proposal Category",
      });

      return false;
    } else if (!investPriority) {
      Swal.fire({
        icon: "error",
        title: "Opss...",
        text: "Please Investment Priority",
      });

      return false;
    } else if (!groupItem) {
      Swal.fire({
        icon: "error",
        title: "Opss...",
        text: "Please Group Item",
      });

      return false;
    } else if (!exchangeRate) {
      Swal.fire({
        icon: "error",
        title: "Opss...",
        text: "Please Investment Group",
      });

      return false;
    } else if (!totalAmount || totalAmount == " " || totalAmount == "0") {
      Swal.fire({
        icon: "error",
        title: "Opss...",
        text: "Please Total Amount",
      });

      return false;
    } else if (
      !totalAmountUsd ||
      totalAmountUsd == " " ||
      totalAmountUsd == "0"
    ) {
      Swal.fire({
        icon: "error",
        title: "Opss...",
        text: "Please Total Amount USD",
      });

      return false;
    } else if (!investPlanName || investPlanName == " ") {
      Swal.fire({
        icon: "error",
        title: "Opss...",
        text: "Please Invest Plan Name",
      });

      return false;
    } else if (!proposedBudgetDate || proposedBudgetDate == " ") {
      Swal.fire({
        icon: "error",
        title: "Opss...",
        text: "Please Proposed Budget Date",
      });

      return false;
    } else if (!completionBudgetDate || completionBudgetDate == " ") {
      Swal.fire({
        icon: "error",
        title: "Opss...",
        text: "Please Completion Budget Date",
      });

      return false;
    } else if (!description || description == " ") {
      Swal.fire({
        icon: "error",
        title: "Opss...",
        text: "Please Description",
      });

      return false;
    } else if (!dataBudgetPlan) {
      if (
        !attachment ||
        (attachment instanceof File && attachment.name.trim() === "")
      ) {
        Swal.fire({
          icon: "error",
          title: "Opss...",
          text: "Please Input Attachment",
        });

        return false;
      } else if (!selectedData || selectedData?.length <= 0) {
        Swal.fire({
          icon: "error",
          title: "Opss...",
          text: "Please Set Approval",
        });

        return false;
      }
    } else if (parseFloat(totalAmountUsd.replace(/,/g, "")) < fixAmount) {
      Swal.fire({
        icon: "error",
        title: "Opss...",
        text: "proposed amount must be more than Rp. 10.000.000",
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

    const formData = new FormData();

    if (attachment) {
      formData.append("FileDetails", attachment, attachment?.name);
    }
    formData.append("BudgetPlan.FiscalYearId", fiscalYear?.id.toString() || "");
    formData.append("BudgetPlan.CostId", costCenter?.id.toString() || "");
    formData.append("BudgetPlan.SectionId", section?.id.toString() || "");
    formData.append("BudgetPlan.InvestGroupId", investGroup?.groupNumber || "");
    formData.append(
      "BudgetPlan.ProposalCatId",
      proposalCategory?.id.toString() || ""
    );
    formData.append(
      "BudgetPlan.InvestGroupItemId",
      groupItem?.id.toString() || ""
    );
    formData.append(
      "BudgetPlan.InvestPriorityId",
      investPriority?.id.toString() || ""
    );
    formData.append("BudgetPlan.Currency", exchangeRate?.currency || "");
    formData.append(
      "BudgetPlan.TotalAmount",
      totalAmount?.replace(/,/g, "") || ""
    );
    formData.append("BudgetPlan.CurrencyRates", currencyRate.toString() || "");
    formData.append(
      "BudgetPlan.TotalAmountUsd",
      totalAmountUsd.replace(/,/g, "") || ""
    );
    formData.append("BudgetPlan.Description", description || "");
    formData.append("BudgetPlan.InvestPlanName", investPlanName || "");
    formData.append("BudgetPlan.ProposeDatePlan", proposedBudgetDate || "");
    formData.append(
      "BudgetPlan.CompletionDatePlan",
      completionBudgetDate || ""
    );
    selectedData.forEach((approval, index) => {
      formData.append(
        `BudgetPlan.Approvals[${index}]`,
        JSON.stringify(approval)
      );
    });

    const response = await createBudgetPlan(formData);

    if (response?.success) {
      resetSaveData();
      getBudgetPlanPagination(dataBudgetPlanPagination);
    }
  };

  const handleUpdateData = async (e: any) => {
    e.preventDefault();

    if (!handleValidateSaveData()) {
      return;
    }

    const formData = new FormData();

    if (attachment) {
      formData.append("FileDetails", attachment, attachment?.name);
    }
    formData.append("BudgetPlan.Id", dataBudgetPlan?.id.toString() || "");
    formData.append("BudgetPlan.FiscalYearId", fiscalYear?.id.toString() || "");
    formData.append("BudgetPlan.CostId", costCenter?.id.toString() || "");
    formData.append("BudgetPlan.SectionId", section?.id.toString() || "");
    formData.append("BudgetPlan.InvestGroupId", investGroup?.groupNumber || "");
    formData.append(
      "BudgetPlan.ProposalCatId",
      proposalCategory?.id.toString() || ""
    );
    formData.append(
      "BudgetPlan.InvestGroupItemId",
      groupItem?.id.toString() || ""
    );
    formData.append(
      "BudgetPlan.InvestPriorityId",
      investPriority?.id.toString() || ""
    );
    formData.append("BudgetPlan.Currency", exchangeRate?.currency || "");
    formData.append(
      "BudgetPlan.TotalAmount",
      totalAmount?.replace(/,/g, "") || ""
    );
    formData.append("BudgetPlan.CurrencyRates", currencyRate.toString() || "");
    formData.append(
      "BudgetPlan.TotalAmountUsd",
      totalAmountUsd.replace(/,/g, "") || ""
    );
    formData.append("BudgetPlan.Description", description || "");
    formData.append("BudgetPlan.InvestPlanName", investPlanName || "");
    formData.append("BudgetPlan.ProposeDatePlan", proposedBudgetDate || "");
    formData.append(
      "BudgetPlan.CompletionDatePlan",
      completionBudgetDate || ""
    );
    if (selectedData) {
      selectedData.forEach((approval, index) => {
        formData.append(
          `BudgetPlan.Approvals[${index}]`,
          JSON.stringify(approval)
        );
      });
    }

    const response = await updateBudgetPlan(formData);

    if (response?.success) {
      resetSaveData();
      getBudgetPlanPagination(dataBudgetPlanPagination);
    }
  };

  const handleDeleteData = async () => {
    const isConfirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      return result.isConfirmed;
    });

    if (!isConfirm) {
      return;
    }

    const response = await deleteBudgetPlan(dataBudgetPlan?.id);
    if (response?.success) {
      resetSaveData();
      getBudgetPlanPagination(dataBudgetPlanPagination);
    }
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

    const response = await approvalBudgetPlan(dataBudgetPlan?.id);
    if (response?.success) {
      resetSaveData();

      getBudgetPlanPagination(dataBudgetPlanPagination);
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
      budgetPlanId: dataBudgetPlan?.id,
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

    const response = await rejectBudgetPlan(data);
    if (response?.success) {
      resetSaveData();
      getBudgetPlanPagination(dataBudgetPlanPagination);
    }
  };

  return (
    <>
      <Modal
        name={dataBudgetPlan ? "Update Budget Plan" : "Add Budget Plan"}
        size="5xl"
        setShow={handleClose}
        group={
          <ButtonModal
            data={dataBudgetPlan}
            handleSave={handleSaveData}
            handleUpdate={handleUpdateData}
            handleDelete={handleDeleteData}
            handleApproval={handleApproval}
            handleReject={handleShowReject}
          />
        }
        loading={isLoading || isLoadingApproval}
      >
        {isLoadingGetPraBudgetPlan ? (
          <div className="h-96">
            <div className="flex h-full">
              <div className="m-auto">
                <ReactLoading type="spin" color="#0B2447" />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3 mt-3">
            <div className="flex items-center gap-4">
              <div className="md:w-1/6 w-full">
                <AutoComplete
                  label="Fiscal Year"
                  value={fiscalYear}
                  setChange={(e: any, v: any) => {
                    e.preventDefault();
                    setFiscalYear(v);
                  }}
                  options={dataFiscalYears}
                  getOptionLabel={(option: any) => option?.name}
                  isOptionEqualToValue={(option: any, value: any) =>
                    option?.name == value?.name || ""
                  }
                  required={true}
                  readonly={
                    dataBudgetPlan
                      ? hasPic && countApprovedItem > 1
                        ? true
                        : hasPic
                        ? false
                        : true
                      : false
                  }
                />
              </div>
              <div className="md:w-2/6 w-full">
                <AutoComplete
                  label="Cost Center"
                  value={costCenter}
                  setChange={(e: any, v: any) => {
                    e.preventDefault();
                    setCostCenter(v);
                  }}
                  options={dataCostCenters}
                  getOptionLabel={(option: any) => option?.costCenter}
                  isOptionEqualToValue={(option: any, value: any) =>
                    option?.costCenter == value?.costCenter || ""
                  }
                  required={true}
                  readonly={
                    dataBudgetPlan
                      ? hasPic && countApprovedItem > 1
                        ? true
                        : hasPic
                        ? false
                        : true
                      : false
                  }
                />
              </div>
              <div className="md:w-3/6 w-full">
                <AutoComplete
                  label="Section"
                  value={section}
                  setChange={(e: any, v: any) => {
                    e.preventDefault();
                    setSection(v);
                  }}
                  options={dataSections}
                  getOptionLabel={(option: any) => option?.name}
                  isOptionEqualToValue={(option: any, value: any) =>
                    option?.name == value?.name || ""
                  }
                  required={true}
                  readonly={
                    dataBudgetPlan
                      ? hasPic && countApprovedItem > 1
                        ? true
                        : hasPic
                        ? false
                        : true
                      : false
                  }
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="md:w-5/12 w-full">
                <AutoComplete
                  label="Investment Group"
                  value={investGroup}
                  setChange={(e: any, v: any) => {
                    e.preventDefault();
                    setInvestGroup(v);
                  }}
                  options={dataInvestmentGroup}
                  getOptionLabel={(option: any) => option?.name}
                  isOptionEqualToValue={(option: any, value: any) =>
                    option?.costCenter == value?.costCenter || ""
                  }
                  required={true}
                  readonly={
                    dataBudgetPlan
                      ? hasPic && countApprovedItem > 1
                        ? true
                        : hasPic
                        ? false
                        : true
                      : false
                  }
                />
              </div>
              <div className="md:w-5/12 w-full">
                <AutoComplete
                  label="Proposal Category"
                  value={proposalCategory}
                  setChange={(e: any, v: any) => {
                    e.preventDefault();
                    setProposalCategory(v);
                  }}
                  options={dataProposalCategories}
                  getOptionLabel={(option: any) => option?.name}
                  isOptionEqualToValue={(option: any, value: any) =>
                    option?.name == value?.name || ""
                  }
                  required={true}
                  readonly={
                    dataBudgetPlan
                      ? hasPic && countApprovedItem > 1
                        ? true
                        : hasPic
                        ? false
                        : true
                      : false
                  }
                />
              </div>
              <div className="md:w-3/12 w-full">
                <AutoComplete
                  label="Investment Priority"
                  value={investPriority}
                  setChange={(e: any, v: any) => {
                    e.preventDefault();
                    setInvestPriority(v);
                  }}
                  options={dataPraBudgetPlan?.data?.investmentPriorities}
                  getOptionLabel={(option: any) => option?.name}
                  isOptionEqualToValue={(option: any, value: any) =>
                    option?.name == value?.name || ""
                  }
                  required={true}
                  readonly={
                    dataBudgetPlan
                      ? hasPic && countApprovedItem > 1
                        ? true
                        : hasPic
                        ? false
                        : true
                      : false
                  }
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="md:w-5/12 w-full"></div>
              <div className="md:w-4/12 w-full">
                {parseFloat(totalAmountUsd.replace(/,/g, "")) < fixAmount ? (
                  <p className="text-xs text-red-500">! Min: Rp. 10.000.000</p>
                ) : null}
              </div>
              <div className="md:w-3/12 w-full">
                {parseFloat(totalAmountUsd.replace(/,/g, "")) < 50000 ? null : (
                  <p className="text-xs text-red-500">
                    ! Please Provide Explanation PPT
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="md:w-5/12 w-full">
                <AutoComplete
                  label="Group Item"
                  value={groupItem}
                  setChange={(e: any, v: any) => {
                    e.preventDefault();
                    setGroupItem(v);
                  }}
                  options={dataGroupItems}
                  getOptionLabel={(option: any) => option?.name}
                  isOptionEqualToValue={(option: any, value: any) =>
                    option?.name == value?.name || ""
                  }
                  readonly={
                    !investGroup || dataBudgetPlan
                      ? hasPic && countApprovedItem > 1
                        ? true
                        : hasPic
                        ? false
                        : true
                      : false
                  }
                  required={true}
                />
              </div>
              <div className="md:w-4/12 w-full">
                {isLoadingExchangeRateFiscal ? (
                  "Loading ..."
                ) : (
                  <TextFieldMenuItem
                    valueSelect={exchangeRate}
                    handleSelect={(e: any) => setExchangeRate(e.target.value)}
                    disabled={
                      !fiscalYear || dataBudgetPlan
                        ? hasPic && countApprovedItem > 1
                          ? true
                          : hasPic
                          ? undefined
                          : true
                        : undefined
                    }
                    required={true}
                    label="Proposed Amount"
                    data={
                      fiscalYear
                        ? dataExchangeRateFiscal.length == 0
                          ? data
                          : dataExchangeRateFiscal?.data
                        : data
                    }
                    valueTextField={totalAmount}
                    handleTextField={setTotalAmount}
                  />
                )}
              </div>
              <div className="md:w-3/12 w-full">
                <TextFieldTotalAmount value={totalAmountUsd} disabled={true} />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="md:w-2/6 w-full">
                <TextFieldInput
                  label="Investment Plan Name"
                  multiline={false}
                  type="text"
                  readonly={
                    dataBudgetPlan
                      ? hasPic && countApprovedItem > 1
                        ? true
                        : hasPic
                        ? false
                        : true
                      : false
                  }
                  required={true}
                  value={investPlanName}
                  handleChange={(e: any) => setInvestPlanName(e.target.value)}
                />
              </div>
              <div className="md:w-2/6 w-full">
                <TextFieldInput
                  label="Proposed Budget Date (mm/dd/yyyy)"
                  multiline={false}
                  type="date"
                  readonly={
                    dataBudgetPlan
                      ? hasPic && countApprovedItem > 1
                        ? true
                        : hasPic
                        ? false
                        : true
                      : false
                  }
                  required={true}
                  value={proposedBudgetDate}
                  handleChange={(e: any) =>
                    setProposedBudgetDate(e.target.value)
                  }
                />
              </div>
              <div className="md:w-2/6 w-full">
                <TextFieldInput
                  label="Completion Budget Date (mm/dd/yyyy)"
                  multiline={false}
                  type="date"
                  readonly={
                    dataBudgetPlan
                      ? hasPic && countApprovedItem > 1
                        ? true
                        : hasPic
                        ? false
                        : true
                      : false
                  }
                  required={true}
                  value={completionBudgetDate}
                  handleChange={(e: any) =>
                    setCompletionBudgetDate(e.target.value)
                  }
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-full">
                <TextFieldInput
                  label="Description"
                  multiline={true}
                  rows={2}
                  type="text"
                  readonly={
                    dataBudgetPlan
                      ? hasPic && countApprovedItem > 1
                        ? true
                        : hasPic
                        ? false
                        : true
                      : false
                  }
                  required={true}
                  value={description}
                  handleChange={(e: any) => setDescription(e.target.value)}
                />
              </div>
            </div>

            {dataBudgetPlan ? (
              hasPic && countApprovedItem > 1 ? null : !hasPic ? null : (
                <div className="flex items-center gap-4">
                  <div>
                    <div>
                      <label
                        htmlFor="example1"
                        className="text-xs font-normal text-gray-700 m-0"
                      >
                        Attachment *
                      </label>
                    </div>
                    <InputFile
                      handleChange={(e: any) =>
                        setAttachment(e.target.files[0])
                      }
                    />
                  </div>
                </div>
              )
            ) : (
              <div className="flex items-center gap-4">
                <div>
                  <div>
                    <label
                      htmlFor="example1"
                      className="text-xs font-normal text-gray-700 m-0"
                    >
                      Attachment *
                    </label>
                  </div>
                  <InputFile
                    handleChange={(e: any) => setAttachment(e.target.files[0])}
                  />
                </div>
              </div>
            )}

            {dataBudgetPlan ? (
              hasPic && countApprovedItem > 1 ? null : !hasPic ? null : (
                <div className="flex flex-row items-center gap-4">
                  <div>
                    <label
                      htmlFor="example1"
                      className="text-xs font-normal text-gray-700 m-0"
                    >
                      Approval {dataBudgetPlan ? null : "*"}
                    </label>
                  </div>
                  <div>
                    <ApprovalButton
                      title="Set Approval"
                      handleClick={handleShowApproval}
                    />
                  </div>
                </div>
              )
            ) : (
              <div className="flex flex-row items-center gap-4">
                <div>
                  <label
                    htmlFor="example1"
                    className="text-xs font-normal text-gray-700 m-0"
                  >
                    Approval {dataBudgetPlan ? null : "*"}
                  </label>
                </div>
                <div>
                  <ApprovalButton
                    title="Set Approval"
                    handleClick={handleShowApproval}
                  />
                </div>
              </div>
            )}

            <div className="flex flex-row items-center">
              <AvatarInitialBudgetPlan data={sortSelectedData} />
            </div>

            {dataBudgetPlan ? (
              <>
                <div className="flex flex-row items-center gap-4">
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
                <div className="flex flex-row items-center">
                  <AvatarInitialBudgetPlan data={dataBudgetPlan?.approval} />
                </div>
              </>
            ) : undefined}
          </div>
        )}
      </Modal>

      {showApproval ? (
        <ModalSetApproval
          setShow={handleCloseApproval}
          data={dataThreshold?.data}
          pic={pic}
          setPic={setPic}
          assistantManager={assistantManager}
          setAssistantManager={setAssistantManager}
          manager={manager}
          setManager={setManager}
          generalManager={generalManager}
          setGeneralManager={setGeneralManager}
          director={director}
          setDirector={setDirector}
          isAssistantManagerChecked={isAssistentManagerChecked}
          setIsAssistantManagerChecked={setIsAssistentManagerChecked}
          isManagerChecked={isManagerChecked}
          setIsManagerChecked={setIsManagerChecked}
          isGeneralManagerChecked={isGeneralManagerChecked}
          setIsGeneralManagerChecked={setIsGeneralManagerChecked}
          isLoadingModal={isLoadingGetThreshold}
          setSelectedData={setSelectedData}
        />
      ) : null}

      {showDetail ? (
        <ModalDetailApproval
          setShow={handleCloseDetail}
          data={dataBudgetPlan?.approval?.approvalItems}
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

export default ModalBudgetPlan;
