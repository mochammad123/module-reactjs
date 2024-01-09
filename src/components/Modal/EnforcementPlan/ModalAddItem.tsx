import React, { useEffect, useState } from "react";
import Modal from "../../../modules/modal/Modal";
import ReactLoading from "react-loading";
import useEnfocementPlanApi from "../../../apis/budget/enforcementPlanApi";
import useFiscalYearApi from "../../../apis/reference/fiscalYearApi";
import TextFieldInput from "../../../modules/Input/TextFieldInput";
import AutoComplete from "../../../modules/Input/AutoComplete";
import CheckboxApproval from "../../../modules/checkbox/CheckboxApproval";
import TextFieldMenuItem from "../../../modules/Input/TextFieldMenuItem";
import TextFieldTotalAmount from "../../../modules/Input/TextFieldTotalAmount";
import ButtonAddItem from "./Button/ButtonAddItem";
import {
  IDataDetailEnforcement,
  IModalAddItem,
  ISupplier,
} from "../../../interface/EnforcementPlan/IEnfocementPlan";
import {
  ExchangeRate,
  InvestmentGroup,
  InvestmentGroupItem,
} from "../../../interface/BudgetPlan/IBudgetPlan";
import sortData from "../../../modules/function/SortData";
import useBudgetPlanApi from "../../../apis/budget/budgetPlanApi";
import numeral from "numeral";
import Swal from "sweetalert2";

