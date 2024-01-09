interface IDeliberation {
  fiscalYearsId: number;
  departmentId: number;
  ops: string;
  amount: string;
  page: number;
  perPage: number;
  keyWord: string;
  sortBy: string;
  sortDirection: string;
  status: string;
  enforcementFlag: boolean;
}

interface IDataPagination {
  total: number;
  page: number;
  nextPage?: any;
  value: number;
  handleChange?: any;
}

interface IModalDeliberation {
  dataDeliberation?: any;
}

interface IButtonModal {
  yourApprovalStatus?: string;
  handleSave?: any;
}

interface IStatus {
  id?: number;
  value?: string;
  name?: string;
}

interface IOps {
  id?: number;
  name?: string;
}

export type {
  IDeliberation,
  IDataPagination,
  IModalDeliberation,
  IButtonModal,
  IStatus,
  IOps,
};
