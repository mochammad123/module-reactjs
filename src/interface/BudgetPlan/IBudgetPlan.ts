interface IBudgetPlan {
  dataBudgetPlan?: any;
}

interface InvestmentGroupItem {
  id: number;
  name: string;
}

interface InvestmentGroup {
  groupNumber: string;
  name: string;
  description: string;
  example: string;
  usefulLife: number;
  investmentGroupItems: InvestmentGroupItem[];
}

interface FiscalYear {
  id: number;
  years: string;
  name: string;
}

interface CostCenter {
  id: number;
  code: string;
  costCenter: string;
}

interface Section {
  id: number;
  name: string;
  isFoh: boolean;
}

interface ProposalCategory {
  id: number;
  code: string;
  name: string;
  description: string;
}

interface InvestPriority {
  id: number;
  name: string;
}

interface ExchangeRate {
  id?: number;
  date?: string;
  currency?: string;
  usdRates?: number;
}

interface IButtonModal {
  data?: any;
  handleSave?: any;
  handleUpdate?: any;
  handleDelete?: any;
  handleApproval?: any;
  handleReject?: any;
}

interface DataBudgetPlanResponse {
  page: number;
  perPage: number;
  keyWord: string;
  isWaitApproval: boolean;
  sortBy: string;
  sortDirection: string;
  approvalStatus: string;
}

export type {
  IBudgetPlan,
  InvestmentGroupItem,
  InvestmentGroup,
  FiscalYear,
  ExchangeRate,
  IButtonModal,
  CostCenter,
  Section,
  ProposalCategory,
  InvestPriority,
  DataBudgetPlanResponse,
};