const ModalAddItem: React.FC<IModalAddItem> = ({
  dataSameCompletion,
  dataDetailEnforcement,
  setDataDetailEnforcement,
  doubleClickItem,
  setDoubleClickItem,
  nonBudget,
}) => {
  const {
    setShowAddItem,
    dataDoubleClick,
    dataPraEnforcement,
    getPraEnforcement,
  } = useEnfocementPlanApi();

  const {
    dataExchangeRateFiscal,
    getExchangeRateFiscalYear,
    isLoadingExchangeRateFiscal,
  } = useFiscalYearApi();

  const { dataPraBudgetPlan } = useBudgetPlanApi();

  const [itemName, setItemName] = useState<string>("");
  const [shortExplanation, setShortExplanation] = useState<string>("");
  const [supplier, setSupplier] = useState<ISupplier | null>(null);
  const [completionPlan, setCompletionPlan] = useState("");
  const [investGroup, setInvestGroup] = useState<InvestmentGroup | null>(null);
  const [dataGroupItems, setDataGroupItems] = useState<InvestmentGroupItem[]>(
    []
  );
  const [groupItem, setGroupItem] = useState<InvestmentGroupItem | null>(null);
  const [exchangeRate, setExchangeRate] = useState<ExchangeRate | null>(null);
  const [sameCompletion, setSameCompletion] = useState<boolean>(false);
  const [moveable, setMoveable] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>("0");
  const [qty, setQty] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<string>("0");
  const [totalAmountUsd, setTotalAmountUsd] = useState<string>("0");

  const handleClose = () => {
    setShowAddItem(false);
    setDoubleClickItem(null);
  };

  useEffect(() => {
    if (!nonBudget) {
      getExchangeRateFiscalYear(dataDoubleClick?.fiscalYearId);
    } else {
      getExchangeRateFiscalYear(dataDoubleClick?.id);
      getPraEnforcement(dataDoubleClick?.id, true);
    }
  }, [dataDoubleClick, nonBudget]);

  useEffect(() => {
    if (doubleClickItem) {
      setItemName(doubleClickItem?.investName);
      setShortExplanation(doubleClickItem?.investExplain);
      setSupplier(doubleClickItem?.supplier);
      setCompletionPlan(doubleClickItem?.completionDatePlan);
      setInvestGroup(doubleClickItem?.investGroup);
      setExchangeRate(doubleClickItem?.exchangeRate);
      setMoveable(doubleClickItem?.isMoveable);
    }
  }, [doubleClickItem]);

  useEffect(() => {
    if (dataExchangeRateFiscal) {
      const idrCur: ExchangeRate = dataExchangeRateFiscal?.data?.find(
        (item: ExchangeRate) => {
          return item?.currency === "idr";
        }
      );
      if (idrCur) {
        setExchangeRate(idrCur);
      }
    }
    console.clear();
  }, [dataExchangeRateFiscal]);

  const suppliers = sortData(
    "supplier",
    dataPraEnforcement?.data?.suppliers,
    "name",
    "name"
  );

  const investGroups = sortData(
    "investGroup",
    dataPraBudgetPlan?.data?.invesmentGroups,
    "name",
    "name"
  );

  useEffect(() => {
    if (investGroup) {
      setDataGroupItems(investGroup?.investmentGroupItems || []);
    }
    setGroupItem(null);
  }, [investGroup]);

  useEffect(() => {
    if (doubleClickItem && investGroup) {
      setDataGroupItems(investGroup?.investmentGroupItems || []);
      setGroupItem(doubleClickItem?.investGroupItem);
    }
  }, [investGroup, doubleClickItem]);

  useEffect(() => {
    calculateTotalAmountUsd();
    calculateTotalAmount();
    if (amount?.trim() == "") {
      setTotalAmountUsd("0.00");
      setAmount("0");
    }

    if (!qty) {
      setQty(0);
    }

    if (qty == 0) {
      setTotalAmount("0.00");
    }
  }, [amount, qty, totalAmount]);

  useEffect(() => {
    setAmount("0");
    setQty(0);
    setTotalAmount("0");
    setTotalAmountUsd("0");
  }, [exchangeRate]);

  useEffect(() => {
    if (doubleClickItem) {
      setAmount(numeral(doubleClickItem?.unitPrice).format("0,0.00"));
      setQty(parseInt(doubleClickItem?.qty));
      setTotalAmount(
        numeral(doubleClickItem?.totalAmountItem).format("0,0.00")
      );
      setTotalAmountUsd(
        numeral(doubleClickItem?.totalAmountUsd).format("0,0.00")
      );
    }
  }, [doubleClickItem, exchangeRate]);

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
      }
    }
  };

  const calculateTotalAmount = () => {
    if (amount && typeof amount == "string" && qty) {
      const priceValue = parseFloat((amount as string).replace(/,/g, ""));
      if (exchangeRate && exchangeRate.usdRates !== undefined) {
        const totalAmountValue = (priceValue * qty)?.toFixed(2);
        const formattedTotalAmount = numeral(totalAmountValue).format("0,0.00");
        setTotalAmount(formattedTotalAmount);
      }
    }
  };

  useEffect(() => {
    if (sameCompletion) {
      setCompletionPlan(dataSameCompletion ? dataSameCompletion : "");
    } else {
      setCompletionPlan("");
    }
  }, [sameCompletion]);

  const lastItem = dataDetailEnforcement[dataDetailEnforcement?.length - 1];
  const nextId = lastItem ? lastItem?.id + 1 : 1;

  const newData: IDataDetailEnforcement = {
    id: doubleClickItem ? doubleClickItem?.id : nextId,
    investName: itemName,
    investExplain: shortExplanation,
    supplierId: supplier?.id || 0,
    supplierName: supplier?.name || "",
    investGroupId: investGroup?.groupNumber || "",
    investGroupName: investGroup?.name || "",
    investGroupItemId: groupItem?.id || 0,
    investGroupItemName: groupItem?.name || "",
    completionDatePlan: completionPlan,
    currency: exchangeRate?.currency || "",
    unitPrice: parseFloat(amount.replace(/,/g, "")),
    qty: qty || 0,
    currencyRates: exchangeRate?.usdRates || 0,
    totalAmountItem: parseFloat(totalAmount.replace(/,/g, "")),
    totalAmountUsd: parseFloat(totalAmountUsd.replace(/,/g, "")),
    isMoveable: moveable,
    supplier: supplier || null,
    exchangeRate: exchangeRate || null,
    investGroup: investGroup || null,
    investGroupItem: groupItem || null,
  };

  const handleValidateAddItem = () => {
    if (!itemName || itemName == "") {
      Swal.fire({
        icon: "error",
        title: "Opss...",
        text: "Please input Item Name",
      });

      return false;
    } else if (!shortExplanation || shortExplanation == "") {
      Swal.fire({
        icon: "error",
        title: "Opss...",
        text: "Please input Short Explanation",
      });

      return false;
    } else if (!supplier) {
      Swal.fire({
        icon: "error",
        title: "Opss...",
        text: "Please select Supplier",
      });

      return false;
    } else if (!completionPlan || completionPlan == "") {
      Swal.fire({
        icon: "error",
        title: "Opss...",
        text: "Please input Completion Plan",
      });

      return false;
    } else if (!investGroup) {
      Swal.fire({
        icon: "error",
        title: "Opss...",
        text: "Please select Invest Group",
      });

      return false;
    } else if (!groupItem) {
      Swal.fire({
        icon: "error",
        title: "Opss...",
        text: "Please select Group Item",
      });

      return false;
    } else if (!exchangeRate) {
      Swal.fire({
        icon: "error",
        title: "Opss...",
        text: "Please select Exchange Rate",
      });

      return false;
    } else if (!amount || amount == "" || amount == "0" || amount == "0.00") {
      Swal.fire({
        icon: "error",
        title: "Opss...",
        text: "Please input Amount",
      });

      return false;
    } else if (!qty || qty == 0) {
      Swal.fire({
        icon: "error",
        title: "Opss...",
        text: "Please input Qty",
      });

      return false;
    } else if (
      !totalAmount ||
      totalAmount == "" ||
      totalAmount == "0" ||
      totalAmount == "0.00"
    ) {
      Swal.fire({
        icon: "error",
        title: "Opss...",
        text: "Please input Total Amount",
      });

      return false;
    } else if (
      !totalAmountUsd ||
      totalAmountUsd == "" ||
      totalAmountUsd == "0"
    ) {
      Swal.fire({
        icon: "error",
        title: "Opss...",
        text: "Please input Total Amount USD",
      });

      return false;
    }

    return true;
  };

  const reset = () => {
    setItemName("");
    setShortExplanation("");
    setSupplier(null);
    setInvestGroup(null);
    setDataGroupItems([]);
    setGroupItem(null);
    setExchangeRate(null);
    setSameCompletion(false);
    setMoveable(false);
    setAmount("0");
    setQty(0);
    setTotalAmount("0");
    setTotalAmountUsd("0");
    setShowAddItem(false);
    setDoubleClickItem(null);
  };

  const handleAddItem = () => {
    if (!handleValidateAddItem()) {
      return;
    }

    setDataDetailEnforcement((prevData: any) => [...prevData, newData]);
    reset();

    console.clear();
  };

  const deleteItem = (idItem: number) => {
    Swal.fire({
      title: "Are you sure want to delete ?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        const index = dataDetailEnforcement?.findIndex(
          (item: any) => item?.id === idItem
        );

        if (index !== -1) {
          const newDataArray = [...dataDetailEnforcement];
          newDataArray.splice(index, 1);
          setDataDetailEnforcement(newDataArray);

          reset();
        }
      }
    });
  };

  const updateItem = (idItem: number) => {
    if (!handleValidateAddItem()) {
      return;
    }

    setDataDetailEnforcement((prevData: any) =>
      prevData?.map((item: any) => (item?.id === idItem ? newData : item))
    );
    reset();
  };

  return (
    <>
      <Modal
        name="Add Item"
        size="6xl"
        setShow={handleClose}
        group={
          <ButtonAddItem
            handleSave={handleAddItem}
            handleDelete={() => deleteItem(doubleClickItem?.id)}
            handleUpdate={() => updateItem(doubleClickItem?.id)}
            data={doubleClickItem}
          />
        }
      >
        {isLoadingExchangeRateFiscal ? (
          <div className="h-96">
            <div className="flex h-full">
              <div className="m-auto">
                <ReactLoading type="spin" color="#0B2447" />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col mt-3 mb-3 gap-3">
            <div className="flex flex-row gap-4">
              <div className="w-full md:w-1/3">
                <TextFieldInput
                  label="Item Name"
                  multiline={false}
                  type="text"
                  readonly={false}
                  required={true}
                  value={itemName}
                  handleChange={(e: any) => setItemName(e.target.value)}
                />
              </div>
              <div className="w-full md:w-2/3">
                <TextFieldInput
                  label="Short Explanation"
                  multiline={false}
                  type="text"
                  readonly={false}
                  required={true}
                  value={shortExplanation}
                  handleChange={(e: any) => setShortExplanation(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-row gap-4 mt-2">
              <div className="w-full md:w-1/3">
                <AutoComplete
                  label="Supplier"
                  value={supplier}
                  setChange={(e: any, v: any) => {
                    e.preventDefault();
                    setSupplier(v);
                  }}
                  options={suppliers}
                  getOptionLabel={(option: any) => option?.name}
                  isOptionEqualToValue={(option: any, value: any) =>
                    option?.name == value?.name || ""
                  }
                  required={true}
                  readonly={false}
                />
              </div>
              <div className="w-full md:w-1/4">
                <TextFieldInput
                  label="Completion Plan (mm/dd/yyyy)"
                  multiline={false}
                  type="date"
                  readonly={sameCompletion ? true : false}
                  required={true}
                  value={completionPlan}
                  handleChange={(e: any) => setCompletionPlan(e.target.value)}
                />
              </div>
              {!nonBudget ? (
                <div className="w-full md:w-2/4">
                  <CheckboxApproval
                    label="Same as completion budget plan"
                    defaultChecked={false}
                    disabled={false}
                    checked={sameCompletion}
                    handleChange={setSameCompletion}
                  />
                </div>
              ) : null}
            </div>

            <div className="flex flex-row gap-4">
              <div className="w-full md:w-1/3">
                <AutoComplete
                  label="Investment Group"
                  value={investGroup}
                  setChange={(e: any, v: any) => {
                    e.preventDefault();
                    setInvestGroup(v);
                  }}
                  options={investGroups}
                  getOptionLabel={(option: any) => option?.name}
                  isOptionEqualToValue={(option: any, value: any) =>
                    option?.name == value?.name || ""
                  }
                  required={true}
                  readonly={false}
                />
              </div>
              <div className="w-full md:w-2/4">
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
                  readonly={investGroup ? false : true}
                />
              </div>
              <div className="w-full md:w-1/4">
                <CheckboxApproval
                  label="Moveable Asset"
                  defaultChecked={false}
                  disabled={false}
                  checked={moveable}
                  handleChange={setMoveable}
                />
              </div>
            </div>

            <div className="flex flex-row gap-4">
              <div className="w-full md:w-2/6">
                <TextFieldMenuItem
                  valueSelect={exchangeRate}
                  handleSelect={(e: any) => setExchangeRate(e.target.value)}
                  disabled={undefined}
                  required={true}
                  label="Amount"
                  data={
                    dataExchangeRateFiscal ? dataExchangeRateFiscal?.data : []
                  }
                  valueTextField={amount}
                  handleTextField={setAmount}
                />
              </div>
              <div className="w-full md:w-1/6">
                <TextFieldInput
                  label="Qty"
                  multiline={false}
                  type="number"
                  textAlign={true}
                  readonly={false}
                  required={true}
                  value={qty}
                  handleChange={(e: any) => {
                    const value = e.target.value;
                    if (!isNaN(value) && parseFloat(value) >= 0) {
                      setQty(parseInt(value));
                    }
                  }}
                />
              </div>
              <div className="w-full md:w-1/4">
                <TextFieldInput
                  label="Total"
                  multiline={false}
                  type="text"
                  textAlign={true}
                  readonly={true}
                  required={true}
                  value={totalAmount}
                />
              </div>
              <div className="w-full md:w-1/4">
                <TextFieldTotalAmount value={totalAmountUsd} disabled={true} />
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default ModalAddItem;
