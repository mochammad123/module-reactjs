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

interface BudgetPlanApiResponse {
  dataBudgetPlan: any;
  dataPraBudgetPlan: any;
  isLoadingGetBudgetPlan: boolean;
  isLoadingGetPraBudgetPlan: boolean;
  isLoading: boolean;
  error: any;
  response: any;
  getBudgetPlanPagination: (getBudgetPlanPagination: any) => Promise<any>;
  show: any;
  setShow: any;
  approval: any;
  setApproval: any;
  getPraBudgetPlan: () => Promise<any>;
  createBudgetPlan: (data: any) => Promise<any>;
  updateBudgetPlan: (data: any) => Promise<any>;
  deleteBudgetPlan: (id: number) => Promise<any>;
  dataBudgetPlanPagination: any;
  setDataBudgetPlanPagination: any;
  dataDoubleClick: any;
  setDataDoubleClick: any;
  hasPic: any;
  setHasPic: any;
  countApprovedItem: any;
  setCountApprovedItem: any;
}

const useBudgetPlanApi = create<BudgetPlanApiResponse>((set) => ({
  dataBudgetPlan: [],
  dataPraBudgetPlan: [],
  isLoadingGetBudgetPlan: false,
  isLoadingGetPraBudgetPlan: false,
  isLoading: false,
  error: null,
  response: null,
  show: null,
  setShow: (item: boolean) => set({ show: item }),
  approval: null,
  setApproval: (item: any) => set({ approval: item }),
  dataBudgetPlanPagination: null,
  setDataBudgetPlanPagination: (item: any) =>
    set({ dataBudgetPlanPagination: item }),
  dataDoubleClick: null,
  setDataDoubleClick: (item: any) => set({ dataDoubleClick: item }),
  hasPic: null,
  setHasPic: (item: any) => set({ hasPic: item }),
  countApprovedItem: null,
  setCountApprovedItem: (item: any) => set({ countApprovedItem: item }),

  getBudgetPlanPagination: async (getBudgetPlanPagination: any) => {
    set({ isLoadingGetBudgetPlan: true });

    try {
      const response = await Api.post(
        "Budget/Plan/Paginate",
        getBudgetPlanPagination
      );
      set({ dataBudgetPlan: response?.data, isLoadingGetBudgetPlan: false });
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
      } else {
        Swal.fire({
          icon: "error",
          title: "Opss...",
          text: error?.response?.data?.message,
        });
      }
      set({ error: error, isLoadingGetBudgetPlan: false });
    }
  },

  getPraBudgetPlan: async () => {
    set({ isLoadingGetPraBudgetPlan: true });

    try {
      const response = await Api.get("Budget/PraPlan");
      set({
        dataPraBudgetPlan: response?.data,
        isLoadingGetPraBudgetPlan: false,
      });
      return response?.data;
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
      set({ error: error, isLoadingGetPraBudgetPlan: false });
    }
  },

  createBudgetPlan: async (data) => {
    set({ isLoading: true });
    try {
      const response = await Api.post("Budget/Plan", data);
      set({ response: response?.data, isLoading: false });
      Toast.fire({
        icon: "success",
        title: `${response?.data?.data}`,
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

  updateBudgetPlan: async (data) => {
    set({ isLoading: true });
    try {
      const response = await Api.put("Budget/Plan", data);
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

  deleteBudgetPlan: async (id) => {
    set({ isLoading: true });
    try {
      const response = await Api.delete(`Budget/Plan/${id}`);
      set({ response: response.data, isLoading: false });
      Toast.fire({
        icon: "success",
        title: `${response?.data?.message}`,
      });
      return response?.data;
    } catch (error: any) {
      if (error.response.status === 401) {
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
          text: error.response.data.message,
        });
      }
      set({ error: error, isLoading: false });
    }
  },
}));

export default useBudgetPlanApi;
