import { create } from "zustand";
import Swal from "sweetalert2";
import Api from "../api";

// const token = localStorage.getItem("token");
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

interface IEnforcementPlan {
  dataEpByBudget: any;
  dataPraEnforcement: any;
  dataEnforcementDetail: any;
  isLoadingEpByBudget: boolean;
  isLoadingPraEnforcement: boolean;
  isLoading: boolean;
  isLoadingEnforcementDetail: boolean;
  error: any;
  response: any;
  dataEpPagination: any;
  setDataEpPagination: any;
  show?: any;
  setShow?: any;
  showAddNew?: any;
  setShowAddNew?: any;
  showAddItem?: any;
  setShowAddItem?: any;
  showNonBudget?: any;
  setShowNonBudget?: any;
  dataDoubleClick?: any;
  setDataDoubleClick?: any;
  dataItem?: any;
  setDataItem?: any;
  getEnforcementByBudget: (budgetNumber: string) => Promise<any>;
  getPraEnforcement: (fiscalYearId: number, isBudget: boolean) => Promise<any>;
  createEnforcement: (data: any) => Promise<any>;
  getEnforcementDetail: (id: number) => Promise<any>;
  createNonEnforcement: (data: any) => Promise<any>;
}

const useEnfocementPlanApi = create<IEnforcementPlan>((set) => ({
  dataEpByBudget: [],
  dataPraEnforcement: [],
  dataEnforcementDetail: [],
  isLoadingEpByBudget: false,
  isLoadingPraEnforcement: false,
  isLoading: false,
  isLoadingEnforcementDetail: false,
  error: null,
  response: null,
  dataEpPagination: null,
  setDataEpPagination: (item: any) => set({ dataEpPagination: item }),
  show: null,
  setShow: (item: boolean) => set({ show: item }),
  showAddNew: null,
  setShowAddNew: (item: boolean) => set({ showAddNew: item }),
  showAddItem: null,
  setShowAddItem: (item: boolean) => set({ showAddItem: item }),
  showNonBudget: null,
  setShowNonBudget: (item: boolean) => set({ showNonBudget: item }),
  dataDoubleClick: null,
  setDataDoubleClick: (item: any) => set({ dataDoubleClick: item }),
  dataItem: [],
  setDataItem: (item: any) => set({ dataItem: item }),

  getEnforcementByBudget: async (budgetNumber) => {
    set({ isLoadingEpByBudget: true });

    try {
      const response = await Api.get("Enforcement/ByBudget", {
        params: {
          budgetNumber: budgetNumber,
        },
      });
      set({
        dataEpByBudget: response.data,
        isLoadingEpByBudget: false,
      });
      return response.data;
    } catch (error: any) {
      if (error?.response?.status === 401) {
        Swal.fire({
          icon: "warning",
          title: "Unauthenticated",
          text: "Silahkan login ulang!",
          confirmButtonText: "Go to Login page",
        });
        localStorage.removeItem("token");
        window.location.reload();
      }
      set({ error: error, isLoadingEpByBudget: false });
    }
  },

  getPraEnforcement: async (fiscalYearId, isBudget) => {
    set({ isLoadingPraEnforcement: true });

    try {
      const response = await Api.get("Enforcement/Pra", {
        params: {
          fiscalYearId: fiscalYearId,
          isBudget: isBudget,
        },
      });
      set({
        dataPraEnforcement: response.data,
        isLoadingPraEnforcement: false,
      });
      return response.data;
    } catch (error: any) {
      if (error?.response?.status === 401) {
        Swal.fire({
          icon: "warning",
          title: "Unauthenticated",
          text: "Silahkan login ulang!",
          confirmButtonText: "Go to Login page",
        });
        localStorage.removeItem("token");
        window.location.reload();
      }
      set({ error: error, isLoadingPraEnforcement: false });
    }
  },

  createEnforcement: async (data) => {
    set({ isLoading: true });
    try {
      const response = await Api.post("Enforcement", data);
      set({ response: response?.data, isLoading: false });
      Toast.fire({
        icon: "success",
        title: `${response?.data?.message}`,
      });
      return response?.data;
    } catch (error: any) {
      console.log(error);
      if (error?.response?.status === 401) {
        Swal.fire({
          icon: "warning",
          title: "Unauthenticated",
          text: "Silahkan login ulang!",
          confirmButtonText: "Go to Login page",
        });
        localStorage.removeItem("token");
        window.location.reload();
      } else {
        Swal.fire({
          icon: "error",
          title: "Opss...",
          text: error?.response?.data?.message,
        });
      }

      set({ error: error, isLoading: false });
    }
  },

  getEnforcementDetail: async (id) => {
    set({ isLoadingEnforcementDetail: true });

    try {
      const response = await Api.get("Enforcement/Id", {
        params: {
          enforcementId: id,
        },
      });
      set({
        dataEnforcementDetail: response.data,
        isLoadingEnforcementDetail: false,
      });
      return response.data;
    } catch (error: any) {
      if (error?.response?.status === 401) {
        Swal.fire({
          icon: "warning",
          title: "Unauthenticated",
          text: "Silahkan login ulang!",
          confirmButtonText: "Go to Login page",
        });
        localStorage.removeItem("token");
        window.location.reload();
      }
      set({ error: error, isLoadingEnforcementDetail: false });
    }
  },

  createNonEnforcement: async (data) => {
    set({ isLoading: true });
    try {
      const response = await Api.post("Enforcement/NonBudget", data);
      set({ response: response?.data, isLoading: false });
      Toast.fire({
        icon: "success",
        title: `${response?.data?.message}`,
      });
      return response?.data;
    } catch (error: any) {
      console.log(error);
      if (error?.response?.status === 401) {
        Swal.fire({
          icon: "warning",
          title: "Unauthenticated",
          text: "Silahkan login ulang!",
          confirmButtonText: "Go to Login page",
        });
        localStorage.removeItem("token");
        window.location.reload();
      } else {
        Swal.fire({
          icon: "error",
          title: "Opss...",
          text: error?.response?.data?.message,
        });
      }

      set({ error: error, isLoading: false });
    }
  },
}));

export default useEnfocementPlanApi;
