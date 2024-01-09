import { useEffect, useState } from "react";
import Modal from "../../../modules/modal/Modal";
import ReactLoading from "react-loading";
import useEnfocementPlanApi from "../../../apis/budget/enforcementPlanApi";
import GeneralButton from "../../../modules/button/GeneralButton";
import Table from "../../../modules/table/agGrid/Table";
import InputFile from "../../../modules/Input/InputFile";
import TextFieldInput from "../../../modules/Input/TextFieldInput";
import ModalAddItem from "./ModalAddItem";
import { IDataDetailEnforcement } from "../../../interface/EnforcementPlan/IEnfocementPlan";
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

const ModalAddNewItem = () => {
  const {
    setShowAddNew,
    isLoading,
    dataDoubleClick,
    isLoadingPraEnforcement,
    dataPraEnforcement,
    getPraEnforcement,
    showAddItem,
    setShowAddItem,
    createEnforcement,
    dataEpPagination,
    setShow,
  } = useEnfocementPlanApi();

  const { getDeliberationPagination } = useDeliberationApi();

  const [explanationDocument, setExplanationDocument] = useState<File | null>(
    null
  );
  const [quotation, setQuotation] = useState<File | null>(null);
  const [nvpCalculation, setNvpCalculation] = useState<File | null>(null);
  const [catalog, setCatalog] = useState<File | null>(null);
  const [other, setOther] = useState<File | null>(null);
  const [epExplanation, setEpExplanation] = useState<string>("");
  const [overBudget, setOverBudget] = useState<string>("");

  const [dataDetailEnforcement, setDataDetailEnforcement] = useState<
    IDataDetailEnforcement[]
  >([]);

  const [doubleClickItem, setDoubleClickItem] = useState(null);

  const handleClose = () => {
    setShowAddNew(false);
    resetSaveData();
  };

  const { fiscalYearId, budgetNumber } = dataDoubleClick;

  useEffect(() => {
    getPraEnforcement(fiscalYearId, true);
  }, [dataDoubleClick]);

  const dataBudgetPlan = dataPraEnforcement?.data?.budgetPlans;

  let budgetSaldo = 0;
  let budgetSaldoValue;
  let dataSameCompletion;
  let totalUsd = 0;
  let totalUsdValue;
  let budgetDiffrent = 0;
  let budgetDiffrentValue;

  for (let i = 0; i < dataBudgetPlan?.length; i++) {
    if (dataBudgetPlan[i].budgetNumber == budgetNumber) {
      budgetSaldo = dataBudgetPlan[i]?.budgetSaldo;
      budgetSaldoValue = budgetSaldo.toLocaleString(undefined, {
        minimumFractionDigits: 2,
      });
      dataSameCompletion = dataBudgetPlan[i]?.completionDatePlan;
    }
  }

  if (dataDetailEnforcement?.length > 0) {
    for (let i = 0; i < dataDetailEnforcement?.length; i++) {
      totalUsd += dataDetailEnforcement[i].totalAmountUsd;
      totalUsdValue = totalUsd.toLocaleString(undefined, {
        minimumFractionDigits: 2,
      });

      budgetDiffrent = budgetSaldo - totalUsd;
      budgetDiffrentValue = budgetDiffrent.toLocaleString(undefined, {
        minimumFractionDigits: 2,
      });
    }
  }

  const handleValidateSaveData = () => {
    if (!dataDetailEnforcement || dataDetailEnforcement.length <= 0) {
      Swal.fire({
        icon: "error",
        title: "Opss...",
        text: "Please Input Add Item",
      });

      return false;
    } else if (totalUsd > 50000) {
      if (
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
        !catalog ||
        (catalog instanceof File && catalog.name.trim() === "")
      ) {
        Swal.fire({
          icon: "error",
          title: "Opss...",
          text: "Please Input Catalog",
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
          text: "Please Enforcement Explanation",
        });

        return false;
      } else if (totalUsd > budgetSaldo) {
        if (!overBudget || overBudget == "" || overBudget.trim() == "") {
          Swal.fire({
            icon: "error",
            title: "Opss...",
            text: "Please Enforcement Explanation",
          });

          return false;
        }
      }
    } else if (totalUsd <= 50000) {
      if (
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
        !epExplanation ||
        epExplanation == "" ||
        epExplanation.trim() == ""
      ) {
        Swal.fire({
          icon: "error",
          title: "Opss...",
          text: "Please Enforcement Explanation",
        });

        return false;
      } else if (totalUsd > budgetSaldo) {
        if (!overBudget || overBudget == "" || overBudget.trim() == "") {
          Swal.fire({
            icon: "error",
            title: "Opss...",
            text: "Please Enforcement Explanation",
          });

          return false;
        }
      }
    }

    return true;
  };

  const resetSaveData = () => {
    setExplanationDocument(null);
    setQuotation(null);
    setNvpCalculation(null);
    setCatalog(null);
    setOther(null);
    setEpExplanation("");
    setOverBudget("");
    setDataDetailEnforcement([]);
    setDoubleClickItem(null);
    setShowAddNew(false);
    setShow(false);
  };

  const handleSaveData = async (e: any) => {
    e.preventDefault();

    if (!handleValidateSaveData()) {
      return;
    }

    const formData = new FormData();

    if (explanationDocument) {
      formData.append(
        "AttachExplainDoc",
        explanationDocument,
        explanationDocument.name
      );
    }
    if (quotation) {
      formData.append("AttachQuotation", quotation, quotation?.name);
    }
    if (nvpCalculation) {
      formData.append("AttachNpvCalc", nvpCalculation, nvpCalculation?.name);
    }
    if (catalog) {
      formData.append("AttachCatalogue", catalog, catalog?.name);
    }
    if (other) {
      formData.append("AttachOther", other, other?.name);
    }
    formData.append("EnfPlanExplain", epExplanation);
    formData.append(
      "OverBudgetReason",
      !overBudget || overBudget == "" || overBudget.trim() == ""
        ? "-"
        : overBudget
    );
    formData.append("BudgetNumber", budgetNumber);

    dataDetailEnforcement.forEach((data, index) => {
      formData.append(`InvestmentDetails[${index}]`, JSON.stringify(data));
    });

    const response = await createEnforcement(formData);

    if (response?.success) {
      resetSaveData();
      getDeliberationPagination(dataEpPagination);
    }
  };

  return (
    <>
      <Modal
        name="Enfocement"
        size="6xl"
        setShow={handleClose}
        group={<ButtonAddNewItem handleSave={handleSaveData} />}
        loading={isLoading}
      >
        {isLoadingPraEnforcement ? (
          <div className="h-96">
            <div className="flex h-full">
              <div className="m-auto">
                <ReactLoading type="spin" color="#0B2447" />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col mt-3">
            <div className="w-28">
              <GeneralButton
                colorButton="primary"
                title="Add Item"
                variantButton="contained"
                handleClick={() => setShowAddItem(true)}
              />
            </div>
            <div className="mt-3">
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
            <div className="flex justify-end mt-2 mb-2">
              <div className="w-full md:w-1/2">
                <p className="text-sm">Amount Budget Approved (USD)</p>
                <p className="text-sm">Total Amount (USD)</p>
                <p className="text-sm">Amount Budget Diffrent (USD)</p>
              </div>
              <div>
                <p className="text-sm text-end">
                  {budgetSaldoValue ? budgetSaldoValue : 0.0}
                </p>
                <p className="text-sm text-end">
                  {totalUsdValue ? totalUsdValue : 0.0}
                </p>
                <p className="text-sm text-end">
                  {budgetDiffrentValue ? budgetDiffrentValue : 0.0}
                </p>
              </div>
            </div>
            <hr />
            <div className="flex md:justify-between mt-2">
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
                      Katalog {totalUsd > 50000 ? "*" : null}
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
                    label="Enforcement Plan Explanation"
                    multiline={true}
                    rows={3}
                    type="text"
                    readonly={false}
                    required={true}
                    value={epExplanation}
                    handleChange={(e: any) => setEpExplanation(e.target.value)}
                  />
                </div>
                {totalUsd > budgetSaldo ? (
                  <div className="w-full mt-3">
                    <TextFieldInput
                      label="Over Budget Reason"
                      multiline={true}
                      rows={3}
                      type="text"
                      readonly={false}
                      required={true}
                      value={overBudget}
                      handleChange={(e: any) => setOverBudget(e.target.value)}
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </Modal>

      {showAddItem ? (
        <ModalAddItem
          dataSameCompletion={dataSameCompletion}
          dataDetailEnforcement={dataDetailEnforcement}
          setDataDetailEnforcement={setDataDetailEnforcement}
          doubleClickItem={doubleClickItem}
          setDoubleClickItem={setDoubleClickItem}
          nonBudget={false}
        />
      ) : null}
    </>
  );
};

export default ModalAddNewItem;
