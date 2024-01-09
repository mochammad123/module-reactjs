import React, { useEffect, useState } from "react";
import Modal from "../../../modules/modal/Modal";
import Table from "../../../modules/table/agGrid/Table";
import AutoComplete from "../../../modules/Input/AutoComplete";
import GeneralButton from "../../../modules/button/GeneralButton";
import { IDataDetailEnforcement } from "../../../interface/EnforcementPlan/IEnfocementPlan";
import useEnfocementPlanApi from "../../../apis/budget/enforcementPlanApi";
import InputFile from "../../../modules/Input/InputFile";
import TextFieldInput from "../../../modules/Input/TextFieldInput";
import ApprovalButton from "../../../modules/button/ApprovalButton";
import {
  CostCenter,
  FiscalYear,
  InvestPriority,
  InvestmentGroup,
  InvestmentGroupItem,
  ProposalCategory,
  Section,
} from "../../../interface/BudgetPlan/IBudgetPlan";
import ReactLoading from "react-loading";
import useBudgetPlanApi from "../../../apis/budget/budgetPlanApi";
import sortData from "../../../modules/function/SortData";
import useThresholdApi from "../../../apis/budget/thresholdApi";
import ModalSetApproval from "../../../modules/modal/ModalSetApproval";
import AvatarInitialBudgetPlan from "../BudgetPlan/AvatarInitialBudgetPlan";
import ModalAddItem from "./ModalAddItem";
import Swal from "sweetalert2";
import useDeliberationApi from "../../../apis/budget/deliberationApi";
import ButtonAddNewItem from "./Button/ButtonAddNewItem";

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
    headerName: "Completion Plan",
    field: "completionDatePlan",
    minWidth: 120,
    maxWidth: 120,
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
    minWidth: 40,
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
    field: "totalAmountItem",
    minWidth: 100,
    flex: 1,
    resizable: true,
    cellStyle: { fontSize: "12px" },
    cellClass: "text-right",
    suppressToolTips: false,
    tooltipField: "totalAmountItem",
    cellRenderer: (params: any) => {
      var formattedValue = new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
      }).format(params.value);
      return formattedValue;
    },
  },
  {
    headerName: "Qty",
    field: "qty",
    minWidth: 30,
    flex: 1,
    resizable: true,
    cellStyle: { fontSize: "12px" },
    cellClass: "text-right",
    suppressToolTips: false,
    tooltipField: "qty",
  },
  {
    headerName: "Total",
    field: "totalAmountUsd",
    minWidth: 100,
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

const ModalAddNonBudget = () => {
  const {
    setShowNonBudget,
    showAddItem,
    setShowAddItem,
    isLoading,
    setDataDoubleClick,
    createNonEnforcement,
    dataEpPagination,
  } = useEnfocementPlanApi();
  const { isLoadingGetPraBudgetPlan, dataPraBudgetPlan } = useBudgetPlanApi();
  const { dataThreshold, isLoadingGetThreshold, getThreshold } =
    useThresholdApi();
  const { getDeliberationPagination } = useDeliberationApi();

  const {
    fiscalYears,
    costs,
    sections,
    investmentPriorities,
    proposalCategories,
    invesmentGroups,
    department,
  } = dataPraBudgetPlan?.data;

  const [dataDetailEnforcement, setDataDetailEnforcement] = useState<
    IDataDetailEnforcement[]
  >([]);

  const [fiscalYear, setFiscalYear] = useState<FiscalYear | null>(null);
  const [costCenter, setCostCenter] = useState<CostCenter | null>(null);
  const [section, setSection] = useState<Section | null>(null);
  const [investPriority, setInvestPriority] = useState<InvestPriority | null>(
    null
  );
  const [proposalCategory, setProposalCategory] =
    useState<ProposalCategory | null>(null);
  const [investGroup, setInvestGroup] = useState<InvestmentGroup | null>(null);
  const [groupItem, setGroupItem] = useState<InvestmentGroupItem | null>(null);
  const [dataGroupItems, setDataGroupItems] = useState<InvestmentGroupItem[]>(
    []
  );

  const [explanationDocument, setExplanationDocument] = useState<File | null>(
    null
  );
  const [quotation, setQuotation] = useState<File | null>(null);
  const [nvpCalculation, setNvpCalculation] = useState<File | null>(null);
  const [catalog, setCatalog] = useState<File | null>(null);
  const [other, setOther] = useState<File | null>(null);
  const [investPlanName, setInvestPlanName] = useState<string>("");
  const [epExplanation, setEpExplanation] = useState<string>("");
  const [nonBudgetReason, setNonBudgetReason] = useState<string>("");

  const [pic, setPic] = useState(null);
  const [assistantManager, setAssistantManager] = useState(null);
  const [manager, setManager] = useState(null);
  const [generalManager, setGeneralManager] = useState(null);
  const [director, setDirector] = useState(null);
  const [isAssistentManagerChecked, setIsAssistentManagerChecked] =
    useState(false);
  const [isManagerChecked, setIsManagerChecked] = useState(false);
  const [isGeneralManagerChecked, setIsGeneralManagerChecked] = useState(false);

  const [showApproval, setShowApproval] = useState(false);
  const [selectedData, setSelectedData] = useState([]);

  const [doubleClickItem, setDoubleClickItem] = useState(null);

  // start data
  const dataFiscalYears = sortData("fiscal", fiscalYears, "name", "name");

  const dataCostCenters = sortData("costs", costs, "costCenter", "costCenter");

  const dataSections = sortData("sections", sections, "name", "name");

  const dataInvestPriorities = sortData(
    "investPriorities",
    investmentPriorities,
    "name",
    "name"
  );

  const dataProposalCategories = sortData(
    "proposalCategories",
    proposalCategories,
    "name",
    "name"
  );

  const dataInvestmentGroup = sortData(
    "investmentGroup",
    invesmentGroups,
    "name",
    "name"
  );

  const sortSelectedData = selectedData?.sort(
    (a: any, b: any) => b.position_id - a.position_id
  );

  useEffect(() => {
    if (investGroup) {
      setDataGroupItems(investGroup?.investmentGroupItems || []);
      setGroupItem(null);
    }
  }, [investGroup]);

  useEffect(() => {
    if (showApproval) {
      setIsAssistentManagerChecked(false);
      setIsManagerChecked(false);
      setIsGeneralManagerChecked(false);
      if (department) {
        const deptId = department?.id;
        getThreshold(deptId);
      }
    }
  }, [showApproval]);

  useEffect(() => {
    if (fiscalYear) {
      setDataDoubleClick(fiscalYear);
      setDataDetailEnforcement([]);
    }
  }, [fiscalYear]);

  const handleClose = () => {
    setShowNonBudget(false);
    resetSaveData();
  };

  const handleShowApproval = () => {
    setShowApproval(true);
  };

  const handleCloseApproval = () => {
    setShowApproval(false);
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
    } else if (!investPriority) {
      Swal.fire({
        icon: "error",
        title: "Opss...",
        text: "Please Investment Priority",
      });

      return false;
    } else if (!proposalCategory) {
      Swal.fire({
        icon: "error",
        title: "Opss...",
        text: "Please Proposal Category",
      });

      return false;
    } else if (!investGroup) {
      Swal.fire({
        icon: "error",
        title: "Opss...",
        text: "Please Investment Group",
      });

      return false;
    } else if (!groupItem) {
      Swal.fire({
        icon: "error",
        title: "Opss...",
        text: "Please Group Item",
      });

      return false;
    } else if (!dataDetailEnforcement || dataDetailEnforcement.length <= 0) {
      Swal.fire({
        icon: "error",
        title: "Opss...",
        text: "Please Input Add Item",
      });

      return false;
    } else if (
      !explanationDocument ||
      (explanationDocument instanceof File &&
        explanationDocument.name.trim() === "")
    ) {
      Swal.fire({
        icon: "error",
        title: "Opss...",
        text: "Please Input Explanation Document",
      });

      return false;
    } else if (
      !quotation ||
      (quotation instanceof File && quotation.name.trim() === "")
    ) {
      Swal.fire({
        icon: "error",
        title: "Opss...",
        text: "Please Input Quotation",
      });

      return false;
    } else if (
      !nvpCalculation ||
      (nvpCalculation instanceof File && nvpCalculation.name.trim() === "")
    ) {
      Swal.fire({
        icon: "error",
        title: "Opss...",
        text: "Please Input NVP Calculation",
      });

      return false;
    } else if (
      !investPlanName ||
      investPlanName == "" ||
      investPlanName.trim() == ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Opss...",
        text: "Please input Investment Plan Name",
      });

      return false;
    } else if (
      !epExplanation ||
      epExplanation == "" ||
      epExplanation.trim() == ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Opss...",
        text: "Please input Enforcement Plan Explanation",
      });

      return false;
    } else if (
      !nonBudgetReason ||
      nonBudgetReason == "" ||
      nonBudgetReason.trim() == ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Opss...",
        text: "Please input Non Budget Reason",
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

    return true;
  };

  const resetSaveData = () => {
    setFiscalYear(null);
    setCostCenter(null);
    setSection(null);
    setInvestPriority(null);
    setProposalCategory(null);
    setInvestGroup(null);
    setGroupItem(null);
    setExplanationDocument(null);
    setQuotation(null);
    setNvpCalculation(null);
    setCatalog(null);
    setOther(null);
    setInvestPlanName("");
    setEpExplanation("");
    setNonBudgetReason("");
    setDataDetailEnforcement([]);
    setDoubleClickItem(null);
    setShowNonBudget(false);
  };

  const handleSaveData = async (e: any) => {
    e.preventDefault();

    if (!handleValidateSaveData()) {
      return;
    }

    const formData = new FormData();

    if (fiscalYear) {
      formData.append("Budget.FiscalYearId", fiscalYear.id.toString());
    }

    if (costCenter) {
      formData.append("Budget.CostId", costCenter.id.toString());
    }

    if (section) {
      formData.append("Budget.SectionId", section.id.toString());
    }

    if (investGroup) {
      formData.append("Budget.InvestGroupId", investGroup.groupNumber);
    }

    if (proposalCategory) {
      formData.append("Budget.ProposalCatId", proposalCategory.id.toString());
    }

    if (groupItem) {
      formData.append("Budget.InvestGroupItemId", groupItem.id.toString());
    }

    if (investPriority) {
      formData.append("Budget.InvestPriorityId", investPriority.id.toString());
    }
    formData.append("Budget.Description", investPlanName);

    if (explanationDocument) {
      formData.append(
        "Enforcement.AttachExplainDoc",
        explanationDocument,
        explanationDocument.name
      );
    }
    if (quotation) {
      formData.append(
        "Enforcement.AttachQuotation",
        quotation,
        quotation?.name
      );
    }
    if (nvpCalculation) {
      formData.append(
        "Enforcement.AttachNpvCalc",
        nvpCalculation,
        nvpCalculation?.name
      );
    }
    if (catalog) {
      formData.append("Enforcement.AttachCatalogue", catalog, catalog?.name);
    }
    if (other) {
      formData.append("Enforcement.AttachOther", other, other?.name);
    }
    formData.append("Enforcement.EnfPlanExplain", epExplanation);
    formData.append("Enforcement.OverBudgetReason", nonBudgetReason);

    dataDetailEnforcement.forEach((data, index) => {
      formData.append(
        `Enforcement.InvestmentDetails[${index}]`,
        JSON.stringify(data)
      );
    });

    selectedData.forEach((approval, index) => {
      formData.append(
        `Enforcement.Approvals[${index}]`,
        JSON.stringify(approval)
      );
    });

    const response = await createNonEnforcement(formData);

    if (response?.success) {
      resetSaveData();
      getDeliberationPagination(dataEpPagination);
    }
  };

  const handleShowAddItem = () => {
    if (!fiscalYear) {
      Swal.fire({
        icon: "error",
        title: "Opss...",
        text: "Please Select Fiscal Year",
      });

      return true;
    }

    setShowAddItem(true);
  };

  return (
    <>
      <Modal
        name="Enforcement Non Budget"
        size="6xl"
        setShow={handleClose}
        group={<ButtonAddNewItem handleSave={handleSaveData} />}
        loading={isLoading}
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
          <div className="flex flex-col mt-3 gap-4">
            <div className="flex items-center gap-4">
              <div className="w-full md:w-2/12">
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
                  readonly={false}
                />
              </div>
              <div className="w-full md:w-2/12">
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
                  readonly={false}
                />
              </div>
              <div className="w-full md:w-5/12">
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
                  readonly={false}
                />
              </div>
              <div className="w-full md:w-3/12">
                <AutoComplete
                  label="Investment Priority"
                  value={investPriority}
                  setChange={(e: any, v: any) => {
                    e.preventDefault();
                    setInvestPriority(v);
                  }}
                  options={dataInvestPriorities}
                  getOptionLabel={(option: any) => option?.name}
                  isOptionEqualToValue={(option: any, value: any) =>
                    option?.name == value?.name || ""
                  }
                  required={true}
                  readonly={false}
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-full md:w-4/12">
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
                  readonly={false}
                />
              </div>
              <div className="w-full md:w-4/12">
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
                    option?.name == value?.name || ""
                  }
                  required={true}
                  readonly={false}
                />
              </div>
              <div className="w-full md:w-4/12">
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
                  required={true}
                  readonly={!investGroup}
                />
              </div>
            </div>

            <div>
              <div className="w-28">
                <GeneralButton
                  colorButton="primary"
                  title="Add Item"
                  variantButton="contained"
                  handleClick={handleShowAddItem}
                />
              </div>
            </div>
            <div className="">
              <Table
                columnDefs={columnDefs}
                isLoading={isLoading}
                rowData={dataDetailEnforcement}
                sizeTable={200}
                doubleClick={(params: any) => {
                  setDoubleClickItem(params?.data);
                  setShowAddItem(true);
                }}
              />
            </div>

            <div className="flex md:justify-between mt-2 mb-2">
              <div className="w-full md:w-1/3">
                <p className="text-sm">Attachment</p>
                <div>
                  <div>
                    <label
                      htmlFor="example1"
                      className="text-xs font-normal text-gray-700 m-0"
                    >
                      Explanation Document *
                    </label>
                  </div>
                  <InputFile
                    handleChange={(e: any) =>
                      setExplanationDocument(e.target.files[0])
                    }
                  />
                </div>
                <div className="mt-2">
                  <div>
                    <label
                      htmlFor="example1"
                      className="text-xs font-normal text-gray-700 m-0"
                    >
                      Quotation *
                    </label>
                  </div>
                  <InputFile
                    handleChange={(e: any) => setQuotation(e.target.files[0])}
                  />
                </div>
                <div className="mt-2">
                  <div>
                    <label
                      htmlFor="example1"
                      className="text-xs font-normal text-gray-700 m-0"
                    >
                      NPV Calculation *
                    </label>
                  </div>
                  <InputFile
                    handleChange={(e: any) =>
                      setNvpCalculation(e.target.files[0])
                    }
                  />
                </div>
                <div className="mt-2">
                  <div>
                    <label
                      htmlFor="example1"
                      className="text-xs font-normal text-gray-700 m-0"
                    >
                      Katalog
                    </label>
                  </div>
                  <InputFile
                    handleChange={(e: any) => setCatalog(e.target.files[0])}
                  />
                </div>
                <div className="mt-2">
                  <div>
                    <label
                      htmlFor="example1"
                      className="text-xs font-normal text-gray-700 m-0"
                    >
                      Other
                    </label>
                  </div>
                  <InputFile
                    handleChange={(e: any) => setOther(e.target.files[0])}
                  />
                </div>
              </div>
              <div className="w-full md:w-2/3 mt-4">
                <div className="w-full">
                  <TextFieldInput
                    label="Investment Plan Name"
                    multiline={true}
                    rows={2}
                    type="text"
                    readonly={false}
                    required={true}
                    value={investPlanName}
                    handleChange={(e: any) => setInvestPlanName(e.target.value)}
                  />
                </div>
                <div className="w-full mt-3">
                  <TextFieldInput
                    label="Enforcement Plan Explanation"
                    multiline={true}
                    rows={2}
                    type="text"
                    readonly={false}
                    required={true}
                    value={epExplanation}
                    handleChange={(e: any) => setEpExplanation(e.target.value)}
                  />
                </div>
                <div className="w-full mt-3">
                  <TextFieldInput
                    label="Non Budget Reason"
                    multiline={true}
                    rows={2}
                    type="text"
                    readonly={false}
                    required={true}
                    value={nonBudgetReason}
                    handleChange={(e: any) =>
                      setNonBudgetReason(e.target.value)
                    }
                  />
                </div>
                <div className="flex flex-row items-center gap-4 mt-3">
                  <div>
                    <label
                      htmlFor="example1"
                      className="text-xs font-normal text-gray-700 m-0"
                    >
                      Approval *
                    </label>
                  </div>
                  <div>
                    <ApprovalButton
                      title="Set Approval"
                      handleClick={handleShowApproval}
                    />
                  </div>
                </div>

                <div className="flex flex-row items-center">
                  <AvatarInitialBudgetPlan data={sortSelectedData} />
                </div>
              </div>
            </div>
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

      {showAddItem ? (
        <ModalAddItem
          dataDetailEnforcement={dataDetailEnforcement}
          setDataDetailEnforcement={setDataDetailEnforcement}
          doubleClickItem={doubleClickItem}
          setDoubleClickItem={setDoubleClickItem}
          nonBudget={true}
        />
      ) : null}
    </>
  );
};

export default ModalAddNonBudget;
