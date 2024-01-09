import {
  ExchangeRate,
  InvestmentGroup,
  InvestmentGroupItem,
} from "../BudgetPlan/IBudgetPlan";

interface IDataEnforcementPlan {
  total: number;
  page: number;
  nextPage?: any;
  value: number;
  handleChange?: any;
}

interface ISupplier {
  id: number;
  initial: string;
  name: string;
  phoneNumber: string;
}

interface IModalAddItem {
  dataSameCompletion?: string;
  dataDetailEnforcement: any;
  setDataDetailEnforcement: any;
  doubleClickItem?: any;
  setDoubleClickItem?: any;
  nonBudget?: boolean;
}

interface IDataDetailEnforcement {
  id: number;
  investName: string;
  investExplain: string;
  supplierId: number;
  supplierName: string;
  investGroupId: string;
  investGroupName: string;
  investGroupItemId: number;
  investGroupItemName: string;
  completionDatePlan: string;
  currency: string;
  unitPrice: number;
  qty: number;
  currencyRates: number;
  totalAmountItem: number;
  totalAmountUsd: number;
  isMoveable: boolean;
  supplier: ISupplier | null;
  exchangeRate: ExchangeRate | null;
  investGroup: InvestmentGroup | null;
  investGroupItem: InvestmentGroupItem | null;
}

export type {
  IDataEnforcementPlan,
  ISupplier,
  IModalAddItem,
  IDataDetailEnforcement,
};
